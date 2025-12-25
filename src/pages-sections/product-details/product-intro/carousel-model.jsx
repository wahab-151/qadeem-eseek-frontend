'use client';

import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Slide,
  IconButton,
  Pagination
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close as CloseIcon
} from "@mui/icons-material";
import CarouselSlide from "./carousel-slide";

;

export default function CarouselModal({ open, onClose, images, initialIndex = 0 }) {
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState("left");
  const [index, setIndex] = useState(initialIndex);

  const numSlides = images.length;
  const content = images[index];

  const onArrowClick = (direction) => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;
    const oppDirection = direction === "left" ? "right" : "left";

    setSlideDirection(direction);
    setSlideIn(false);

    setTimeout(() => {
      setIndex(newIndex);
      setSlideDirection(oppDirection);
      setSlideIn(true);
    }, 300);
  };

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 z-50 p-4">
        {/* Close Button - left side on image with secondary color and hover
        <IconButton
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.secondary.main,
            position: 'absolute',
            top: 16,
            left: 16,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.action.hover,
              color: (theme) => theme.palette.secondary.dark
            }
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton> */}

        {/* Arrows and Slide */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <IconButton onClick={() => onArrowClick("left")} sx={{ color: "white" }}>
            <ArrowBackIos />
          </IconButton>

          <Slide in={slideIn} direction={slideDirection}>
            <div style={{ margin: "0 1rem" }}>
              <CarouselSlide content={content} onImageClick={onClose} onClose={onClose} />
            </div>
          </Slide>

          <IconButton onClick={() => onArrowClick("right")} sx={{ color: "white" }}>
            <ArrowForwardIos />
          </IconButton>
        </Box>

        {/* Thumbnails */}
        <Box sx={{ display: 'flex', gap: 1, mt: 3, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {images.map((img, i) => (
            <Box
              key={i}
              onClick={() => setIndex(i)}
              sx={{
                width: 56,
                height: 56,
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                outline: i === index ? '2px solid' : 'none',
                outlineColor: (theme) => theme.palette.primary.main
              }}
            >
              <img
                src={img.imgSrc}
                alt={`thumb-${i}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
