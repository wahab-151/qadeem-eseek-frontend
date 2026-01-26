"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

export default function HomeSectionHeader({
  subtitle,
  title,
  description,
  actionLabel = "GO TO SHOP",
  actionHref,
  maxWidth = 520,
  mb = 6,
}) {
  return (
    <Box
      sx={{
        gap: "20px",
        mb,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          maxWidth,
        }}
      >
        {subtitle ? (
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: 500,
              fontFamily: "sans-serif",
              color: "#271E03",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {subtitle}
          </Typography>
        ) : null}

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "32px", sm: "40px", md: "52px" },
            fontWeight: 400,
            fontFamily: "Inter, sans-serif",
            color: "#271E03",
            lineHeight: { xs: 1.1, md: "90%" },
            letterSpacing: "0px",
            textAlign: "left",
          }}
        >
          {title}
        </Typography>

        {description ? (
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              lineHeight: "26px",
              color: "#271E03",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              letterSpacing: "0%",
              textAlign: "left",
            }}
          >
            {description}
          </Typography>
        ) : null}
      </Box>

      {actionHref ? (
        <MuiLink
          component={Link}
          href={actionHref}
          underline="none"
          sx={{
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#271E03",
            mt: { xs: 0, md: 1.5 },
            pb: "2px",
            borderBottom: "2px solid #E2C572",
            "&:hover": {
              borderBottomColor: "#271E03",
            },
          }}
        >
          {actionLabel}
        </MuiLink>
      ) : null}
    </Box>
  );
}


