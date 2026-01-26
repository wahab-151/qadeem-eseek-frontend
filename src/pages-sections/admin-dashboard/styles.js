import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { alpha, styled } from "@mui/material/styles";
import Clear from "@mui/icons-material/Clear";
const StyledTableCell = styled(TableCell)(({
  theme
}) => ({
  fontSize: 14,
  paddingTop: 10,
  fontWeight: 500,
  paddingBottom: 10,
  color: "#2C2416", // Deep warm brown text
  borderBottom: `1px solid #EFE6D5` // Light heritage border
}));
const CategoryWrapper = styled(Box)(({
  theme
}) => ({
  fontSize: 13,
  padding: "3px 12px",
  borderRadius: "16px",
  display: "inline-block",
  color: "#2C2416", // Deep warm brown text
  backgroundColor: "#EFE6D5" // Light heritage beige
}));
const StyledTableRow = styled(TableRow)({
  transition: "background-color 0.2s ease",
  ":last-child .MuiTableCell-root": {
    border: 0
  },
  "&:hover": {
    backgroundColor: "rgba(139, 117, 72, 0.04)", // Very subtle bronze tint on hover
  },
  "&:nth-of-type(even)": {
    backgroundColor: "rgba(239, 230, 213, 0.3)", // Very light beige for alternating rows
  },
  "&:nth-of-type(even):hover": {
    backgroundColor: "rgba(139, 117, 72, 0.06)", // Slightly darker on hover for even rows
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(139, 117, 72, 0.1)",
    ":hover": {
      backgroundColor: "rgba(139, 117, 72, 0.15)"
    }
  }
});
const StyledIconButton = styled(IconButton)(({
  theme
}) => ({
  color: "#6B5D4F", // Medium brown
  "& .MuiSvgIcon-root": {
    fontSize: 19
  },
  ":hover": {
    color: "#8B7548", // Heritage bronze
    backgroundColor: "rgba(139, 117, 72, 0.08)"
  }
}));
const StatusWrapper = styled(Box, {
  shouldForwardProp: prop => prop !== "status"
})(({
  theme,
  status
}) => {
  let color = theme.palette.secondary.main;
  let backgroundColor = theme.palette.secondary[100];
  if (status === "Accepted" || status === "Delivered" || status === "Normal") {
    color = theme.palette.success.main;
    backgroundColor = theme.palette.success[100];
  }
  if (status === "Rejected" || status === "Urgent" || status === "Cancelled") {
    color = theme.palette.error.main;
    backgroundColor = theme.palette.error[100];
  }
  if (status === "Processing") {
    color = theme.palette.warning.main;
    backgroundColor = theme.palette.warning[100];
  }
  if (status === "Pending") {
    color = theme.palette.info.main;
    backgroundColor = theme.palette.info[100];
  }
  return {
    color,
    fontSize: 12,
    fontWeight: 500,
    backgroundColor,
    borderRadius: "8px",
    padding: "3px 12px",
    display: "inline-flex"
  };
});
const UploadImageBox = styled(Box)(({
  theme
}) => ({
  width: 70,
  height: 70,
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(139, 117, 72, 0.1)" // Light heritage bronze
}));
const StyledClear = styled(Clear)({
  top: 5,
  right: 5,
  fontSize: 14,
  cursor: "pointer",
  position: "absolute"
});
export { CategoryWrapper, StyledIconButton, StyledTableRow, StyledTableCell, StatusWrapper, UploadImageBox, StyledClear };