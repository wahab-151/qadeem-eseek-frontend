"use client";

// LOCAL CUSTOM COMPONENT
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "app/store/services";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function EditProductPageView() {
  const params = useParams();
  const id = params?.slug;
  const { data, isLoading } = useGetProductByIdQuery(id, { skip: !id });
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (data?.data) setProduct(data.data);
  }, [data]);

  return (
    <PageWrapper title="Edit Product">
      {isLoading || !product ? (
        <Box display="flex" alignItems="center" justifyContent="center" minHeight={200}>
          <CircularProgress color="info" size={28} />
        </Box>
      ) : (
        <ProductForm mode="edit" product={product} />
      )}
    </PageWrapper>
  );
}