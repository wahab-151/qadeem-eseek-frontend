"use client";

import Image from "next/image";
import { Fragment, useState, useEffect } from "react";

// STYLED COMPONENTS
import { PreviewImage, ProductImageWrapper } from "./styles";
import { Box } from "@mui/material";
import CarouselModal from "./carousel-model";

export default function YourComponent({
  images = [{ preview: "/assets/images/logo3.jpeg" }],
}) {
  const [currentImage, setCurrentImage] = useState(0);

  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselStartIndex, setCarouselStartIndex] = useState(0);

  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [imageStyle, setImageStyle] = useState({
    width: "100%",
    height: "auto",
  });

  const mainSrc =
    Array.isArray(images) && images[currentImage]?.preview
      ? images[currentImage].preview
      : "/assets/images/logo3.jpeg";

  // Calculate image dimensions and set appropriate style
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      // Only use height 100% when width is strictly greater than height
      // Otherwise (height >= width, including when equal), use width 100%
      if (width > height) {
        // Width is greater than height, make height 100%
        setImageStyle({
          height: "100%",
          width: "auto",
          maxWidth: "100%",
          objectFit: "contain",
        });
      } else {
        // Height is greater than or equal to width (including when equal), make width 100%
        setImageStyle({
          width: "100%",
          height: "auto",
          maxHeight: "100%",
          minWidth: "100%",
        });
      }
    };
    img.onerror = () => {
      // Fallback to default style if image fails to load
      setImageStyle({ width: "100%", height: "auto" });
    };
    img.src = mainSrc;
  }, [mainSrc]);

  return (
    <Fragment>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        className="product-gallery"
      >
        {/* Thumbnail images - vertical stack on desktop, horizontal on mobile */}
        <Box
          className="preview-images"
          display="flex"
          flexDirection={{ xs: "row", sm: "column" }}
          justifyContent="flex-start"
          alignItems="center"
          gap={1}
          sx={{ 
            minWidth: { xs: "auto", sm: "80px" },
            order: { xs: 2, sm: 1 }
          }}
        >
          {images?.length > 0 &&
            images?.map((url, ind) => (
              <PreviewImage
                key={ind}
                onClick={() => setCurrentImage(ind)}
                selected={currentImage === ind}
              >
                <Image
                  width={64}
                  height={64}
                  alt="product"
                  src={url?.preview || "/assets/images/logo3.jpeg"}
                  sizes="64px"
                  quality={75}
                  style={{ objectFit: "cover", borderRadius: 0 }}
                />
              </PreviewImage>
            ))}
        </Box>

        {/* Main product image */}
        <Box sx={{ flex: 1, order: { xs: 1, sm: 2 } }}>
          <ProductImageWrapper
            onClick={() => {
              setCarouselStartIndex(currentImage);
              setIsCarouselOpen(true);
            }}
            className="relative"
          >
            <div
              onMouseEnter={() => setZoomVisible(true)}
              onMouseLeave={() => setZoomVisible(false)}
              onMouseMove={(e) => {
                const { left, top, width, height } =
                  e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;
                setZoomPosition({ x, y });
              }}
              className="relative w-full h-full cursor-crosshair overflow-hidden"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <img
                alt="product"
                src={mainSrc}
                className="transition-transform duration-300 ease-in-out hover:scale-110"
                style={{
                  ...imageStyle,
                  position: "relative",
                  display: "block",
                  flexShrink: 0,
                }}
              />

              {zoomVisible && (
                <div
                  className="absolute top-0 left-full ml-4 w-64 h-64 border border-gray-300 bg-white z-50 hidden sm:block transition-[background-position]"
                  style={{
                    backgroundImage: `url(${images[currentImage]?.highRes || images[currentImage]?.preview})`,
                    backgroundSize: "200%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              )}
            </div>
          </ProductImageWrapper>
        </Box>
      </Box>

      <CarouselModal
        open={isCarouselOpen}
        onClose={() => setIsCarouselOpen(false)}
        images={images.map((img, i) => ({
          imgSrc: img.highRes || img.preview,
          title: `Image ${i + 1}`,
        }))}
        initialIndex={carouselStartIndex}
      />
    </Fragment>
  );
}
