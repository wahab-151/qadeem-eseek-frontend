import Box from "@mui/material/Box";
export default function FlexRowCenter({
  children,
  justifyContent="center",
  ...props
}) {
  return <Box display="flex"  justifyContent={justifyContent} alignItems="center" {...props}>
      {children}
    </Box>;
}