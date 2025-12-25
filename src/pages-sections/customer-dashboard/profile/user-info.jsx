

// "use client";
// import { format } from "date-fns";
// import Card from "@mui/material/Card";
// import Typography from "@mui/material/Typography";
// // GLOBAL CUSTOM COMPONENTS
// import FlexBox from "components/flex-box/flex-box";
// import useUser from "hooks/useUser";
// import { notFound } from "next/navigation";
// import {
//   useGetProfileQuery,
// } from "app/store/services";
// import {
//   Box,
//   CircularProgress,
//   Modal,
//   IconButton,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import CloseIcon from "@mui/icons-material/Close";
// import DownloadIcon from "@mui/icons-material/Download";
// import Image from "next/image";
// // ==============================================================
// export default function UserInfo() {
//   const { state } = useUser();
//   const [open, setOpen] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const methods = useForm({ defaultValues: { files: [] } });
//   const { data: userProfile, isLoading, refetch } = useGetProfileQuery();
//   const imageExtensions = [
//     ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg",
//   ];
//   const isImageFile = (url) => {
//     if (!url || typeof url !== "string") return false;
//     const lowerUrl = url.toLowerCase();
//     return imageExtensions.some((ext) => lowerUrl.endsWith(ext));
//   };
//   useEffect(() => {
//     refetch();
//   }, [refetch]);
//   useEffect(() => {
//     if (userProfile?.data?.user) {
//       const user = userProfile.data.user;
//       // store only strings (urls)
//       setFiles(user.file || []);
//       methods.setValue("files", user.file || []);
//     }
//   }, [userProfile, methods]);
//   const nextFile = () =>
//     setCurrentIndex((prev) => (prev + 1) % (files?.length || 1));
//   const prevFile = () =>
//     setCurrentIndex((prev) => (prev - 1 + (files?.length || 1)) % (files?.length || 1));
//   const handleOpen = (idx) => {
//     setCurrentIndex(idx);
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);
//   // Prevent event propagation for buttons inside modal
//   const handleButtonClick = (e, callback) => {
//     e.stopPropagation();
//     callback();
//   };
//   const displayUser = userProfile?.data?.user || state?.user;
//   return (
//     <>
//       <form>
//         {isLoading ? (
//           <CircularProgress size={24} />
//         ) : displayUser ? (
//           <Card sx={{ mt: 3, p: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
//             <>
//               {/* User Info Fields */}
//               <TableRowItem title="First Name" value={displayUser?.firstName} />
//               <TableRowItem title="Last Name" value={displayUser?.lastName} />
//               <TableRowItem title="Email" value={displayUser?.email} />
//               <TableRowItem title="Phone" value={displayUser?.phone} />
//               <TableRowItem
//                 title="Address"
//                 value={
//                   <>
//                     {displayUser?.addressLine1}, <br />
//                     {displayUser?.addressLine2}, <br />
//                     {displayUser?.city}, {displayUser?.state}
//                   </>
//                 }
//               />
//               <TableRowItem
//                 title="Member Since"
//                 value={displayUser?.createdAt ? format(new Date(displayUser.createdAt), "dd MMM, yyyy") : ""}
//               />
//             </>
//             {/* Upload Section */}
//             <FlexBox flexDirection="column" p={1} width="100%">
//               <Typography variant="body1" color="grey.600" mb={1}>
//                 Documents Uploaded
//               </Typography>
//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="subtitle2">Business License</Typography>
//                 {Array.isArray(files) && files.length > 0 ? (
//                   <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//                     {files.map((fileUrl, idx) => (
//                       <Box
//                         key={idx}
//                         onClick={() => handleOpen(idx)}
//                         sx={{
//                           width: 100,
//                           height: 100,
//                           position: "relative",
//                           borderRadius: 1,
//                           overflow: "hidden",
//                           border: "1px solid #ccc",
//                           cursor: "pointer",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           backgroundColor: "#F5F5F5",
//                         }}
//                       >
//                         {isImageFile(fileUrl) ? (
//                           <Image
//                             src={fileUrl}
//                             alt={`File ${idx + 1}`}
//                             fill
//                             style={{ objectFit: "cover" }}
//                           />
//                         ) : (
//                           <>
//                             <PictureAsPdfIcon sx={{ fontSize: 48, color: "red" }} />
//                             <Typography
//                               variant="caption"
//                               sx={{
//                                 position: "absolute",
//                                 bottom: 4,
//                                 background: "rgba(0,0,0,0.5)",
//                                 color: "white",
//                                 px: 1,
//                                 borderRadius: 1,
//                               }}
//                             >
//                               PDF
//                             </Typography>
//                           </>
//                         )}
//                       </Box>
//                     ))}
//                   </Box>
//                 ) : (
//                   <Typography variant="body2" color="text.secondary">
//                     No files uploaded
//                   </Typography>
//                 )}
//               </Box>
//             </FlexBox>
//           </Card>
//         ) : (
//           <CircularProgress size={24} />
//         )}
//         {/* MODAL */}
//         <Modal open={open} onClose={handleClose}>
//           <Box
//             onClick={handleClose} // Close modal when clicking on the backdrop
//             sx={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "100vw",
//               height: "100vh",
//               bgcolor: "rgba(0,0,0,0.9)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               zIndex: 9999,
//             }}
//           >
//             {/* Close Button */}
//             <IconButton
//               onClick={(e) => handleButtonClick(e, handleClose)}
//               sx={{ position: "absolute", top: 20, right: 20, color: "#fff", zIndex: 10000 }}
//             >
//               <CloseIcon />
//             </IconButton>
//             {/* Prev Button */}
//             <IconButton
//               onClick={(e) => handleButtonClick(e, prevFile)}
//               sx={{ position: "absolute", left: 30, color: "#fff", zIndex: 10000 }}
//             >
//               <ArrowBackIosNewIcon fontSize="large" />
//             </IconButton>
//             {/* File Display */}
//             <Box
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on content
//               sx={{
//                 maxWidth: "90%",
//                 maxHeight: "90%",
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 position: "relative",
//               }}
//             >
//               {isImageFile(files[currentIndex]) ? (
//                 <Image
//                   src={files[currentIndex]}
//                   alt={`Preview ${currentIndex + 1}`}
//                   fill
//                   style={{ objectFit: "contain" }}
//                 />
//               ) : (
//                 <Box sx={{ width: "100%", height: "100%", bgcolor: "white" }}>
//                   <iframe
//                     src={files[currentIndex]}
//                     width="100%"
//                     height="100%"
//                     style={{ border: "none" }}
//                   />
//                 </Box>
//               )}
//             </Box>
//             {/* Next Button */}
//             <IconButton
//               onClick={(e) => handleButtonClick(e, nextFile)}
//               sx={{ position: "absolute", right: 30, color: "#fff", zIndex: 10000 }}
//             >
//               <ArrowForwardIosIcon fontSize="large" />
//             </IconButton>
//           </Box>
//         </Modal>
//       </form>
//     </>
//   );
// }
// function TableRowItem({ title, value }) {
//   return (
//     <FlexBox flexDirection="column" p={1}>
//       <Typography variant="body1" sx={{ color: "grey.600", mb: 0.5 }}>
//         {title}
//       </Typography>
//       <span>{value}</span>
//     </FlexBox>
//   );
// }


