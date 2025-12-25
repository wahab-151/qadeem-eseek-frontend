"use client";

import Image from "next/image";
import { Fragment, useState } from "react";

// STYLED COMPONENTS
import { PreviewImage, ProductImageWrapper } from "./styles";
import { Box } from "@mui/material";
import CarouselModal from "./carousel-model";

export default function YourComponent({ images =[{ preview: "/assets/images/logo3.jpeg" }]}) {
  const [currentImage, setCurrentImage] = useState(0);
  

  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselStartIndex, setCarouselStartIndex] = useState(0);

  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const mainSrc = (Array.isArray(images) && images[currentImage]?.preview)
    ? images[currentImage].preview
    : "/assets/images/logo3.jpeg";

  return (
    <Fragment>
      <Box display="flex" flexDirection="column" gap={2} className="product-gallery">
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
              const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - left) / width) * 100;
              const y = ((e.clientY - top) / height) * 100;
              setZoomPosition({ x, y });
            }}
            className="relative w-full h-full cursor-crosshair overflow-hidden"
          >
            <Image
              fill
              alt="product"
              objectFit="contain"
              src={mainSrc}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              quality={90}
              priority
              className="transition-transform duration-300 ease-in-out hover:scale-110"
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

        <Box className="preview-images" display="flex" justifyContent="center" alignItems="center" gap={1}>
          {images?.length > 0 && images?.map((url, ind) => (
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
                style={{ objectFit: 'cover', borderRadius: '10px' }}
              />
            </PreviewImage>
          ))}
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
