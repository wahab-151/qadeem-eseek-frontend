

// "use client";

// import { useRouter } from "next/navigation";
// import Box from "@mui/material/Box";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import Typography from "@mui/material/Typography";

// // GLOBAL CUSTOM COMPONENTS
// import { NavLink } from "components/nav-link";

// const ACCORDION_STYLES = {
//   "&:not(:last-child)": {
//     borderBottom: 0
//   },
//   "&:before": {
//     display: "none"
//   }
// };

// const ACCORDION_SUMMARY_STYLES = {
//   padding: 0,
//   minHeight: 48,
//   boxShadow: "none",
//   "& .Mui-expanded": {
//     color: "primary.main",
//     margin: 0
//   },
//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     margin: 0,
//     "& .MuiSvgIcon-root": {
//       color: "primary.main"
//     }
//   }
// };

// // MAIN FUNCTION
// export const renderLevels = (data, handleClose, router) => {

//   return data?.map((item, index) => {
//     if (item?.child) {
//       return (
//         <Accordion
//           square
//           key={index}
//           elevation={0}
//           disableGutters
//           sx={ACCORDION_STYLES}
//         >
//           <AccordionSummary expandIcon={<ExpandMore />} sx={ACCORDION_SUMMARY_STYLES}>
//             <Typography variant="h6">{item.title}</Typography>
//           </AccordionSummary>

//           <Box mx={2}>{renderLevels(item.child, handleClose, router)}</Box>
//         </Accordion>
//       );
//     }

//     if (item?.extLink) {
//       if (typeof item.url === "string" && item.url.trim() !== "") {
//         return (
//           <Typography variant="h6" sx={{ py: 1 }} key={index}>
//             <NavLink href={item.url}>{item.title}</NavLink>
//           </Typography>
//         );
//       } else {
//         console.warn("Missing or invalid url for item:", item);
//         return (
//           <Typography variant="h6" sx={{ py: 1 }} key={index}>
//             {item.title}
//           </Typography>
//         );
//       }
//     }

//     // Leaf node (no child, no extLink): navigate and close
//     if (!item.child && item.id) {
//       return (
//         <Box
//           key={index}
//           py={1}
//           sx={{ cursor: "pointer" }}
//           onClick={() => {
//             // Show loader immediately on click
//             if (typeof window !== 'undefined' && window.NProgress) {
//               window.__isNavigatingRef.current = true;
//               window.__startTimeRef.current = Date.now();
//               window.NProgress.start();
//             }
            
//             router.push(`/allProducts?category=${item.id}&view=grid`);
//             handleClose();
//           }}
//         >
//           {item.title}
//         </Box>
//       );
//     }

//     // Fallback: if url exists, render NavLink
//     if (typeof item.url === "string" && item.url.trim() !== "") {
//       return (
//         <Box key={index} py={1}>
//           <NavLink href={item.url} onClick={handleClose}>
//             {item.title}
//           </NavLink>
//         </Box>
//       );
//     } else {
//       console.warn("Missing or invalid url for item:", item);
//       return (
//         <Box key={index} py={1}>
//           {item.title}
//         </Box>
//       );
//     }
//   });
// };

"use client";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { NavLink } from "components/nav-link";
const ACCORDION_STYLES = {
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  }
};
const ACCORDION_SUMMARY_STYLES = {
  padding: 0,
  minHeight: 48,
  boxShadow: "none",
  "& .Mui-expanded": {
    color: "primary.main",
    margin: 0
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    margin: 0,
    "& .MuiSvgIcon-root": {
      color: "primary.main"
    }
  }
};
// MAIN FUNCTION
// router parameter is now actually the guarded push function from useGuardedRouter
export const renderLevels = (data, handleClose, push, parentKey = '') => {
  // Handle undefined/null/empty arrays
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }
  return data.map((item, index) => {
    // Generate a unique key - prefer item.id or item.title, fallback to index
    // Combine with parentKey to ensure uniqueness across nesting levels
    const itemKey = item?.id || item?.title || `item-${index}`;
    const key = parentKey ? `${parentKey}-${itemKey}` : itemKey;
    if (item?.child) {
      return (
        <Accordion
          square
          key={key}
          elevation={0}
          disableGutters
          sx={ACCORDION_STYLES}
        >
          <AccordionSummary expandIcon={<ExpandMore />} sx={ACCORDION_SUMMARY_STYLES}>
            <Typography variant="h6">{item.title}</Typography>
          </AccordionSummary>
          <Box mx={2}>{renderLevels(item.child, handleClose, push, key)}</Box>
        </Accordion>
      );
    }
    if (item?.extLink) {
      if (typeof item.url === "string" && item.url.trim() !== "") {
        return (
          <Typography variant="h6" sx={{ py: 1 }} key={key}>
            <NavLink href={item.url}>{item.title}</NavLink>
          </Typography>
        );
      } else {
        console.warn("Missing or invalid url for item:", item);
        return (
          <Typography variant="h6" sx={{ py: 1 }} key={key}>
            {item.title}
          </Typography>
        );
      }
    }
    // Leaf node (no child, no extLink): navigate and close
    if (!item.child && item.id) {
      return (
        <Box
          key={key}
          py={1}
          sx={{ cursor: "pointer" }}
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Show loader immediately on click
            if (typeof window !== 'undefined' && window.NProgress) {
              window.__isNavigatingRef.current = true;
              window.__startTimeRef.current = Date.now();
              window.NProgress.start();
            }
            
            // Use guarded push to prevent duplicate navigation calls
            const targetRoute = `/allProducts?category=${item.id}&view=grid`;
            await push(targetRoute);
            handleClose();
          }}
        >
          {item.title}
        </Box>
      );
    }
    // Fallback: if url exists, render NavLink
    if (typeof item.url === "string" && item.url.trim() !== "") {
      return (
        <Box key={key} py={1}>
          <NavLink href={item.url} onClick={handleClose}>
            {item.title}
          </NavLink>
        </Box>
      );
    } else {
      console.warn("Missing or invalid url for item:", item);
      return (
        <Box key={key} py={1}>
          {item.title}
        </Box>
      );
    }
  });
};