"use client";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import useUser from "hooks/useUser";
import { notFound } from "next/navigation";
import {
  useGetProfileQuery,
} from "app/store/services";
import {
  Box,
  CircularProgress,
  Modal,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import Image from "next/image";
import { navigateToLogin } from "utils/helpers";
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
  
  const { data: userProfile, isLoading, error } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated, // Skip query if not authenticated
  });
  
  const imageExtensions = [
    ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg",
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
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/profile';
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
    setCurrentIndex((prev) => (prev - 1 + (files?.length || 1)) % (files?.length || 1));
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
  const displayUser = userProfile?.data?.user || state?.user;
  
  // Don't render if not authenticated (redirect will happen)
  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <>
      <form>
        {isLoading ? (
          <Box sx={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : displayUser ? (
          <Card sx={{ mt: 3, p: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
            <>
              {/* User Info Fields */}
              <TableRowItem title="First Name" value={displayUser?.firstName} />
              <TableRowItem title="Last Name" value={displayUser?.lastName} />
              <TableRowItem title="Email" value={displayUser?.email} />
              <TableRowItem title="Phone" value={displayUser?.phone} />
              <TableRowItem
                title="Address"
                value={
                  <>
                    {displayUser?.addressLine1}, <br />
                    {displayUser?.addressLine2}, <br />
                    {displayUser?.city}, {displayUser?.state}
                  </>
                }
              />
              <TableRowItem
                title="Member Since"
                value={displayUser?.createdAt ? format(new Date(displayUser.createdAt), "dd MMM, yyyy") : ""}
              />
            </>
            {/* Upload Section */}
            <FlexBox flexDirection="column" p={1} width="100%">
              <Typography variant="body1" color="grey.600" mb={1}>
                Documents Uploaded
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Business License</Typography>
                {Array.isArray(files) && files.length > 0 ? (
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {files.map((fileUrl, idx) => (
                      <Box
                        key={idx}
                        onClick={() => handleOpen(idx)}
                        sx={{
                          width: 100,
                          height: 100,
                          position: "relative",
                          borderRadius: 1,
                          overflow: "hidden",
                          border: "1px solid #ccc",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#F5F5F5",
                        }}
                      >
                        {isImageFile(fileUrl) ? (
                          <Image
                            src={fileUrl}
                            alt={`File ${idx + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <>
                            <PictureAsPdfIcon sx={{ fontSize: 48, color: "red" }} />
                            <Typography
                              variant="caption"
                              sx={{
                                position: "absolute",
                                bottom: 4,
                                background: "rgba(0,0,0,0.5)",
                                color: "white",
                                px: 1,
                                borderRadius: 1,
                              }}
                            >
                              PDF
                            </Typography>
                          </>
                        )}
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No files uploaded
                  </Typography>
                )}
              </Box>
            </FlexBox>
          </Card>
        ) : (
          <Box sx={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
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
              sx={{ position: "absolute", top: 20, right: 20, color: "#fff", zIndex: 10000 }}
            >
              <CloseIcon />
            </IconButton>
            {/* Prev Button */}
            <IconButton
              onClick={(e) => handleButtonClick(e, prevFile)}
              sx={{ position: "absolute", left: 30, color: "#fff", zIndex: 10000 }}
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
              sx={{ position: "absolute", right: 30, color: "#fff", zIndex: 10000 }}
            >
              <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
          </Box>
        </Modal>
      </form>
    </>
  );
}
function TableRowItem({ title, value }) {
  return (
    <FlexBox flexDirection="column" p={1}>
      <Typography variant="body1" sx={{ color: "grey.600", mb: 0.5 }}>
        {title}
      </Typography>
      <span>{value}</span>
    </FlexBox>
  );
}