"use client";

import React from "react";
import { Button, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

export default function ContactButton() {
  const theme = useTheme();
  const router = useRouter();

  const handleClick = () => {
    router.push("/contact-us");
  };

  return (
    <Button
      variant="outlined"
      startIcon={<PhoneIcon />}
      onClick={handleClick}
      sx={{
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: "30px",
        textTransform: "none",
        boxShadow: 2,
        height: { xs: 36, sm: 40 },
        width: { xs: 40, sm: 44, md: 48, lg: 130 },
        minWidth: { xs: 40, sm: 44, md: 48, lg: 130 },
        px: { xs: 0.5, sm: 0.5, md: 0.75, lg: 2 },
        justifyContent: { xs: 'center', lg: 'flex-start' },
        fontWeight: 500,
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        fontSize: { xs: '13px'},
        "& .MuiButton-startIcon": {
          margin: 0,
        },
        "&:hover": {
          backgroundColor: theme.palette.secondary.main,
          color: "#fff",
        },
      }}
    >
      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'inline' } }}>
        Contact Us
      </Box>
    </Button>
  );
}