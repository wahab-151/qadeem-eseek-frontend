"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Add from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

// LOCAL CUSTOM COMPONENT
import Pagination from "../../pagination";
import AddressListItem from "../address-item";

// STYLED COMPONENT
const AddCard = styled(Link)(({ theme }) => ({
  border: "1px dashed #2B2118",
  display: "flex",
  height: "100%",
  minHeight: "170px",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  textDecoration: "none",
  color: "#2B2118",
  transition: "all 0.2s ease-in-out",
  borderRadius: "0px",
  backgroundColor: "rgba(43, 33, 24, 0.02)",
  "&:hover": {
    backgroundColor: "rgba(43, 33, 24, 0.05)",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
    borderColor: "#2B2118",
    borderStyle: "solid",
  },
}));

export default function AddressPageView({ addressList, totalPages }) {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#2C2416",
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: "24px", sm: "32px" },
          fontFamily: "Inter, sans-serif",
        }}
      >
        Address
      </Typography>
      {/* ALL ADDRESS LIST AREA */}
      <Grid container spacing={3}>
        {addressList.map((address) => (
          <Grid size={{ md: 6, xs: 12 }} key={address.id}>
            <AddressListItem address={address} />
          </Grid>
        ))}

        <Grid size={{ md: 6, xs: 12 }}>
          <AddCard href="/address/create">
            <Add sx={{ fontSize: 40, mb: 1, opacity: 0.6 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Add New Address
            </Typography>
          </AddCard>
        </Grid>
      </Grid>

      {/* PAGINATION AREA */}
      <Box mt={5} display="flex" justifyContent="center">
        <Pagination count={totalPages} />
      </Box>
    </Box>
  );
}
