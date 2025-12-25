


"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import FlexBox from "components/flex-box/flex-box";
import { Checkbox, FormProvider, TextField } from "components/form-hook";
// STYLED COMPONENTS
import { UploadImageBox, StyledClear } from "../styles";
import { MenuItem } from "@mui/material";
import { useAddBrandMutation, useDeleteImageMutation, useListAllCategoriesQuery, useUpdateBrandMutation, useUploadImageMutation } from "app/store/services";
import { v4 as uuidv4 } from 'uuid';
import { addWatermark, compressImage } from "utils/helpers";
import { uploadToS3 } from "utils/s3Helper";
// CUSTOM DATA MODEL
// FORM FIELDS VALIDATION SCHEMA
const validationSchema = yup.object().shape({
  name: yup.string(),
  title: yup.string(),
  image: yup.string().url(),
  isActive: yup.boolean(),
  categories: yup.array().of(yup.string()), // <-- ADD THIS
});
// ================================================================
// ================================================================
export default function BrandForm({ initialValues, onSuccess, mode  }) {
  const [files, setFiles] = useState([]);
  const [subCategory, setSubCategory] = useState([])
  const [addBrand, { isLoading: adding }] = useAddBrandMutation();
  const [updateBrand, { isLoading: updating }] = useUpdateBrandMutation();
  const { data, isLoading, error } = useListAllCategoriesQuery();
  // const [uploadImage, { isLoading: uploading }] = useUploadImageMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [uploading, setUploading] = useState(false);

  // console.log("category formmmm", data?.data?.categories, isLoading, error);

  useEffect(() => {
    if (!isLoading && data?.success) {
      setSubCategory(data?.data?.categories);
    }
    if (error) {
      console.error("Error fetching categories:", error);
    }
  }, [data, isLoading, error]);

  // console.log("uppppp", subCategory)
  const methods = useForm({
    defaultValues: {
      name: "",
      title: "",
      image: "",
      isActive: true,
      categories: [],
      ...initialValues,
    },
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, reset } = methods;


  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
      if (initialValues.image) {
        setFiles([
          {
            name: initialValues.image,
            preview: initialValues.image,
          },
        ]);
      }
    }
  }, [initialValues, reset]);

 const handleSubmitForm = handleSubmit(async (values) => {
    // console.log("inside handleee", values)
    const payload = {
      ...values,
      id: initialValues?.id, // only for update
    };
    try {
      if (mode === "edit" && initialValues?.id) {
        await updateBrand(payload).unwrap();
      } else {
        await addBrand(payload).unwrap();
      }
      onSuccess?.();
      reset();
    } catch (error) {
      console.error("Submit error", error);
    }
  });


  const handleChangeDropZone = async (files) => {
    // console.log("FILES RECEIVED:", files);
    const file = files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }
  
    if (file.size > 20 * 1024 * 1024) {
      console.error(`${file.name} exceeds the maximum size of 20 MB.`);
      return;
    }
  
    try {
      const uniqueId = uuidv4();
      // console.log("s3 starting");
  
      const compressedFile = await compressImage(file);
      const watermarkedImageUrl = await addWatermark(compressedFile, "");
      const response = await fetch(watermarkedImageUrl);
      const blob = await response.blob();
  
      // console.log("before s3data", `${uniqueId}-${file.name}`, file.type);
  
      // Get S3 pre-signed URL
      const s3data = await uploadImageHandle({
        fileName: `${uniqueId}-${file.name}`,
        fileType: file.type,
        imageType: 'brand',
      }).unwrap();
  
      // Upload using helper
      const uploadedUrl = await uploadToS3({
        url: s3data.url,
        blob,
        fileType: file.type,
      });
  
      if (uploadedUrl) {
        const finalImageUrl = uploadedUrl.split("?")[0]; // or use full URL
        // console.log("✅ Uploaded image URL:", finalImageUrl);
  
        // Show thumbnail
        setFiles([{ name: file.name, preview: finalImageUrl }]);
        methods.setValue("image", finalImageUrl); // if using react-hook-form
      } else {
        console.warn("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };





  // HANDLE DELETE UPLOAD IMAGE
   const handleFileDelete = (file) => async () => {
    try {
      const imageUrl = methods.getValues("image");
      const fileName = imageUrl.split('/').pop();
      await axios.post("http://server.sifraatl.com/api/s3/delete", {
        fileName,
        fileType: "image/png",
      });
      setFiles([]);
      methods.setValue("image", "");
      // await deleteImage({ url: methods.getValues("image") }).unwrap();
      // setFiles([]);
      // methods.setValue("image", ""); // clear image field
    } catch (err) {
      console.error("Image delete failed", err);
    }
  };
  // const handleFileDelete = file => () => {
  //   setFiles(files => files.filter(item => item.name !== file.name));
  // };





  // console.log("modeeee", mode, initialValues)
  return <Card className="p-3">
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      <Grid container spacing={3}>
        <Grid size={{
          sm: 6,
          xs: 12
        }}>
          <TextField fullWidth name="name" label="Name" color="info" size="medium" placeholder="Name" />
        </Grid>
        <Grid size={{
          sm: 6,
          xs: 12
        }}>
          <TextField select fullWidth color="info" size="medium" name="categories" placeholder="categories" label="Select categories"
            slotProps={{
              select: mode !== "view" ? { multiple: true } : {}
            }}
          >
            {mode === "edit" || mode === "view" ? (
              <MenuItem key={initialValues.id} value={initialValues.id}>
                {initialValues?.name}
              </MenuItem>
            ) : isLoading ? (
              <MenuItem disabled>Loading categories...</MenuItem>
            ) : (
              subCategory.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))
            )}
            {/*
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="fashion">Fashion</MenuItem> */}
          </TextField>
        </Grid>
      <Grid size={12}>
          {mode === "view" ? (
            <>
              <Box
                flexDirection="row"
                mt={2}
                flexWrap="wrap"
                gap={1}
                key={initialValues.id}
                value={initialValues.id}
                component="img"
                alt="product"
                src={initialValues.image}
                width="100%"
              />
            </>
          ) : (
            <>
              <DropZone onChange={files => handleChangeDropZone(files)} />
              <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                {files.map((file, index) => (
                  <UploadImageBox key={index}>
                    <Box component="img" alt="product" src={file.preview} width="100%" />
                    <StyledClear onClick={() => handleFileDelete(file)} />
                  </UploadImageBox>
                ))}
              </FlexBox>
            </>
          )}
        </Grid>
        <Grid size={{
          sm: 6,
          xs: 12
        }}>
          <Checkbox color="info" name="featured" label="Featured Brand" />
        </Grid>
        <Grid size={12}>
          {/* <LoadingButton loading={isSubmitting} variant="contained" color="info" type="submit">
            Save brand
          </LoadingButton> */}
          {mode !== "view" && (
            <LoadingButton
              loading={adding || updating}
              variant="contained"
              color="info"
              type="submit"
            >
              {mode === "edit" ? "Update Brand" : "Save Brand"}
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </FormProvider>
  </Card>;
}