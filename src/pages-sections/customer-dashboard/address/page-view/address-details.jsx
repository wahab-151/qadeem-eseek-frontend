import { Fragment } from "react";
import Card from "@mui/material/Card";
import Place from "@mui/icons-material/Place";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import Box from "@mui/material/Box";

import AddressForm from "../address-form";
import DashboardHeader from "../../dashboard-header";
import QadeemButton from "components/QadeemButton";

// CUSTOM DATA MODEL

// =============================================================

// =============================================================

export default function AddressDetailsPageView({ address }) {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Place}
        href="/address"
        title={address.id ? "Edit Address" : "Add New Address"}
        buttonText="Back to Address"
        hideButton={true}
      />

      {/* FORM AREA */}
      <Card
        sx={{
          borderRadius: 0,
          boxShadow: "none",
          border: "none",
          p: 0,
        }}
      >
        <Box mb={4}>
          <QadeemButton
            variant="outlined"
            href="/address"
            startIcon={<ArrowBack sx={{ fontSize: 16 }} />}
            component={Link}
            sx={{
              borderRadius: "0px",
              color: "#2B2118",
              borderColor: "transparent",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "transparent",
              },
            }}
          >
            Back to Address
          </QadeemButton>
        </Box>
        <AddressForm address={address} />
      </Card>
    </Fragment>
  );
}
