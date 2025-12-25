"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Lightweight wrapper to ensure Next/Image always receives either `fill` or width/height.
// Also applies sensible defaults for non-fill usage to avoid runtime errors.
// Includes error handling for image optimization timeouts (504 Gateway Timeout)
// Note: Next.js Image doesn't support onError, so we use a timeout-based fallback
export default function LazyImage(props) {
  const { fill, width, height, style, src, alt, ...rest } = props;
  const [useFallback, setUseFallback] = useState(false);

  // Extract original URL if it's a Next.js optimized URL
  const getOriginalUrl = (url) => {
    if (typeof url === 'string' && url.includes('/_next/image')) {
      try {
        const urlObj = new URL(url, window.location.origin);
        return decodeURIComponent(urlObj.searchParams.get('url') || url);
      } catch {
        return url;
      }
    }
    return url;
  };

  // Set up timeout to detect slow image optimization (504 errors)
  useEffect(() => {
    if (!useFallback && src) {
      // If image takes more than 5 seconds, assume optimization failed
      const timeout = setTimeout(() => {
        setUseFallback(true);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [src, useFallback]);

  // If we need to use fallback (optimization failed or timeout), use regular img tag
  if (useFallback) {
    const fallbackSrc = getOriginalUrl(src);

    if (fill) {
      return (
        <img
          src={fallbackSrc}
          alt={alt || ''}
          style={{ 
            objectFit: "cover", 
            width: "100%", 
            height: "100%",
            ...style 
          }}
          loading="lazy"
        />
      );
    }

    return (
      <img
        src={fallbackSrc}
        alt={alt || ''}
        width={typeof width === "number" ? width : 1200}
        height={typeof height === "number" ? height : 600}
        style={{ 
          objectFit: "cover", 
          borderRadius: "25px", 
          width: "100%", 
          height: "auto", 
          ...style 
        }}
        loading="lazy"
      />
    );
  }

  // Use Next.js Image (will fallback after 5 seconds if optimization is slow)
  if (fill) {
    return (
      <Image
        fill
        src={src}
        alt={alt || ''}
        style={{ objectFit: "cover", ...style }}
        {...rest}
      />
    );
  }

  const finalWidth = typeof width === "number" ? width : 1200;
  const finalHeight = typeof height === "number" ? height : 600;

  return (
    <Image
      width={finalWidth}
      height={finalHeight}
      src={src}
      alt={alt || ''}
      style={{ objectFit: "cover", borderRadius: "25px", width: "100%", height: "auto", ...style }}
      {...rest}
    />
  );
}