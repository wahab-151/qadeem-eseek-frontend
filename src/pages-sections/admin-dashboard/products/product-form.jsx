"use client";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import FlexBox from "components/flex-box/flex-box";
import { FormProvider } from "components/form-hook";
// STYLED COMPONENTS
import { UploadImageBox, StyledClear } from "../styles";
import { Button, Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  useAddProductMutation,
  useDeleteImageMutation,
  useDeleteImageCompletelyMutation,
  useGetMegaMenuCategoriesQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
  useGetCategoryProductCountQuery,
} from "app/store/services";
import { v4 as uuidv4 } from "uuid";
import {
  addWatermark,
  compressImage,
  formatToTwoDecimals,
  getAllDescendantIds,
} from "utils/helpers";
import { getFileType, uploadToS3 } from "utils/s3Helper";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
// import ModelsInput from "components/ModelsInput";
import TagsInput from "components/tagsinput";
import { ImageGallery } from "components/image-gallery";
import ImageDeleteDialog from "components/ImageDeleteDialog";

// Models field removed per requirement to hide from product CRUD

// FORM FIELDS VALIDATION SCHEMA
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  category: yup.string().required("Category is required!"),
  description: yup.string().required("Description is required!"),
  stock: yup.number().min(0, "Stock cannot be negative").required("Stock is required!"),
  costPrice: yup.number().min(0.01, "Cost Price must be greater than 0").required("Cost Price is required!"),
  tier4Price: yup.number().min(0.01, "Retail Price must be greater than 0").required("Retail Price is required!"),
  tier4Sale: yup.number().min(0.01, "Sale Price must be greater than 0").required("Sale Price is required!"),
  tier3Sale: yup.number().min(0.01, "Sale Price must be greater than 0").required("Sale Price is required!"),
  tier2Sale: yup.number().min(0.01, "Sale Price must be greater than 0").required("Sale Price is required!"),
  tier1Sale: yup.number().min(0.01, "Sale Price must be greater than 0").required("Sale Price is required!"),
  skuCode: yup.string().required("SKU code is required!"),
  published: yup.boolean().required("Published Status is required"),
  mostPopular: yup.boolean().required("Most Popular Status is required"),
  mostSold: yup.boolean().required("Most Sold Status is required"),
  featured: yup.boolean().required("Featured Status is required"),
  displayOrder: yup.number().min(1, "Display Order must be at least 1").required("Display Order is required!"),
});

