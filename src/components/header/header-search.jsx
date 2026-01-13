"use client";

import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QadeemButton from "components/QadeemButton";

export default function HeaderSearch({ onSearchClick, isLoading = false }) {
  const theme = useTheme();

  const handleClick = (e) => {
    e.preventDefault();
    if (onSearchClick) {
      onSearchClick();
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <QadeemButton
        iconOnly
        startIcon={<SearchIcon sx={{ fontSize: 24 }} />}
        onClick={handleClick}
        loading={isLoading}
        disabled={isLoading}
        aria-label="Search"
        sx={{
          color: "#424242",
          padding: "8px",
          "&:hover": {
            color: theme.palette.primary.main,
            backgroundColor: "transparent",
          },
        }}
      />
    </Box>
  );
}

