"use client";
import FlexBox from "components/flex-box/flex-box";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function HeaderNavigationSkeleton() {
  // Use fixed widths to prevent hydration mismatch
  // These widths are based on typical navigation item sizes
  const skeletonWidths = [70, 80, 75, 90, 65, 85];
  
  return (
    <FlexBox
      alignItems="center"
      gap={3}
      sx={{
        position: "relative",
      }}
    >
      {/* Skeleton for navigation items */}
      {Array.from({ length: 6 }).map((_, idx) => (
        <Skeleton
          key={idx}
          variant="text"
          width={skeletonWidths[idx] || 75}
          height={20}
          sx={{
            borderRadius: "4px",
          }}
        />
      ))}
    </FlexBox>
  );
}








