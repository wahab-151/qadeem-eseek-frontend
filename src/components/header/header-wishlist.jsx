"use client";

import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import QadeemButton from "components/QadeemButton";

export default function HeaderWishlist() {
  const theme = useTheme();

  return (
    <QadeemButton
      iconOnly
      startIcon={<FavoriteBorder sx={{ fontSize: 24 }} />}
      href="/wish-list"
      component={Link}
      sx={{
        color: "#424242", // Dark grey to match image
        padding: "8px",
        "&:hover": {
          color: theme.palette.primary.main,
          backgroundColor: "transparent",
        },
      }}
    />
  );
}

