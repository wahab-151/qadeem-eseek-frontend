"use client";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import useUser from "hooks/useUser";
import { useGetProfileQuery } from "app/store/services";
import { Box, CircularProgress, Modal, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarTodayIcon,
  Place as PlaceIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import Link from "next/link";
import QadeemButton from "components/QadeemButton";
import { navigateToLogin } from "utils/helpers";
import { ProfileSkeleton } from "components/loaders/DashboardSkeletons";

// ==============================================================
export default function UserInfo() {
  const { state } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const methods = useForm({ defaultValues: { files: [] } });

  // Check if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth-token");
      const hasUser = state?.user?.id;
      const authenticated = !!(token || hasUser);
      setIsAuthenticated(authenticated);

      // Redirect immediately if not authenticated
      if (!authenticated) {
        const currentPath = window.location.pathname;
        navigateToLogin(currentPath);
      }
    }
  }, [state?.user?.id]);

  const {
    data: userProfile,
    isLoading,
    error,
  } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated, // Skip query if not authenticated
  });

  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
  ];
  const isImageFile = (url) => {
    if (!url || typeof url !== "string") return false;
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some((ext) => lowerUrl.endsWith(ext));
  };

  // Handle authentication errors and redirect to login
  useEffect(() => {
    if (error) {
      const errorStatus = error?.status || error?.data?.status || 500;
      const isUnauthorized = errorStatus === 401 || errorStatus === 500;

      if (isUnauthorized) {
        // Redirect to login with returnTo parameter
        const currentPath =
          typeof window !== "undefined" ? window.location.pathname : "/profile";
        navigateToLogin(currentPath);
      }
    }
  }, [error]);
  useEffect(() => {
    if (userProfile?.data?.user) {
      const user = userProfile.data.user;
      // store only strings (urls)
      setFiles(user.file || []);
      methods.setValue("files", user.file || []);
    }
  }, [userProfile, methods]);
  const nextFile = () =>
    setCurrentIndex((prev) => (prev + 1) % (files?.length || 1));
  const prevFile = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + (files?.length || 1)) % (files?.length || 1),
    );
  const handleOpen = (idx) => {
    setCurrentIndex(idx);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  // Prevent event propagation for buttons inside modal
  const handleButtonClick = (e, callback) => {
    e.stopPropagation();
    callback();
  };
  const displayUser = state?.user || userProfile?.data?.user;

  // Don't render if not authenticated (redirect will happen)
  if (!isAuthenticated) {
    return <ProfileSkeleton />;
  }

  return (
    <>
      <form>
        {isLoading ? (
          <ProfileSkeleton />
        ) : displayUser ? (
          <Card
            sx={{
              p: { xs: 2, sm: 3, md: 4, lg: 5 },
              borderRadius: "0px",
              boxShadow: "none",
              border: "1px solid",
              borderColor: "primary.main",
              bgcolor: "#fff",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: { sm: "absolute" },
                top: { sm: 24, md: 32 },
                right: { sm: 24, md: 32 },
                mb: { xs: 3, sm: 0 },
                display: "flex",
                justifyContent: { xs: "flex-start", sm: "flex-end" },
              }}
            >
              <QadeemButton
                variant="outlined"
                href={`/profile/${displayUser.id}`}
                startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                component={Link}
                sx={{
                  borderRadius: "0px",
                  color: "#2C2416",
                  borderColor: "#2C2416",
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "transparent",
                  },
                }}
              >
                Edit Profile
              </QadeemButton>
            </Box>

            <Grid container spacing={4} rowSpacing={5}>
              <TableRowItem
                Icon={PersonIcon}
                title="Name"
                value={`${displayUser?.firstName || ""} ${displayUser?.lastName || ""}`}
                size={6}
              />
              <TableRowItem
                Icon={EmailIcon}
                title="Email"
                value={displayUser?.email}
                size={6}
              />
              <TableRowItem
                Icon={PhoneIcon}
                title="Phone"
                value={displayUser?.phone}
                size={6}
              />
              <TableRowItem
                Icon={CalendarTodayIcon}
                title="Member Since"
                value={
                  displayUser?.createdAt
                    ? format(new Date(displayUser.createdAt), "dd MMM, yyyy")
                    : ""
                }
                size={6}
              />
              <TableRowItem
                Icon={PlaceIcon}
                title="Address"
                value={
                  <>
                    {displayUser?.addressLine1}
                    {displayUser?.addressLine2 && (
                      <>, {displayUser.addressLine2}</>
                    )}
                    <br />
                    {displayUser?.city}, {displayUser?.state}
                  </>
                }
                size={12}
              />
            </Grid>
          </Card>
        ) : (
          <ProfileSkeleton />
        )}
        {/* MODAL */}
        <Modal open={open} onClose={handleClose}>
          <Box
            onClick={handleClose} // Close modal when clicking on the backdrop
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              bgcolor: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={(e) => handleButtonClick(e, handleClose)}
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                color: "#fff",
                zIndex: 10000,
              }}
            >
              <CloseIcon />
            </IconButton>
            {/* Prev Button */}
            <IconButton
              onClick={(e) => handleButtonClick(e, prevFile)}
              sx={{
                position: "absolute",
                left: 30,
                color: "#fff",
                zIndex: 10000,
              }}
            >
              <ArrowBackIosNewIcon fontSize="large" />
            </IconButton>
            {/* File Display */}
            <Box
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on content
              sx={{
                maxWidth: "90%",
                maxHeight: "90%",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {isImageFile(files[currentIndex]) ? (
                <Image
                  src={files[currentIndex]}
                  alt={`Preview ${currentIndex + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <Box sx={{ width: "100%", height: "100%", bgcolor: "white" }}>
                  <iframe
                    src={files[currentIndex]}
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                  />
                </Box>
              )}
            </Box>
            {/* Next Button */}
            <IconButton
              onClick={(e) => handleButtonClick(e, nextFile)}
              sx={{
                position: "absolute",
                right: 30,
                color: "#fff",
                zIndex: 10000,
              }}
            >
              <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
          </Box>
        </Modal>
      </form>
    </>
  );
}
function TableRowItem({ title, value, Icon, size = 6 }) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: size }}>
      <FlexBox alignItems="center" gap={1} mb={0.5}>
        {Icon && <Icon sx={{ fontSize: 16, color: "#2C2416" }} />}
        <Typography
          variant="body1"
          sx={{
            color: "#2C2416",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "14px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
      </FlexBox>
      <Typography
        variant="body1"
        sx={{
          color: "#705D27",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: 1.4,
          pl: Icon ? 3.25 : 0,
        }}
      >
        {value || "-"}
      </Typography>
    </Grid>
  );
}
