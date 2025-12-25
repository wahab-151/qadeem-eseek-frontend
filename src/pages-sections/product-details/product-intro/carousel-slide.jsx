'use client';

import { Box, Card, CardMedia, Typography, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const CarouselSlide = ({ content, onImageClick, onClose }) => {
const { imgSrc = "/assets/images/logo.jpeg", title = "SIFRA" } = content || {};

  return (
    <Card
      sx={{
        borderRadius: 2,
        width: "80vw",
        height: "70vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        position: 'relative'
      }}
    >
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            width: 44,
            height: 44,
            color: (theme) => theme.palette.secondary.main,
            backgroundColor: 'transparent',
            borderRadius: '50%',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'transparent',
              color: (theme) => theme.palette.secondary.dark,
              border: '2px solid',
              borderColor: (theme) => theme.palette.primary.main
            }
          }}
        >
          <CloseIcon sx={{ fontSize: 28, fontWeight: 700 }} />
        </IconButton>
      )}
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}xcccccc
      </Typography>
      <CardMedia
        component="img"
        image={imgSrc }
        alt={title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          cursor: onImageClick ? "pointer" : "default"
        }}
        onClick={onImageClick}
      />
    </Card>
  );
};

export default CarouselSlide;
