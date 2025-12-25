"use client";

import Chip from "@mui/material/Chip";
import styled from "@mui/material/styles/styled";


// STYLED COMPONENT
const StyledChip = styled(Chip, {
  shouldForwardProp: prop => prop !== "shape"
})(({
  shape
}) => ({
  zIndex: 1,
  top: "4px",
  left: "2px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 500,
  borderRadius: 8,
  fontSize: "10px",
  position: "absolute",
  ...(shape === "square" && {
    borderRadius: 0
  })
}));


// ==============================================================


// ==============================================================

export default function DiscountChip({
  price=0,
  discount = 0,
  shape = "rounded",
  ...props
}) {

const offAmount = price - discount

  return discount > 0 ? <StyledChip size="small" shape={shape} label={`$ ${offAmount.toFixed(2)} off`} {...props} /> : null;
}