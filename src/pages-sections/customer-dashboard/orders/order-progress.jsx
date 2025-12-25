"use client";

import { Fragment } from "react";

// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";
import Done from "@mui/icons-material/Done";
import { format } from "date-fns";

// CUSTOM ICON COMPONENTS
import Delivery from "icons/Delivery";
import PackageBox from "icons/PackageBox";
import TruckFilled from "icons/TruckFilled";

// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_PROCESSSING,
} from "utils/constants";
import { Tooltip, useTheme } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew"; // At top of file


// CUSTOM DATA MODEL

// STYLED COMPONENTS

const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  "& .line": {
    height: 4,
    minWidth: 50,
    flex: "1 1 0",
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
      height: 50,
      minWidth: 4,
    },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  top: -5,
  right: -5,
  width: 22,
  height: 22,
  position: "absolute",
  bgcolor: theme.palette.grey[200],
  color: theme.palette.success.main,
}));

const STATUS_COLOR_MAP = (theme) => ({
  [ORDER_STATUS_DELIVERED]: {
    color: theme.palette.common.white,
    bgcolor: theme.palette.success.main,
  },
  [ORDER_STATUS_PROCESSSING]: {
    color: theme.palette.common.white,
    bgcolor: theme.palette.info.main,
  },
  [ORDER_STATUS_PENDING]: {
    color: theme.palette.text.primary,
    bgcolor: theme.palette.warning.light,
  },
  [ORDER_STATUS_CANCELLED]: {
    color: theme.palette.common.white,
    bgcolor: theme.palette.error.main,
  },
});

export default function OrderProgress({
  status,
  deliveredAt,
  isDelivered,
  trackingId,
}) {
  const theme = useTheme();

  const STEP_ICONS = [PackageBox, TruckFilled, Delivery];
  const ORDER_STATUS_LIST = [
    ORDER_STATUS_PENDING,
    ORDER_STATUS_PROCESSSING,
    ORDER_STATUS_DELIVERED,
    ORDER_STATUS_CANCELLED,
  ];
  const statusIndex = ORDER_STATUS_LIST.indexOf(status?.toLowerCase());

  const { color, bgcolor } = STATUS_COLOR_MAP(theme)[status?.toLowerCase()] || {
    color: theme.palette.text.primary,
    bgcolor: theme.palette.grey[300],
  };

  return (
    <Card
      sx={{
        p: "2rem 1.5rem",
        mb: 4,
      }}
    >
      <StyledFlexbox>
        {STEP_ICONS.map((Icon, ind) => (
          <Fragment key={ind}>
            <Box position="relative">
              <Avatar
                alt="shipping"
                sx={{
                  width: 64,
                  height: 64,
                  color: ind <= statusIndex ? "white" : "primary.main",
                  bgcolor: ind <= statusIndex ? "primary.main" : "grey.300",
                }}
              >
                <Icon color="inherit" fontSize="large" />
              </Avatar>

              {ind < statusIndex && (
                <StyledAvatar alt="done">
                  <Done
                    color="inherit"
                    sx={{
                      fontSize: 16,
                    }}
                  />
                </StyledAvatar>
              )}
            </Box>

            {ind < STEP_ICONS.length - 1 && (
              <Box
                className="line"
                bgcolor={ind < statusIndex ? "primary.main" : "grey.300"}
              />
            )}
          </Fragment>
        ))}
      </StyledFlexbox>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <> {trackingId && (
          <Typography variant="body1" component="span">
            <b>Tracking ID: </b>
            <Tooltip title="Track your shipment on UPS">
            <a
              href={`https://www.ups.com/track?loc=en_US&tracknum=${trackingId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                color: theme.palette.primary.main,
                textDecoration: "underline",
                fontWeight: 500,
              }}
            >
               {trackingId} <OpenInNewIcon fontSize="small" />
            </a>
            </Tooltip>
          </Typography>
        )}
        </>
        <FlexBox
          justifyContent={{
            xs: "center",
            sm: "flex-end",
          }}
        >
          <Box
            sx={{
              p: "0.5rem 1rem",
              textAlign: "center",
              borderRadius: "300px",
              display: "inline-block",
              color,
              bgcolor,
            }}
          >
            <Typography variant="body1" component="span">
              {isDelivered ? (
                <>
                  Delivery on{" "}
                  <b>{format(new Date(deliveredAt), "dd MMM yyyy")}</b>
                </>
              ) : (
                <>
                  Order Status: <b>{status}</b>
                </>
              )}
            </Typography>
          </Box>
        </FlexBox>
      </Box>
    </Card>
  );
}
