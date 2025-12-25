"use client";

import Link from "next/link";

// MUI
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// MUI ICON COMPONENTS
import { Menu } from "@mui/icons-material";

// GLOBAL CUSTOM COMPONENTS
import SideNav from "components/side-nav";
import FlexBox from "components/flex-box/flex-box";
import { Navigation } from "components/layouts/customer-dashboard";
import useUser from "hooks/useUser";
import { notFound } from "next/navigation";
import Person from "@mui/icons-material/Person";
import { usePathname } from "next/navigation";

// STYLED COMPONENT
const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(-2),
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
        display: "block",
      },
    },
  },
  "& .btn-link": {
    display: "none",
    paddingInline: "2rem",
    backgroundColor: theme.palette.primary.light,
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
  "& .avatar": {
    width: 35,
    height: 35,
    backgroundColor: theme.palette.grey[200],
  },
  [theme.breakpoints.up("lg")]: {
    "& .right > div": {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

// ==============================================================

// ==============================================================

// export default function DashboardHeader({
//   title = "My Profile",
//   buttonText = "Edit Profile",
//   Icon = Person,
//   buttonText,
// }) {
//   const { state } = useUser();
//   const pathname = usePathname();
// const isProfilePage = pathname === `/profile/${state?.user?.id}`;

//   // console.log("userrrr in headr", title, buttonText, state);

//   // if (!state?.user) notFound();
//   const HEADER_LINK = (
//     <Button
//       href={`/profile/${state?.user?.id}`}
//       color="primary"
//       LinkComponent={Link}
//       className="btn-link"
//     >
//       {buttonText}
//     </Button>
//   );

//   return (
//     <StyledRoot>
//       <div className="header-hold">
//         <FlexBox alignItems="center" gap={1.5}>
//           {Icon && (
//             <Avatar variant="rounded" className="avatar">
//               <Icon color="primary" />
//             </Avatar>
//           )}

//           <Typography noWrap variant="h2">
//             {title}
//           </Typography>
//         </FlexBox>

//         {/* SHOW ONLY SMALL DEVICE */}
//         <div className="right">
//           <SideNav
//             position="left"
//             handler={({ open, close }) => (
//               <IconButton onClick={open}>
//                 <Menu fontSize="small" />
//               </IconButton>
//             )}
//           >
//             <Navigation />
//           </SideNav>
//           {buttonText ? HEADER_LINK : null}
//         </div>
//       </div>

//       {buttonText ? HEADER_LINK : null}
//     </StyledRoot>
//   );
// }

export default function DashboardHeader({
  title = "My Profile",
  buttonText = "Edit Profile",
  Icon = Person,
}) {
  const { state } = useUser();
  const pathname = usePathname();

  let isProfilePage = false;
  if (state?.user?.id) {
    isProfilePage = pathname === `/profile/${state.user.id}`;
  }

  const HEADER_LINK = state?.user?.id && (
    <Button
      href={`/profile/${state.user.id}`}
      color="primary"
      LinkComponent={Link}
      className="btn-link"
    >
      {buttonText}
    </Button>
  );

  return (
    <StyledRoot>
      <div className="header-hold">
        <FlexBox alignItems="center" gap={1.5}>
          {Icon && (
            <Avatar variant="rounded" className="avatar">
              <Icon color="primary" />
            </Avatar>
          )}
          <Typography noWrap variant="h2">
            {title}
          </Typography>
        </FlexBox>

        {title !== "Requests" && <div className="right">
          <SideNav
            position="left"
            handler={({ open, close }) => (
              <IconButton onClick={open}>
                <Menu fontSize="small" />
              </IconButton>
            )}
          >
            <Navigation />
          </SideNav>

          {/* {!isProfilePage && buttonText ? HEADER_LINK : null} */}
          {!isProfilePage && HEADER_LINK}
        </div>}
      </div>
      {title !== "Requests" && !isProfilePage && HEADER_LINK}
      {/* {!isProfilePage && buttonText ? HEADER_LINK : null} */}
    </StyledRoot>
  );
}
