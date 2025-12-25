import Box from "@mui/material/Box";
export default function FlexBox({
  children,
  fullWidth,
  sx,
  ...props
}) {
  const mergedSx = fullWidth ? { width: "100%", ...sx } : sx;
  return <Box display="flex" sx={mergedSx} {...props}>
      {children}
    </Box>;
}