export default function ProductForm({ onSuccess, mode, product, refetch }) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [imageProcessing, setImageProcessing] = useState(false);
  const [categoryProductCount, setCategoryProductCount] = useState(0);
  const [displayOrderOptions, setDisplayOrderOptions] = useState([{ value: 1, label: "Position 1" }]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [galleryRefreshTrigger, setGalleryRefreshTrigger] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [adminSetDisplayOrder, setAdminSetDisplayOrder] = useState(false);

  // Toggle states for each tier (true for percentage, false for price)
  const [toggleStates, setToggleStates] = useState({
    retail: false, // false = price, true = percent
    tier4: false,
    tier3: false,
    tier2: false,
    tier1: false,
  });

  const [addProduct, { isLoading: adding }] = useAddProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const { data, error, isLoading } = useGetMegaMenuCategoriesQuery();
  const [uploadImageHandle] = useUploadImageMutation();
  const [deleteImageHandle] = useDeleteImageMutation();
  const [deleteImageCompletelyHandle] = useDeleteImageCompletelyMutation();

  const methods = useForm({
    defaultValues: {
      name: "",
      tags: [],
      stock: 0,
      skuCode: "",
      costPrice: 0,
      retailInput: "",
      tier4Price: 0,
      tier4Sale: 0,
      tier3Sale: 0,
      tier2Sale: 0,
      tier1Sale: 0,
      tier4Input: "",
      tier3Input: "",
      tier2Input: "",
      tier1Input: "",
      description: "",
      category: "",
      subCategory: "",
      published: true,
      mostPopular: false,
      mostSold: false,
      featured: false,
      displayOrder: 1,
    },
    resolver: yupResolver(validationSchema),
  });

  const { data: categoryCountData, refetch: refetchCategoryCount } = useGetCategoryProductCountQuery(
    {
      categoryId: methods.watch("category"),
      subCategoryId: methods.watch("subCategory"),
    },
    { skip: !methods.watch("category") }
  );

  useEffect(() => {
    if (!isLoading && data?.success) {
      const all = data?.data;
      setCategories(all);
    }
    if (error) {
      console.error("Error fetching categories:", error);
    }
  }, [data?.data, isLoading, error]);

  const { handleSubmit, formState: { errors }, reset, setValue, watch, trigger } = methods;

  const costPrice = watch("costPrice");
  const retailInput = watch("retailInput");
  const tier4Input = watch("tier4Input");
  const tier3Input = watch("tier3Input");
  const tier2Input = watch("tier2Input");
  const tier1Input = watch("tier1Input");

  useEffect(() => {
    setSubCategories(categories.filter((cat) => cat.parentId === watch("category")));
  }, [watch("category"), categories]);

  useEffect(() => {
    if (categoryCountData?.data) {
      const { productCount, nextDisplayOrder } = categoryCountData.data;
      setCategoryProductCount(productCount);
      const options = [];
      const upper = productCount; // 1..N
      for (let i = 1; i <= upper; i++) {
        options.push({ value: i, label: `Position ${i}` });
      }
      setDisplayOrderOptions(options);
      if (mode === "add" || mode === "duplicate") {
        setValue("displayOrder", nextDisplayOrder);
      }
      // reset the flag on load of new counts
      setAdminSetDisplayOrder(false);
    }
  }, [categoryCountData, mode, setValue]);

  useEffect(() => {
    if (product && mode === "edit" && product.category?._id && categories.length > 0) {
      // Category is set in form reset
    }
  }, [product, mode, categories]);

  useEffect(() => {
    // When category/subcategory changes or becomes available, refetch count
    if (watch("category") && refetchCategoryCount) {
      try {
        refetchCategoryCount();
      } catch (error) {
        console.warn("Failed to refetch category count:", error);
      }
    }
  }, [watch("category"), watch("subCategory"), refetchCategoryCount]);

  useEffect(() => {
    if (product) {
      const mappedImages = product.image?.map((img) => ({
        name: img.name,
        preview: img.preview,
      }));
      setFiles(mappedImages || []);

      const isDuplicate = mode === "duplicate";
      const cp = Number(product?.costPrice || 0);
      const calcPercent = (price) => (cp > 0 ? formatToTwoDecimals(((Number(price) - cp) / cp) * 100) : "");

      reset({
        name: product.name || "",
        tags: product.tags || [],
        stock: product.stock?.toString() || 0,
        skuCode: product.sku || "",
        costPrice: product?.costPrice || 0,
        retailInput: product.price ? product.price : calcPercent(product.price),
        tier4Price: product.price || 0,
        tier1Sale: product.pricing?.Wholesale?.price || 0,
        tier2Sale: product.pricing?.ChainStore?.price || 0,
        tier3Sale: product.pricing?.Retailer?.price || 0,
        tier4Sale: product.pricing?.Franchise?.price || 0,
        tier4Input: product.pricing?.Franchise?.price ? product.pricing.Franchise.price : calcPercent(product.pricing?.Franchise?.price),
        tier3Input: product.pricing?.Retailer?.price ? product.pricing.Retailer.price : calcPercent(product.pricing?.Retailer?.price),
        tier2Input: product.pricing?.ChainStore?.price ? product.pricing.ChainStore.price : calcPercent(product.pricing?.ChainStore?.price),
        tier1Input: product.pricing?.Wholesale?.price ? product.pricing.Wholesale.price : calcPercent(product.pricing?.Wholesale?.price),
        description: product.description || "",
        category: product.category?._id || "",
        subCategory: product.subCategory || "",
        published: isDuplicate ? false : (product.published || false),
        mostPopular: product.mostPopular || false,
        mostSold: product.mostSold || false,
        featured: product.featured || false,
        displayOrder: product.displayOrder || 1,
        models: Array.isArray(product.models) ? product.models : (product.models ? [product.models] : []),
      });

      // Set toggle states based on product data
      setToggleStates({
        retail: product.price ? false : true,
        tier4: product.pricing?.Franchise?.price ? false : true,
        tier3: product.pricing?.Retailer?.price ? false : true,
        tier2: product.pricing?.ChainStore?.price ? false : true,
        tier1: product.pricing?.Wholesale?.price ? false : true,
      });
    }
  }, [product, reset, categories]);

  useEffect(() => {
    if (product && mode === "edit" && categories.length > 0 && product.subCategory) {
      setTimeout(() => {
        setValue("subCategory", product.subCategory);
      }, 100);
    }
  }, [product, mode, categories, setValue]);

  // Consolidated Price/Percentage Calculations
  useEffect(() => {
    if (isCalculating) return;

    const cp = Number(costPrice);
    if (!cp || isNaN(cp) || cp <= 0) return;

    setIsCalculating(true);

    const calculatePrice = (input, isPercent) => {
      if (!input || isNaN(input)) return 0;
      if (isPercent) {
        return formatToTwoDecimals(cp * (1 + Number(input) / 100));
      }
      return Number(input);
    };

    const tiers = [
      { input: retailInput, isPercent: toggleStates.retail, priceField: "tier4Price" },
      { input: tier4Input, isPercent: toggleStates.tier4, priceField: "tier4Sale" },
      { input: tier3Input, isPercent: toggleStates.tier3, priceField: "tier3Sale" },
      { input: tier2Input, isPercent: toggleStates.tier2, priceField: "tier2Sale" },
      { input: tier1Input, isPercent: toggleStates.tier1, priceField: "tier1Sale" },
    ];

    tiers.forEach(({ input, isPercent, priceField }) => {
      const price = calculatePrice(input, isPercent);
      const currentPrice = methods.getValues(priceField);
      if (Math.abs(Number(currentPrice) - Number(price)) > 0.01) {
        setValue(priceField, price, { shouldDirty: true, shouldValidate: false });
      }
    });

    setTimeout(() => setIsCalculating(false), 200);
  }, [
    costPrice,
    retailInput,
    tier4Input,
    tier3Input,
    tier2Input,
    tier1Input,
    toggleStates,
    setValue,
    methods,
    isCalculating,
  ]);

  const handleToggleChange = (tier) => (event) => {
    setToggleStates((prev) => ({ ...prev, [tier]: event.target.checked }));
  };

  const handleNumericInput = (e, onChange) => {
    const value = e.target.value;
    const formatted = value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
    const [intPart, decimalPart] = formatted.split(".");
    let result = intPart;
    if (decimalPart !== undefined) {
      result += "." + decimalPart.slice(0, 2);
    }
    onChange(result ? parseFloat(result) : "");
  };

  const handleChangeDropZone = async (files) => {
    setImageProcessing(true);
    for (const file of files) {
      if (!file) {
        enqueueSnackbar("No file selected.", { variant: "error" });
        continue;
      }
      if (file.size > 20 * 1024 * 1024) {
        enqueueSnackbar(`${file.name} exceeds the maximum size of 20 MB.`, { variant: "error" });
        continue;
      }
      try {
        const uniqueId = uuidv4();
        const compressedFile = await compressImage(file);
        const watermarkedImageUrl = await addWatermark(compressedFile, "");
        const response = await fetch(watermarkedImageUrl);
        const blob = await response.blob();
        const productName = methods.getValues("name") || "product";
        const categoryName = methods.getValues("category")?.name || "category";
        const cleanProductName = productName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
        const cleanCategoryName = categoryName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
        const descriptiveFileName = `product-${cleanProductName}-${cleanCategoryName}-${uniqueId}-${file.name}`;
        const s3data = await uploadImageHandle({
          fileName: descriptiveFileName,
          fileType: file.type,
          imageType: "product",
        }).unwrap();
        const uploadedUrl = await uploadToS3({
          url: s3data.url,
          blob,
          fileType: file.type,
        });
        if (uploadedUrl) {
          const finalImageUrl = uploadedUrl.split("?")[0];
          setFiles((prevFiles) => [...prevFiles, { name: file.name, preview: finalImageUrl }]);
          enqueueSnackbar("Image uploaded Successfully!", { variant: "success" });
          methods.setValue("image", finalImageUrl);
        } else {
          enqueueSnackbar("Image upload failed!", { variant: "error" });
        }
      } catch (error) {
        enqueueSnackbar("Image upload failed!", { variant: "error" });
        console.error(`Image upload failed for: ${file.name}`, error);
      }
    }
    setImageProcessing(false);
  };

  const handleFileDelete = (fileToDelete) => () => {
    setImageToDelete(fileToDelete);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async (deleteType) => {
    if (!imageToDelete) return;
    setImageProcessing(true);
    setDeleteDialogOpen(false);
    try {
      if (deleteType === "s3") {
        const fileDetails = getFileType(imageToDelete);
        const result = await deleteImageCompletelyHandle({
          fileName: fileDetails.fileName,
          fileType: fileDetails.fileType,
          imageUrl: imageToDelete.preview,
        });
        const { deletedFromProducts, deletedFromCategories, totalAffected } = result.data;
        enqueueSnackbar(`Image deleted from S3 and ${totalAffected} products/categories!`, { variant: "success" });
        setGalleryRefreshTrigger((prev) => prev + 1);
      } else {
        enqueueSnackbar("Image removed from product!", { variant: "success" });
      }
      setFiles((prevFiles) =>
        prevFiles.filter(
          (file) => file.name !== imageToDelete.name || file.preview !== imageToDelete.preview
        )
      );
      const currentMainImage = methods.getValues("image");
      if (currentMainImage === imageToDelete.preview) {
        methods.setValue("image", "");
      }
    } catch (err) {
      enqueueSnackbar("Error while deleting the image!", { variant: "error" });
      console.error("Image delete failed", err);
    } finally {
      setImageProcessing(false);
      setImageToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setImageToDelete(null);
  };

  const handleGalleryImageSelect = (imageUrl) => {
    const newFile = { name: imageUrl.split("/").pop(), preview: imageUrl };
    setFiles((prevFiles) => [...prevFiles, newFile]);
    methods.setValue("image", imageUrl);
    setGalleryOpen(false);
    enqueueSnackbar("Image selected from gallery!", { variant: "success" });
  };

  const handleGalleryMultipleImageSelect = (images) => {
    const newFiles = images.map((image) => ({
      name: image.fileName || image.url.split("/").pop(),
      preview: image.url,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    if (images.length > 0) {
      methods.setValue("image", images[0].url);
    }
    setGalleryOpen(false);
    enqueueSnackbar(`${images.length} image${images.length !== 1 ? "s" : ""} selected from gallery!`, { variant: "success" });
  };

  const handleSubmitForm = handleSubmit(
    async (values) => {
      // handleSubmit already validates, so if we're here, form is valid
      const payload = {
        price: Number(values.tier4Price),
        pricing: {
          Franchise: { price: Number(values.tier4Sale) },
          Retailer: { price: Number(values.tier3Sale) },
          ChainStore: { price: Number(values.tier2Sale) },
          Wholesale: { price: Number(values.tier1Sale) },
        },
        name: values.name,
        tags: values.tags,
        stock: Number(values.stock),
        sku: values.skuCode,
        description: values.description,
        category: values.category,
        subCategory: values.subCategory,
        mostPopular: values.mostPopular,
        mostSold: values.mostSold,
        featured: values.featured,
        published: values.published,
        images: files,
        costPrice: Number(values.costPrice),
        id: mode === "duplicate" ? null : product?.id || null,
      };
      if (adminSetDisplayOrder) {
        payload.displayOrder = Number(values.displayOrder);
      }
      try {
        if (product && mode !== "duplicate") {
          const res = await updateProduct(payload);
          if (res?.data?.success) {
            enqueueSnackbar("Product updated successfully!", { variant: "success" });
            refetchCategoryCount();
            refetch();
            onSuccess();
            reset();
            setFiles([]);
            return;
          } else if (res?.error?.data?.message) {
            const msg = res?.error?.data?.message || "Update failed";
            enqueueSnackbar(
              msg.toLowerCase().includes("sku")
                ? "Duplicate SKU: another product already uses this SKU. Please enter a unique SKU."
                : msg,
              { variant: "error" }
            );
          }
        } else {
          const res = await addProduct(payload);
          if (res?.data?._id) {
            enqueueSnackbar("Product added successfully!", { variant: "success" });
            refetchCategoryCount();
            reset();
            setFiles([]);
            if (mode === "duplicate") {
              refetch && refetch();
              onSuccess && onSuccess();
            } else {
              router.push("/admin/products");
            }
            return;
          } else if (res?.error?.data?.message) {
            const msg = res?.error?.data?.message || "Creation failed";
            enqueueSnackbar(
              msg.toLowerCase().includes("sku")
                ? "Duplicate SKU: another product already uses this SKU. Please enter a unique SKU."
                : msg,
              { variant: "error" }
            );
          }
        }
      } catch (err) {
        console.error("❌ Error in product", err);
        enqueueSnackbar("An error occurred while saving the product.", { variant: "error" });
      }
    },
    (formErrors) => {
      // This callback runs when validation fails
      const errorMessages = Object.values(formErrors).map((err) => err.message).filter(Boolean);
      if (errorMessages.length > 0) {
        enqueueSnackbar(`Validation errors: ${errorMessages[0]}`, { variant: "error" });
      } else {
        enqueueSnackbar("Please fix the validation errors before submitting.", { variant: "error" });
      }
    }
  );

  return (
    <Card className="p-3">
      <FormProvider methods={methods} onSubmit={handleSubmitForm}>
        <Grid container spacing={3}>
          <Grid size={{ sm: 12 }}>
            <Controller
              name="name"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          {/* Models field hidden */}
          <Grid size={{ sm: 6, xs: 12 }}>
            <Controller
              name="category"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  label="Select Category"
                  placeholder="Category"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    methods.setValue("subCategory", "");
                    // when category changes, admin selection resets
                    setAdminSetDisplayOrder(false);
                  }}
                  error={Boolean(error)}
                  helperText={error?.message}
                >
                  {isLoading ? (
                    <MenuItem disabled>Loading categories...</MenuItem>
                  ) : categories?.length ? (
                    categories.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No categories found</MenuItem>
                  )}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}>
            <Controller
              name="subCategory"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  label="Select Sub Category"
                  placeholder="Sub Category"
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                >
                  {isLoading ? (
                    <MenuItem disabled>Loading subcategories...</MenuItem>
                  ) : subCategories.length === 0 ? (
                    <MenuItem disabled>No sub categories available</MenuItem>
                  ) : (
                    subCategories.map((sub) => (
                      <MenuItem key={sub._id} value={sub._id}>
                        {sub.name}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={12}>
            <FlexBox flexDirection="column" mt={2} gap={1}>
              <Typography variant="subtitle1">Uploaded Images</Typography>
              <DropZone onChange={handleChangeDropZone} processing={imageProcessing} disabled={mode === "view"} />
              {mode !== "view" && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setGalleryOpen(true)}
                  sx={{ alignSelf: "flex-start", mt: 1 }}
                >
                  Choose from Gallery
                </Button>
              )}
              <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                {files.map((file, index) => (
                  <UploadImageBox key={index}>
                    <Box component="img" src={file.preview} width="100%" />
                    {mode !== "view" && <StyledClear onClick={handleFileDelete(file)} />}
                  </UploadImageBox>
                ))}
              </FlexBox>
            </FlexBox>
          </Grid>
          <Grid size={{ md: 4, sm: 12 }}>
            <Controller
              name="skuCode"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  color="info"
                  size="medium"
                  label="SKU Code"
                  type="text"
                  placeholder="SKU code"
                  inputProps={{ min: 1 }}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ md: 4, sm: 12 }}>
            <Controller
              name="stock"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  color="info"
                  size="medium"
                  label="Stock"
                  type="number"
                  placeholder="Stock"
                  inputProps={{ min: 0 }}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ md: 4, sm: 12 }}>
            <Controller
              name="displayOrder"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  color="info"
                  size="medium"
                  label={`Display Order (${categoryProductCount} products in category)`}
                  select
                  error={Boolean(error)}
                  helperText={error?.message || `Choose position 1-${categoryProductCount} in this category`}
                  disabled={!watch("category")}
                  onChange={(e) => {
                    field.onChange(e);
                    setAdminSetDisplayOrder(true);
                  }}
                >
                  {displayOrderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ sm: 12 }}>
            <TagsInput name="tags" label="Tags" placeholder="Type a tag and press Enter" disabled={mode === "view"} />
          </Grid>
          <Grid size={12}>
            <Controller
              name="description"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  rows={6}
                  multiline
                  fullWidth
                  color="info"
                  size="medium"
                  label="Description"
                  placeholder="Description"
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ sm: 12, xs: 12 }}>
            <Typography variant="h3" mb={1}>
              Price per Tier (Default is Regular price-Tier-4)
            </Typography>
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}>
            <Controller
              name="costPrice"
              control={methods.control}
              render={({ field: { onChange, ...field }, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  label="Cost Price"
                  placeholder="Cost Price - Manufacturing price"
                  inputProps={{ min: 0.01, step: "0.01" }}
                  error={Boolean(error)}
                  helperText={error?.message}
                  onChange={(e) => handleNumericInput(e, onChange)}
                />
              )}
            />
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}></Grid>
          <Grid size={{ sm: 3, xs: 12 }}>
            <Controller
              name="retailInput"
              control={methods.control}
              render={({ field: { onChange, ...field } }) => (
                <TextField
                  {...field}
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  label={toggleStates.retail ? "Retail % of Cost" : "Retail Price"}
                  placeholder={toggleStates.retail ? "e.g. 300 = 3x cost" : "Regular Price - Tier 4"}
                  inputProps={{ min: 0.01, step: "0.01" }}
                  onChange={(e) => handleNumericInput(e, onChange)}
                />
              )}
            />
          </Grid>
          <Grid size={{ sm: 3, xs: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={toggleStates.retail}
                  onChange={handleToggleChange("retail")}
                  color="info"
                  disabled={mode === "view"}
                />
              }
              label={toggleStates.retail ? "Percent" : "Price"}
              sx={{ justifyContent: "center" }}
            />
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth
              color="info"
              size="medium"
              label="Retail Price Preview"
              value={formatToTwoDecimals(watch("tier4Price"))}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ sm: 12, xs: 12 }}>
            <Typography variant="h3" mb={1}>
              Sale Amount for Tier Type
            </Typography>
          </Grid>
          <Grid size={{ sm: 3, xs: 12 }}>
            <Controller
              name="tier4Input"
              control={methods.control}
              render={({ field: { onChange, ...field } }) => (
                <TextField
                  {...field}
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  label={toggleStates.tier4 ? "Franchise % of Cost (Tier 4)" : "Sale Price for Franchise-Tier 4"}
                  placeholder={toggleStates.tier4 ? "e.g. 300 = 3x cost" : "Sale Price-Tier-4 : Franchise"}
                  inputProps={{ min: 0.01, step: "0.01" }}
                  onChange={(e) => handleNumericInput(e, onChange)}
                />
              )}
            />
          </Grid>
          <Grid size={{ sm: 3, xs: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={toggleStates.tier4}
                  onChange={handleToggleChange("tier4")}
                  color="info"
                  disabled={mode === "view"}
                />
              }
              label={toggleStates.tier4 ? "Percent" : "Price"}
              sx={{ justifyContent: "center" }}
            />
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth
              color="info"
              size="medium"
              label="Franchise Price Preview (Tier 4)"
              value={formatToTwoDecimals(watch("tier4Sale"))}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ sm: 3, xs: 12 }}>
            <Controller
              name="tier3Input"
              control={methods.control}
              render={({ field: { onChange, ...field } }) => (
                <TextField
                  {...field}
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  label={toggleStates.tier3 ? "Retailer % of Cost (Tier 3)" : "Sale Price for Retailer-Tier 3"}
                  placeholder={toggleStates.tier3 ? "e.g. 250 = 2.5x cost" : "Sale Price-Tier-3 : Retailer"}
                  inputProps={{ min: 0.01, step: "0.01" }}
                  onChange={(e) => handleNumericInput(e, onChange)}
                />
              )}
            />
          </Grid>
          <Grid size={{ sm: 3, xs: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={toggleStates.tier3}
                  onChange={handleToggleChange("tier3")}
                  color="info"
                  disabled={mode === "view"}
                />
              }
              label={toggleStates.tier3 ? "Percent" : "Price"}
              sx={{ justifyContent: "center" }}
            />
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth
              color="info"
              size="medium"
              label="Retailer Price Preview (Tier 3)"
              value={formatToTwoDecimals(watch("tier3Sale"))}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ sm: 3, xs: 12 }}>
            <Controller
              name="tier2Input"
              control={methods.control}
              render={({ field: { onChange, ...field } }) => (
                <TextField
                  {...field}
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  label={toggleStates.tier2 ? "ChainStore % of Cost (Tier 2)" : "Sale Price for ChainStore-Tier 2"}
                  placeholder={toggleStates.tier2 ? "e.g. 220 = 2.2x cost" : "Sale Price-Tier-2 : ChainStore"}
                  inputProps={{ min: 0.01, step: "0.01" }}
                  onChange={(e) => handleNumericInput(e, onChange)}
                />
              )}
            />
          </Grid>
          <Grid size={{ sm: 3, xs: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={toggleStates.tier2}
                  onChange={handleToggleChange("tier2")}
                  color="info"
                  disabled={mode === "view"}
                />
              }
              label={toggleStates.tier2 ? "Percent" : "Price"}
              sx={{ justifyContent: "center" }}
            />
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth
              color="info"
              size="medium"
              label="ChainStore Price Preview (Tier 2)"
              value={formatToTwoDecimals(watch("tier2Sale"))}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ sm: 3, xs: 12 }}>
            <Controller
              name="tier1Input"
              control={methods.control}
              render={({ field: { onChange, ...field } }) => (
                <TextField
                  {...field}
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  label={toggleStates.tier1 ? "Wholesale % of Cost (Tier 1)" : "Sale Price for Wholesaler-Tier 1"}
                  placeholder={toggleStates.tier1 ? "e.g. 200 = 2x cost" : "Sale Price-Tier-1 : Wholesaler"}
                  inputProps={{ min: 0.01, step: "0.01" }}
                  onChange={(e) => handleNumericInput(e, onChange)}
                />
              )}
            />
          </Grid>
          <Grid size={{ sm: 3, xs: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={toggleStates.tier1}
                  onChange={handleToggleChange("tier1")}
                  color="info"
                  disabled={mode === "view"}
                />
              }
              label={toggleStates.tier1 ? "Percent" : "Price"}
              sx={{ justifyContent: "center" }}
            />
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth
              color="info"
              size="medium"
              label="Wholesale Price Preview (Tier 1)"
              value={formatToTwoDecimals(watch("tier1Sale"))}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{ sm: 12, xs: 12 }}>
            <Typography variant="h3" mb={1}>
              Product Status
            </Typography>
          </Grid>
          <Grid item size={{ xs: 12 }}>
            <Controller
              name="published"
              control={methods.control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} color="info" checked={field.value} disabled={mode === "view"} />}
                  label="Published on website"
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12 }}>
            <Controller
              name="mostSold"
              control={methods.control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} color="info" checked={field.value} disabled={mode === "view"} />}
                  label="Most Sold Product"
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12 }}>
            <Controller
              name="featured"
              control={methods.control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} color="info" checked={field.value} disabled={mode === "view"} />}
                  label="Featured Product"
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12 }}>
            <Controller
              name="mostPopular"
              control={methods.control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} color="info" checked={field.value} disabled={mode === "view"} />}
                  label="Most Popular Product"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            {mode !== "view" ? (
              <LoadingButton
                loading={adding || updating}
                variant="contained"
                color="info"
                type="submit"
                sx={{ minWidth: "300px", height: "50px", fontSize: "1rem", padding: "12px 24px" }}
              >
                {mode === "edit" ? "Update product" : "Save product"}
              </LoadingButton>
            ) : (
              <LoadingButton
                variant="contained"
                color="info"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    onSuccess();
                  } catch (error) {
                    console.error("Router error:", error);
                    window.location.href = "/admin/products";
                  }
                }}
                sx={{ minWidth: "300px", height: "50px", fontSize: "1rem", padding: "12px 24px" }}
              >
                Close
              </LoadingButton>
            )}
          </Grid>
        </Grid>
      </FormProvider>
      <ImageGallery
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        onSelectImage={handleGalleryImageSelect}
        onSelectMultipleImages={handleGalleryMultipleImageSelect}
        selectedImageUrl={files.length > 0 ? files[files.length - 1]?.preview : null}
        allowMultiSelectToggle={true}
        refreshTrigger={galleryRefreshTrigger}
      />
      <ImageDeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        imageName={imageToDelete?.name || "Unknown"}
        isProcessing={imageProcessing}
      />
    </Card>
  );
}