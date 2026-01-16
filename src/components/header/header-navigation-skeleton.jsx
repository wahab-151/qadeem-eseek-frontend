"use client";
import FlexBox from "components/flex-box/flex-box";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function HeaderNavigationSkeleton() {
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
          width={60 + Math.random() * 40}
          height={20}
          sx={{
            borderRadius: "4px",
          }}
        />
      ))}
    </FlexBox>
  );
}








