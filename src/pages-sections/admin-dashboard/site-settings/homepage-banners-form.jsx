import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import LazyImage from "components/LazyImage";

// CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import { useDeleteImageMutation, useUploadImageMutation } from "app/store/services";
import { uploadToS3 } from "utils/s3Helper";
import { StyledClear, UploadImageBox } from "pages-sections/admin-dashboard/styles";
import { compressImage, addWatermark } from "utils/helpers";

// Validation Schema (name, displayOrder, image)
const validationSchema = yup.object().shape({
  homepageBanners: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Name is required"),
        displayOrder: yup
          .number()
          .typeError("Display order must be a number")
          .required("Display order is required")
          .integer("Display order must be an integer")
          .min(1, "Minimum is 1"),
        imageUrl: yup.string().required("Please upload an image"),
      })
    )
    .test(
      "displayOrder-range",
      "Display order must be between 1 and the number of banners",
      (list) => {
        if (!Array.isArray(list)) return true;
        const len = list.length;
        return list.every(
          (b) =>
            typeof b?.displayOrder === "number" &&
            b.displayOrder >= 1 &&
            b.displayOrder <= len
        );
      }
    ),
});

const HomepageBannersForm = ({
  contentData,
  uploadInfo,
  uploadInfoLoading,
  uploadInfoError,
  websiteInfoLoading
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [imageProcessing, setImageProcessing] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [tempPreviews, setTempPreviews] = useState({}); // index -> objectURL during upload
  
  const [
    uploadImageHandle,
    { isLoading: uploadingImage, error: uploadingImageError },
  ] = useUploadImageMutation();
  const [deleteImageHandle] = useDeleteImageMutation();
  console.log("contentData", contentData);
  const initialValues = useMemo(() => {
    const source = Array.isArray(contentData?.homepageBanners)
      ? contentData.homepageBanners
      : [];

    const normalized = source.length
      ? source.map((banner, idx) => ({
          name: banner?.name || "",
          // prefer existing displayOrder; else fall back to array order starting at 1
          displayOrder:
            typeof banner?.displayOrder === "number" && !Number.isNaN(banner.displayOrder)
              ? banner.displayOrder
              : idx + 1,
          imageUrl: banner?.imageUrl || "",
        }))
      : [
          {
            name: "",
            displayOrder: 1,
            imageUrl: "",
          },
        ];

    return { homepageBanners: normalized };
  }, [contentData]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  // keep form in sync when contentData changes
  useEffect(() => {
    // replaced below once replace is available
  }, [initialValues]);

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "homepageBanners",
  });

  // after field array is initialized, replace items to match incoming values
  useEffect(() => {
    replace(initialValues.homepageBanners);
  }, [initialValues, replace]);

  // Form Submit Handler
  const handleSubmitForm = handleSubmit(async (values) => {
    const payload = {
      ...contentData,
      homepageBanners: values.homepageBanners,
    };

    try {
      const result = await uploadInfo({ content: payload }).unwrap();
      if (uploadInfoError) {
        console.error("Error updating homepage banners:", uploadInfoError);
        enqueueSnackbar("Update Error! Try Again", { variant: "error" });
        return;
      }
      enqueueSnackbar("Homepage banners updated successfully!", { variant: "success" });
      console.log("Homepage banners updated successfully");
    } catch (error) {
      console.error("Error updating homepage banners:", error);
      enqueueSnackbar("Update Error! Try Again", { variant: "error" });
    }
  });

  const addBanner = () => {
    append({
      name: "",
      displayOrder: (fields?.length || 0) + 1,
      imageUrl: "",
    });
  };

  const handleImageUpload = async (files, index) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setUploadingIndex(index);
    setImageProcessing(true);

    try {
      // Validate file size
      if (file.size > 20 * 1024 * 1024) {
        enqueueSnackbar(`${file.name} exceeds the maximum size of 20 MB.`, {
          variant: "error",
        });
        return;
      }

      // Generate unique filename using original file name
      const uniqueId = uuidv4();
      const originalName = file?.name || `banner-${Date.now()}`;
      const mimeType = file?.type || "image/jpeg";

      // Prepare blob (no compression for banners to maintain full HD quality)
      let blob;
      if (mimeType.startsWith("image/")) {
        // Comment out compression for banners to maintain full HD quality
        // const compressed = await compressImage(file);
        // const watermarkedUrl = await addWatermark(compressed, "");
        // const response = await fetch(watermarkedUrl);
        // blob = await response.blob();
        // blob = compressed;
        blob = file; // Use original file without compression for full HD quality
        // set immediate preview while uploading
        const objectUrl = URL.createObjectURL(file);
        setTempPreviews(prev => ({ ...prev, [index]: objectUrl }));
      } else {
        blob = file;
      }
      
      // Get S3 upload URL
      const s3data = await uploadImageHandle({
        fileName: `${uniqueId}-${originalName}`,
        fileType: mimeType,
        imageType: 'banner',
      }).unwrap();

      // Upload to S3
      const uploadedUrl = await uploadToS3({
        url: s3data.url,
        blob,
        fileType: mimeType,
      });

      if (uploadedUrl) {
        // Store clean URL without query string
        const cleanUrl = uploadedUrl.split("?")[0];
        setValue(`homepageBanners.${index}.imageUrl`, cleanUrl);
        enqueueSnackbar("Image uploaded successfully!", { variant: "success" });
      } else {
        enqueueSnackbar("Failed to upload image. Please try again.", { variant: "error" });
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      enqueueSnackbar("Error uploading image. Please try again.", { variant: "error" });
    } finally {
      setImageProcessing(false);
      setUploadingIndex(null);
      // cleanup temp preview
      setTempPreviews(prev => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
    }
  };

  const handleDeleteImage = (url, index) => async () => {
    try {
      setDeletingIndex(index);
      setImageProcessing(true);
      if (!url) {
        setValue(`homepageBanners.${index}.imageUrl`, "");
        return;
      }
      const parsed = new URL(url);
      const fileName = parsed.pathname.startsWith("/") ? parsed.pathname.substring(1) : parsed.pathname;
      await deleteImageHandle({ fileName, fileType: "image/jpeg" });
      setValue(`homepageBanners.${index}.imageUrl`, "");
      enqueueSnackbar("Image deleted", { variant: "success" });
    } catch (err) {
      console.error("Delete failed", err);
      enqueueSnackbar("Failed to delete image", { variant: "error" });
    } finally {
      setDeletingIndex(null);
      setImageProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      {websiteInfoLoading ? (
        <Box className="flex items-center align-middle">
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Homepage Banners</Typography>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={addBanner}
              color="primary"
            >
              Add Banner
            </Button>
          </Box>

          {fields.map((field, index) => (
            <Card key={field.id} sx={{ mb: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Banner {index + 1}</Typography>
                  {fields.length > 1 && (
                    <IconButton
                      color="error"
                      onClick={() => remove(index)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Box>

                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      {...register(`homepageBanners.${index}.name`)}
                      error={!!errors.homepageBanners?.[index]?.name}
                      helperText={errors.homepageBanners?.[index]?.name?.message}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Display Order"
                      inputProps={{ min: 1, max: fields.length }}
                      {...register(`homepageBanners.${index}.displayOrder`)}
                      error={!!errors.homepageBanners?.[index]?.displayOrder}
                      helperText={errors.homepageBanners?.[index]?.displayOrder?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Banner Image
                    </Typography>
                    <DropZone
                      onChange={(files) => handleImageUpload(files, index)}
                      processing={uploadingIndex === index && imageProcessing}
                      info="Upload banner image (Recommended size: 1920x500px)"
                    />
                    
                    {/* Image Preview (profile-like) */}
                    {(watch(`homepageBanners.${index}.imageUrl`) || tempPreviews[index]) && (
                      <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                        <UploadImageBox sx={{ position: 'relative' }}>
                          <Box
                            component="img"
                            src={watch(`homepageBanners.${index}.imageUrl`) || tempPreviews[index]}
                            width={100}
                            height={100}
                            sx={{ objectFit: "cover" }}
                          />
                          {(uploadingIndex === index || deletingIndex === index) && (
                            <Box
                              sx={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'rgba(255,255,255,0.6)'
                              }}
                            >
                              <CircularProgress size={24} />
                            </Box>
                          )}
                          <StyledClear onClick={handleDeleteImage(watch(`homepageBanners.${index}.imageUrl`), index)} />
                        </UploadImageBox>
                      </Box>
                    )}
                    
                    {errors.homepageBanners?.[index]?.imageUrl && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                        {errors.homepageBanners[index].imageUrl.message}
                      </Typography>
                    )}
                    {/* Hidden field to store the image URL */}
                    <input
                      type="hidden"
                      {...register(`homepageBanners.${index}.imageUrl`)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Box mt={3}>
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Save Homepage Banners
            </LoadingButton>
          </Box>
        </Box>
      )}
    </form>
  );
};

export default HomepageBannersForm;
