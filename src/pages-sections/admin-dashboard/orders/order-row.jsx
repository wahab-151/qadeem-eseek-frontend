import Link from "next/link";
import { format } from "date-fns";
// MUI ICON COMPONENTS
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENTS
import { StatusWrapper, StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
// ========================================================================
// ========================================================================
export default function OrderRow({
  order,
  refetch
}) {
  const {
    amount,
    id,
    qty,
    purchaseDate,
    billingAddress,
    status,
    user
  } = order;
  // console.log("order==>ggggeeeeeeeeeee admin ", billingAddress)
  return <StyledTableRow tabIndex={-1} role="checkbox">
    <StyledTableCell align="left">#{id}</StyledTableCell>
    <StyledTableCell align="left">{qty}</StyledTableCell>
    <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
      {format(new Date(purchaseDate), "dd MMM yyyy")}
    </StyledTableCell>
    <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
      {user?.firstName + " " + user?.lastName}
    </StyledTableCell>
    <StyledTableCell align="left">{currency(amount)}</StyledTableCell>
    <StyledTableCell align="left">
      <StatusWrapper status={status}>{status}</StatusWrapper>
    </StyledTableCell>
    <StyledTableCell align="center">
      {status === "Pending" ? (
        <Link href={`/admin/orders/${id}`}>
          <StyledIconButton>
            <Edit />
          </StyledIconButton>
        </Link>
      ) : (
        <>
          <Link href={`/admin/orders/${id}`}>
            <StyledIconButton>
              <RemoveRedEye />
            </StyledIconButton>
          </Link>
          <Tooltip title="Add / Edit Tracking Id">
            <Link href={`/admin/orders/trackID/${id}`}>
              <StyledIconButton>
                <TrackChangesIcon />
              </StyledIconButton>
            </Link>
          </Tooltip>
        </>
      )}
    </StyledTableCell>
  </StyledTableRow>;
}