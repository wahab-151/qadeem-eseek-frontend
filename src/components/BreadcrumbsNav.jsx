

// "use client";

// import Link from "next/link";
// import { Box, Breadcrumbs, Typography } from "@mui/material";
// import { useRouter } from "next/navigation";

// export default function BreadcrumbNav({ breadcrumb,setBreadcrumb }) {
//   const router = useRouter();
  
//   if (!breadcrumb?.length) return null;
//   return (
// <Box sx={{ maxWidth: '1523px', mx: 'auto'  }}  >
//   <Breadcrumbs aria-label="breadcrumb" sx={{
//     //  p: 1, 
//      backgroundColor: '#F3F5F9',
//        pl: {
//       xs: '5vw', // on small screens
//       md: '2vw', // on md and above
//     }, }}  
//          >
    
//     {/* Static Home link */}
//   {/* Static Home link */}
//         <Typography
//           sx={{
//             color: '#1976d2',
//             fontWeight: 500,
//             fontSize: '.75rem',
//             cursor: 'pointer',
//             transition: 'color 0.2s ease',
//             '&:hover': {
//               color: '#0045a5',
//               textDecoration: 'underline',
//             },
//           }}
      
//           onClick={() => {
//             if (typeof setBreadcrumb === 'function') {
//               setBreadcrumb([]);
//             }
//             router.push('/home');
//           }}
//         >
//           home
//         </Typography>

//     {/* Dynamic breadcrumb items */}
//     {breadcrumb?.map((item, index) => {
//       const isLast = index === breadcrumb.length - 1;
//       const hasChild = !!item.child;

//       const href = hasChild
//         ? `/allProducts?category=${item.id}`
//         : `/products/${item.id}`;

//       if (isLast) {
//         return (
//           <Typography
//             key={item.id}
//             color="text.primary"
//             sx={{ fontWeight: 600, fontSize: '.75rem' }}
//           >
//             {item.title}
//           </Typography>
//         );
//       }

//       return (
//         <Link key={item.id} href={href} style={{ textDecoration: 'none' }}>
//           <Typography
//             sx={{
//               color: '#1976d2',
//               fontWeight: 500,
//               fontSize: '.75rem',
//               transition: 'color 0.2s ease',
//               '&:hover': {
//                 color: '#0045a5',
//                 textDecoration: 'underline',
//               },
//             }}
//           >
//             {item.title}
//           </Typography>
//         </Link>
//       );
//     })}
//   </Breadcrumbs>
// </Box>
  
//   );
// }
"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function BreadcrumbNav({ breadcrumb, setBreadcrumb }) {
  const router = useRouter();

  if (!breadcrumb?.length) return null;

  const handleHomeClick = () => {
    if (typeof setBreadcrumb === "function") {
      setBreadcrumb([]);
    }
    try {
      if (typeof window !== 'undefined' && window.NProgress) {
        window.__navTriggerType = 'breadcrumb';
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
    } catch {}
    try { router.prefetch("/home"); } catch (_) {}
    router.push("/home");
  };
  
  const handleBreadcrumbClick = (href) => {
    try {
      if (typeof window !== 'undefined' && window.NProgress) {
        window.__navTriggerType = 'breadcrumb';
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
    } catch {}
    try { router.prefetch(href); } catch (_) {}
  };

  return (
    <Box sx={{ 
      maxWidth: "1523px", 
      mx: "auto", 
      py: 1,
      backgroundColor: "#FFFFFF",
    }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          pl: { xs: "5vw", md: "2vw" },
          py: 1,
        }}
      >
        <Typography
          sx={{
            color: "#8B7548",
            fontWeight: 500,
            fontSize: ".875rem",
            cursor: "pointer",
            transition: "color 0.2s ease",
            "&:hover": {
              color: "#6B5D4F",
              textDecoration: "underline",
            },
          }}
          onClick={handleHomeClick}
        >
          Home
        </Typography>

        {breadcrumb?.map((item, index) => {
          const isLast = index === breadcrumb.length - 1;
          const hasChild = !!item.child;
          // Use slug for SEO-friendly product URLs, fallback to id
          const href = hasChild
            ? `/allProducts?category=${item.id}`
            : `/products/${item.slug || item.id}`;

          if (isLast) {
            return (
              <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  component="span"
                  sx={{ 
                    color: "#8B7548", 
                    fontSize: "1rem",
                  }}
                >
                  |
                </Typography>
                <Typography
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: ".875rem",
                    color: "#271E03",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            );
          }

          return (
            <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ChevronRightIcon sx={{ color: "#8B7548", fontSize: "1rem" }} />
              <Link
                href={href}
                style={{ textDecoration: "none" }}
                onClick={() => handleBreadcrumbClick(href)}
                onMouseEnter={() => { try { router.prefetch(href); } catch (_) {} }}
              >
                <Typography
                  sx={{
                    color: "#8B7548",
                    fontWeight: 500,
                    fontSize: ".875rem",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#6B5D4F",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {item.title}
                </Typography>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
