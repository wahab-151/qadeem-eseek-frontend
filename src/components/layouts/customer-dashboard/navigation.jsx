"use client";

import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import CameraAlt from "@mui/icons-material/CameraAlt";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";

// UTILS
import { uploadToS3 } from "utils/s3Helper";
import { compressImage } from "utils/helpers";
import {
  useUpdateUserProfileMutation,
  useUploadImageMutation,
} from "app/store/services";

// CUSTOM COMPONENTS
import NavItem from "./nav-item";

// STYLED COMPONENTS
import { MainContainer } from "./styles";

// API FUNCTIONS
import { MENUS } from "utils/__api__/user-dashboard";
import useUser from "hooks/useUser";
import { useGetProfileQuery } from "app/store/services";

export default function Navigation() {
  const { state: userState, dispatch: userDispatch } = useUser();
  const { data: profileData } = useGetProfileQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [uploadImage] = useUploadImageMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);

  const navigation = MENUS;

  if (!navigation) return null;

  const sessionUser = userState?.user;
  const profileUser = profileData?.data?.user;
  const user = sessionUser || profileUser;

  const userAvatar =
    user?.avatar ||
    (Array.isArray(user?.file) && user.file[0]) ||
    "/assets/images/faces/propic.png";

  const renderName = () => {
    if (user?.firstName) return `${user.firstName} ${user.lastName || ""}`;
    if (typeof user?.name === "object")
      return `${user.name.firstName || ""} ${user.name.lastName || ""}`.trim();
    return user?.name || "User";
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      enqueueSnackbar("Uploading profile image...", { variant: "info" });

      // 1. Compress Image
      const compressedFile = await compressImage(file);

      // 2. Get Signed URL
      const uniqueId = uuidv4();
      const s3Data = await uploadImage({
        fileName: `${uniqueId}-${file.name}`,
        fileType: file.type,
      }).unwrap();

      // 3. Upload to S3
      const uploadedUrl = await uploadToS3({
        url: s3Data.url,
        blob: compressedFile,
        fileType: file.type,
      });

      if (uploadedUrl) {
        // 4. Update Profile
        const cleanUrl = uploadedUrl.split("?")[0];

        // Include all existing user data to satisfy all backend validation requirements
        await updateUserProfile({
          ...user,
          userId: user?.id,
          avatar: cleanUrl,
          files: [cleanUrl],
        }).unwrap();

        // Update local context manually to reflect changes immediately
        userDispatch({
          type: "SET_USER",
          payload: { ...user, avatar: cleanUrl, file: [cleanUrl] },
        });

        enqueueSnackbar("Profile image updated successfully!", {
          variant: "success",
        });
      } else {
        throw new Error("S3 Upload Failed");
      }
    } catch (error) {
      console.error("Profile Image Upload Error:", error);
      enqueueSnackbar("Failed to update profile image", { variant: "error" });
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <MainContainer>
      {/* USER PROFILE SECTION */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 4,
          pb: 4,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={userAvatar}
            sx={{ width: 80, height: 80, border: "2px solid #fff" }}
          />

          <label htmlFor="profile-image-upload">
            <input
              accept="image/*"
              id="profile-image-upload"
              type="file"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <IconButton
              component="span"
              sx={{
                position: "absolute",
                bottom: 0,
                right: -6,
                bgcolor: "white",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                "&:hover": { bgcolor: "#f5f5f5" },
                padding: "6px",
              }}
              disabled={isUploading}
            >
              {isUploading ? (
                <CircularProgress size={16} sx={{ color: "#2C2416" }} />
              ) : (
                <CameraAlt sx={{ fontSize: 16, color: "#2C2416" }} />
              )}
            </IconButton>
          </label>
        </Box>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            fontWeight: "700",
            color: "#1c1c1c",
            fontSize: "18px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {renderName()}
        </Typography>
      </Box>

      {navigation.map((item, index) => (
        <Fragment key={item.title || index}>
          {item.list.map((listItem, childIndex) => (
            <Fragment key={listItem.title || childIndex}>
              <NavItem item={listItem} />
            </Fragment>
          ))}
        </Fragment>
      ))}
    </MainContainer>
  );
}
