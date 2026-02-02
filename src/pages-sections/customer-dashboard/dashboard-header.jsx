"use client";

import Link from "next/link";

// MUI
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

// MUI ICON COMPONENTS
import { Menu, Edit } from "@mui/icons-material";

// GLOBAL CUSTOM COMPONENTS
import SideNav from "components/side-nav";
import { Navigation } from "components/layouts/customer-dashboard";
import useUser from "hooks/useUser";
import Person from "@mui/icons-material/Person";
import { usePathname } from "next/navigation";
import QadeemButton from "components/QadeemButton";

// STYLED COMPONENT
const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: 0,
  marginBottom: theme.spacing(3),
  "& .header-hold": {
    flexGrow: 1,
    display: "flex",
    marginTop: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    "& .btn-link": {
      display: "none",
    },
    [theme.breakpoints.up(575)]: {
      "& .btn-link": {
        display: "inline-flex",
      },
    },
  },
  "& .btn-link": {
    display: "none",
    [theme.breakpoints.down(575)]: {
      display: "flex",
      marginTop: "1rem",
    },
  },
  "& .right": {
    gap: "1rem",
    display: "flex",
    alignItems: "center",
  },
  "& .menu-icon-box": {
    display: "none",
    [theme.breakpoints.down("lg")]: {
      display: "block",
    },
  },
  "& .avatar": {
    width: 35,
    height: 35,
    backgroundColor: theme.palette.grey[200],
    borderRadius: "0px",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

// ==============================================================

export default function DashboardHeader({
  title = "My Profile",
  buttonText = "Edit Profile",
  Icon = Person,
  hideButton = false,
}) {
  const { state } = useUser();
  const pathname = usePathname();

  let isProfilePage = false;
  if (state?.user?.id) {
    isProfilePage = pathname === `/profile/${state.user.id}`;
  }

  const HEADER_LINK = state?.user?.id && (
    <QadeemButton
      variant="outlined"
      href={`/profile/${state.user.id}`}
      startIcon={<Edit sx={{ fontSize: 16 }} />}
      component={Link}
      className="btn-link"
      sx={{
        borderRadius: "0px",
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {buttonText}
    </QadeemButton>
  );

  return (
    <StyledRoot>
      <div className="header-hold" style={{ marginTop: 0 }}>
        {/* Simplified: Title moved to page hero */}
        {title !== "Requests" && (
          <div
            className="right"
            style={{ flexGrow: 1, justifyContent: "flex-end" }}
          >
            <div className="menu-icon-box">
              <SideNav
                position="left"
                handler={({ open }) => (
                  <IconButton onClick={open}>
                    <Menu fontSize="small" />
                  </IconButton>
                )}
              >
                <Navigation />
              </SideNav>
            </div>

            {!isProfilePage && !hideButton && HEADER_LINK}
          </div>
        )}
      </div>
    </StyledRoot>
  );
}
