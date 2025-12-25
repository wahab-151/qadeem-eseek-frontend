"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
// MUI
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// GLOBAL CUSTOM COMPONENT
import OverlayScrollbar from "components/overlay-scrollbar";
// ICON COMPONENTS
import Icons from "icons/duotone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// STYLED COMPONENTS
import {
  Wrapper,
  StyledCard,
  CategoryList,
  MenusContainer,
  SubCategoryList,
  CategoryListItem,
  SubCategoryListItem,
} from "./styles";
import SearchInput from "components/SearchInput";
import useGuardedRouter, { wouldBlockNavigation } from "hooks/useGuardedRouter";
import { useRouter } from "next/navigation";

import dayjs from "dayjs";
import { Chip } from "@mui/material";
import performanceMonitor from "utils/performanceMonitor";

export default function CategoryBasedMenu({
  title,
  menuList: categories,
  nav,
}) {
  const { push } = useGuardedRouter();
  const [selected, setSelected] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [closeTimeout, setCloseTimeout] = useState(null);
  // Component-level guard to prevent multiple clicks on same element
  const navigatingRef = useRef(false);
  const lastNavigatedRouteRef = useRef(null);
  // const categories = menuList?.map((item) => item.title);
  const selectedCategory = categories?.find((item) => item.title === selected);
  // console.log("categories", categories)
  
  /**
   * MENU BEHAVIOR: Click to Open + Smart Hover/Scroll Handling
   * 
   * The menu uses an intelligent approach for optimal user experience:
   * - Click the menu title to open/close the menu
   * - Click outside the menu to close it automatically
   * - Menu stays open when user scrolls within popup content
   * - Menu stays open when user hovers over popup content
   * - Menu closes only when user moves away from entire menu area
   * - Menu remains open when navigating to menu details
   * - Prevents accidental closing during user interaction with popup
   */
  
  // Handle click outside to close menu automatically
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the menu wrapper
      if (isMenuOpen && !event.target.closest('.menu-wrapper')) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle scroll events to keep menu open when user scrolls within popup
  useEffect(() => {
    const handleScroll = (event) => {
      // Check if scroll is happening within the menu popup or its children
      if (isMenuOpen && event.target && typeof event.target.closest === 'function' && (
        event.target.closest('.menu-list') || 
        event.target.closest('.menu-wrapper') ||
        event.target.closest('[class*="OverlayScrollbar"]') // MUI scrollbar component
      )) {
        // Don't close menu when scrolling within popup content
        return;
      }
    };

    // Add scroll event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener('scroll', handleScroll, true);
      window.addEventListener('scroll', handleScroll, true);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isMenuOpen]);

  // Handle hover out to close menu when user leaves entire menu area
  const handleMouseLeave = () => {
    // Only close on hover out if menu is currently open
    if (isMenuOpen) {
      // Add a small delay to prevent accidental closing
      const timeout = setTimeout(() => {
        setIsMenuOpen(false);
      }, 150); // 150ms delay
      setCloseTimeout(timeout);
    }
  };

  // Handle mouse enter on popup content to keep menu open
  const handlePopupMouseEnter = () => {
    // Clear any pending close timeout when hovering over popup
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  // Handle mouse enter on main wrapper to clear close timeout
  const handleMouseEnter = () => {
    // Clear any pending close timeout when hovering over menu
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  useEffect(() => {
    if (categories[0]?.title) {
      setSelected(categories[0]?.title);
      setBreadcrumbs([
        { title: "Home", url: "/" },
        { title: categories[0]?.title, url: "#" },
      ]);
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  const handleCategorySelect = (name) => {
    setSelected(name);
    setBreadcrumbs([
      { title: "Home", url: "/" },
      { title: name, url: "#" },
    ]);
  };

  // Handle menu toggle on click instead of hover
  // This replaces the previous onMouseEnter/onMouseLeave behavior
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // console.log("nav categories",categories);
  return (
    <Wrapper
      className="menu-wrapper"
      onClick={handleMenuToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          // px: 1,
          whiteSpace: "nowrap",
          minWidth: "max-content",
          paddingX: "20px",
          flexShrink: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer", // Indicate that the menu title is clickable
        }}
        className="menu-title"
      >
        {title}
      </Box>

      <MenusContainer
        style={{ display: isMenuOpen ? "block" : "none" }}
        className="menu-list"
        onClick={(e) => e.stopPropagation()} // Prevent menu from closing when clicking inside
        onMouseEnter={handlePopupMouseEnter} // Keep menu open when hovering over popup
      >
        {/* Prefetch category routes on hover to speed up nav */}
        {isMenuOpen && (
          <PrefetchCategories categories={categories} />
        )}
        <StyledCard>
          <CategoryList>
            {categories?.map((item, index) => (
              <CategoryListItem
                key={item?.id || item?.item || index}
                active={selected === item?.title}
                onMouseEnter={() => {
                  handleCategorySelect(item?.title);
                  // console.log("Hovered Item:", item);
                }}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "forwards",
                }}
                onClick={async (e) => {
                  e.stopPropagation(); // Prevent menu toggle when clicking category item
                  e.preventDefault(); // Prevent any default behavior
                  
                  const targetRoute = `/allProducts?category=${item?.id}&view=grid`;
                  
                  // EARLY CHECK: Use global route guard state BEFORE component-level checks
                  const guardCheck = wouldBlockNavigation(targetRoute);
                  if (guardCheck.blocked) {
                    console.log('[CategoryMenu] Blocked by route guard:', targetRoute, guardCheck);
                    return;
                  }
                  
                  // Component-level duplicate prevention (backup)
                  if (navigatingRef.current || lastNavigatedRouteRef.current === targetRoute) {
                    console.log('[CategoryMenu] Blocked duplicate click:', targetRoute);
                    return;
                  }
                  
                  navigatingRef.current = true;
                  lastNavigatedRouteRef.current = targetRoute;
                  
                  // Start performance tracking
                  const perfId = performanceMonitor.start('category-click', 'category-navigation', {
                    categoryId: item?.id,
                    categoryTitle: item?.title,
                    trigger: 'navbar-category-menu',
                  });
                  
                  // Mark loader start
                  const loaderStartTime = performance.now();
                  if (typeof window !== 'undefined' && window.NProgress) {
                    window.__navTriggerType = 'navbar-category';
                    window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
                    window.__startTimeRef && (window.__startTimeRef.current = Date.now());
                    window.NProgress.start();
                  }
                  performanceMonitor.markMilestone(perfId, 'loader-shown', {
                    loaderStartTime: performance.now() - loaderStartTime,
                  });
                  
                  try {
                    // Navigate - route guard handles duplicate prevention efficiently
                    const navStartTime = performance.now();
                    await push(targetRoute);
                    performanceMonitor.markMilestone(perfId, 'navigation-complete', {
                      navigationTime: performance.now() - navStartTime,
                      targetUrl: targetRoute,
                    });
                    
                    setIsMenuOpen(false);
                  } catch (error) {
                    console.error('[CategoryMenu] Navigation error:', error);
                  } finally {
                    // Reset after navigation completes or fails
                    setTimeout(() => {
                      navigatingRef.current = false;
                      lastNavigatedRouteRef.current = null;
                    }, 2000);
                  }
                  
                  // Note: Product display milestone will be marked in product-search.jsx
                }}
              >
                {/* level 2 title */}
                <span>{item?.title}</span> 
                <ArrowForwardIcon fontSize="small" className="icon" />
              </CategoryListItem>
            ))}
          </CategoryList>
          <SubChildList
            subChildren={selectedCategory}
            onBreadcrumbUpdate={(newBreadcrumbs) =>
              setBreadcrumbs([...breadcrumbs, newBreadcrumbs])
            }
            closeMenu={() => setIsMenuOpen(false)}
            title={title}
          />
        </StyledCard>
      </MenusContainer>
    </Wrapper>
  );
}

// function SubChildList({ subChildren, onBreadcrumbUpdate, closeMenu }) {
//   const router = useRouter();
//   // console.log("subchild",subChildren)
//   return (
//     <OverlayScrollbar sx={{ width: "100%" }}>
//       <Box px={6}
//       py={2}
//       height="100%">
//         {/* <SearchInput border={true} /> */}
//         <Box display="flex" flexWrap="wrap" gap={1}>
//           {subChildren?.child?.map((item, idx) => (
//             <Box key={idx} sx={{ width: "22%" }}>
//               {item.level === undefined ? (
//                 <Link href={item.url}>
//                   <Typography
//                     sx={{
//                       px: 1,
//                       // border:'1px solid green',
//                       fontWeight: "normal",
//                       backgroundColor: "transparent",
//                       borderRadius: 10,
//                       mt: 1,
//                       // mt: 2,
//                       whiteSpace: "normal", // ✅ allow wrapping
//                       wordBreak: "break-word",
//                       transition: "all 0.2s ease",
//                       "&:hover": {
//                         // borderRadius: 10,
//                         // p: 1,
//                         fontWeight: "bold",
//                         // backgroundColor: "#F3F5F9",
//                         transform: "scale(1.05)",
//                         color: "primary.main",
//                       },
//                     }}
//                     onClick={() => {
//                       closeMenu();
//                       console.log(item.name, "clicked product");
//                     }}
//                   >
//                     {item.title}
//                   </Typography>
//                 </Link>
//               ) : (
//                 <Typography
//                   sx={{
//                     p: 1,
//                     fontWeight: "bold",
//                     backgroundColor: "grey.100",
//                     borderRadius: 10,
//                     m: 1,
//                     whiteSpace: "normal", // ✅ allow wrapping
//                     wordBreak: "break-word", // ✅ prevent overflow
//                     transition: "all 0.2s ease",
//                     "&:hover": {
//                       transform: "scale(1.05)",
//                       color: "white",
//                       backgroundColor: "secondary.main",
//                     },
//                   }}
//                   onClick={() => {
//                     router.push(`/allProducts?category=${item.id}&view=grid`);
//                     closeMenu();
//                     console.log(item.name, "clicked else");
//                   }}
//                 >
//                   {item.title}
//                 </Typography>
//               )}
//               <SubCategoryList //level 4 products
//                 sx={{ display: "flex", flexDirection: "column" }}
//               >
//                 {item.child?.map((subItem, key) => (
//                   <SubChildItem
//                     item={subItem}
//                     key={key}
//                     level={3}
//                     onBreadcrumbUpdate={onBreadcrumbUpdate}
//                     closeMenu={closeMenu}
//                   />
//                 ))}
//               </SubCategoryList>
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </OverlayScrollbar>
//   );
// }
function SubChildList({ subChildren, onBreadcrumbUpdate, closeMenu, title }) {
  const { push } = useGuardedRouter();
  // Component-level guard to prevent multiple clicks
  const navigatingRef = useRef(false);
  const lastNavigatedRouteRef = useRef(null);

  return (
    <OverlayScrollbar sx={{ width: "100%" }}>
      <Box px={6} py={2} height="100%">
        {/* <SearchInput border={true} /> */}
        <Box display="flex" flexWrap="wrap" gap={1}>
          {subChildren?.child?.map((item, idx) => {
            // console.log("item mapped", item)
            const isNew =
              item?.createdAt &&
              dayjs().diff(dayjs(item.createdAt), "day") <= 14;
            return (
              <Box key={idx} sx={{ width: "22%" }}>
                {title === "Accessories" ||
                title === "Tools" ||
                title === "Refurbishing" ? (
                  // :white_check_mark: Flex container for all Apple Cases
                  <Box
                    sx={{
                      // border:"2px solid red",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2, // spacing between circles
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    {/* {subChildren?.child?.map((item, idx) => ( */}
                      <Box
                        key={idx}
                        sx={{
                          width: 100,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          cursor: "pointer",
                          "&:hover": {
                            transform: "scale(1.05)",
                            transition: "0.3s",
                          },
                        }}
                      >
                        {/* Image inside circle */}
                        <Box
                          sx={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            border: "1px solid #ddd",
                            // border:"2px solid red",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            backgroundColor: "#fff",
                          }}
                          onClick={async (e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            e.preventDefault(); // Prevent default behavior
                            
                            const targetRoute = `/allProducts?category=${item.id}&view=grid`;
                            
                            // EARLY CHECK: Use global route guard state BEFORE component-level checks
                            const guardCheck = wouldBlockNavigation(targetRoute);
                            if (guardCheck.blocked) {
                              console.log('[SubChildList] Blocked by route guard:', targetRoute, guardCheck);
                              return;
                            }
                            
                            // Component-level duplicate prevention (backup)
                            if (navigatingRef.current || lastNavigatedRouteRef.current === targetRoute) {
                              console.log('[SubChildList] Blocked duplicate click:', targetRoute);
                              return;
                            }
                            
                            navigatingRef.current = true;
                            lastNavigatedRouteRef.current = targetRoute;
                            
                            // Start performance tracking
                            const perfId = performanceMonitor.start('category-click', 'category-navigation', {
                              categoryId: item.id,
                              categoryTitle: item.title,
                              trigger: 'navbar-category-circle',
                            });
                            
                            // Mark loader start
                            const loaderStartTime = performance.now();
                            if (typeof window !== 'undefined' && window.NProgress) {
                              window.__navTriggerType = 'navbar-category';
                              window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
                              window.__startTimeRef && (window.__startTimeRef.current = Date.now());
                              window.NProgress.start();
                            }
                            performanceMonitor.markMilestone(perfId, 'loader-shown', {
                              loaderStartTime: performance.now() - loaderStartTime,
                            });
                            
                            try {
                              // Navigate - route guard handles duplicate prevention efficiently
                              const navStartTime = performance.now();
                              await push(targetRoute);
                              performanceMonitor.markMilestone(perfId, 'navigation-complete', {
                                navigationTime: performance.now() - navStartTime,
                                targetUrl: targetRoute,
                              });
                              
                              closeMenu();
                            } catch (error) {
                              console.error('[SubChildList] Navigation error:', error);
                            } finally {
                              // Reset after navigation completes or fails
                              setTimeout(() => {
                                navigatingRef.current = false;
                                lastNavigatedRouteRef.current = null;
                              }, 2000);
                            }
                            
                            // Note: Product display milestone will be marked in product-search.jsx
                          }}
                        >
                          <img
                            src={item?.icon || "/assets/images/logo.jpeg"}
                            alt={item.title || "Product"}
                            style={{
                              width: "60%",
                              height: "auto",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                        {/* Title */}
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            textAlign: "center",
                            fontWeight: 500,
                            width: "100%",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "14px",
                          }}
                        >
                          {item.title}
                        </Typography>
                          {isNew && (
                        <Chip
                          label="NEW"
                          color="error"
                          size="small"
                          sx={{
                            fontSize: "0.65rem",
                            height: 16,
                            borderRadius: "8px",
                            animation: "fadeInSlide 0.5s ease-out",
                            "@keyframes fadeInSlide": {
                              from: {
                                opacity: 0,
                                transform: "translateY(-5px)",
                              },
                              to: { opacity: 1, transform: "translateY(0)" },
                            },
                          }}
                        />
                      )}
                      </Box>
                    {/* ))} */}
              
                  </Box>
                ) : item.level === undefined ? ( // level 2 sub products
                  // Regular product items - Use Box instead of Link to prevent duplicate navigation
                  // Link component triggers Next.js navigation, causing duplicate calls with onClick
                  <Box 
                    display="flex" 
                    alignItems="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={async (e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      e.preventDefault(); // Prevent default behavior
                      
                      const targetRoute = `/allProducts?category=${item.id}&view=grid`;
                      
                      // EARLY CHECK: Use global route guard state BEFORE component-level checks
                      const guardCheck = wouldBlockNavigation(targetRoute);
                      if (guardCheck.blocked) {
                        console.log('[SubChildList] Blocked by route guard:', targetRoute, guardCheck);
                        return;
                      }
                      
                      // Component-level duplicate prevention (backup)
                      if (navigatingRef.current || lastNavigatedRouteRef.current === targetRoute) {
                        console.log('[SubChildList] Blocked duplicate click:', targetRoute);
                        return;
                      }
                      
                      navigatingRef.current = true;
                      lastNavigatedRouteRef.current = targetRoute;
                      
                      // Start performance tracking
                      const perfId = performanceMonitor.start('category-click', 'category-navigation', {
                        categoryId: item.id,
                        categoryTitle: item.title,
                        trigger: 'navbar-category-item',
                      });
                      
                      // Mark loader start
                      const loaderStartTime = performance.now();
                      if (typeof window !== 'undefined' && window.NProgress) {
                        window.__navTriggerType = 'navbar-category';
                        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
                        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
                        window.NProgress.start();
                      }
                      performanceMonitor.markMilestone(perfId, 'loader-shown', {
                        loaderStartTime: performance.now() - loaderStartTime,
                      });
                      
                      try {
                        // Navigate - route guard handles duplicate prevention efficiently
                        const navStartTime = performance.now();
                        await push(targetRoute);
                        performanceMonitor.markMilestone(perfId, 'navigation-complete', {
                          navigationTime: performance.now() - navStartTime,
                          targetUrl: targetRoute,
                        });
                        
                        closeMenu();
                      } catch (error) {
                        console.error('[SubChildList] Navigation error:', error);
                      } finally {
                        // Reset after navigation completes or fails
                        setTimeout(() => {
                          navigatingRef.current = false;
                          lastNavigatedRouteRef.current = null;
                        }, 2000);
                      }
                      
                      // Note: Product display milestone will be marked in product-search.jsx
                    }}
                  >
                    <Typography
                      sx={{
                        px: 1,
                        fontWeight: "normal",
                        backgroundColor: "transparent",
                        borderRadius: 10,
                        mt: 1,
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        transition: "all 0.2s ease",
                        fontSize: "14px",
                        "&:hover": {
                          fontWeight: "bold",
                          transform: "scale(1.05)",
                          color: "primary.main",
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                    {isNew && (
                      <Chip
                        label="NEW"
                        color="error"
                        size="small"
                        sx={{
                          fontSize: "0.65rem",
                          height: 16,
                          borderRadius: "8px",
                          animation: "fadeInSlide 0.5s ease-out",
                          "@keyframes fadeInSlide": {
                            from: {
                              opacity: 0,
                              transform: "translateY(-5px)",
                            },
                            to: { opacity: 1, transform: "translateY(0)" },
                          },
                        }}
                      />
                    )}
                  </Box>
                ) : (
                  // Category items
                  <Typography
                    sx={{
                      p: 1,
                      fontWeight: "bold",
                      backgroundColor: "grey.100",
                      borderRadius: 10,
                      m: 1,
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        color: "white",
                        backgroundColor: "secondary.main",
                      },
                    }}
                    onClick={async (e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      e.preventDefault(); // Prevent default behavior
                      
                      const targetRoute = `/allProducts?category=${item.id}&view=grid`;
                      
                      // EARLY CHECK: Use global route guard state BEFORE component-level checks
                      const guardCheck = wouldBlockNavigation(targetRoute);
                      if (guardCheck.blocked) {
                        console.log('[SubChildList] Blocked by route guard:', targetRoute, guardCheck);
                        return;
                      }
                      
                      // Component-level duplicate prevention (backup)
                      if (navigatingRef.current || lastNavigatedRouteRef.current === targetRoute) {
                        console.log('[SubChildList] Blocked duplicate click:', targetRoute);
                        return;
                      }
                      
                      navigatingRef.current = true;
                      lastNavigatedRouteRef.current = targetRoute;
                      
                      // Start performance tracking
                      const perfId = performanceMonitor.start('category-click', 'category-navigation', {
                        categoryId: item.id,
                        categoryTitle: item.title,
                        trigger: 'navbar-category-typography',
                      });
                      
                      // Mark loader start
                      const loaderStartTime = performance.now();
                      if (typeof window !== 'undefined' && window.NProgress) {
                        window.__navTriggerType = 'navbar-category';
                        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
                        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
                        window.NProgress.start();
                      }
                      performanceMonitor.markMilestone(perfId, 'loader-shown', {
                        loaderStartTime: performance.now() - loaderStartTime,
                      });
                      
                      try {
                        // Close menu and navigate - route guard handles duplicate prevention efficiently
                        closeMenu();
                        const navStartTime = performance.now();
                        await push(targetRoute);
                        performanceMonitor.markMilestone(perfId, 'navigation-complete', {
                          navigationTime: performance.now() - navStartTime,
                          targetUrl: targetRoute,
                        });
                      } catch (error) {
                        console.error('[SubChildList] Navigation error:', error);
                      } finally {
                        // Reset after navigation completes or fails
                        setTimeout(() => {
                          navigatingRef.current = false;
                          lastNavigatedRouteRef.current = null;
                        }, 2000);
                      }
                      
                      // Note: Product display milestone will be marked in product-search.jsx
                    }}
                  >
                    {item.title}
                  </Typography>
                )}
                <SubCategoryList //level 4 products
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {item.child?.map((subItem, subIndex) => (
                    <SubChildItem
                      item={subItem}
                      key={subItem?.id || subItem?.item || subIndex}
                      level={3}
                      onBreadcrumbUpdate={onBreadcrumbUpdate}
                      closeMenu={closeMenu}
                    />
                  ))}
                </SubCategoryList>
              </Box>
            );
          })}
        </Box>
      </Box>
    </OverlayScrollbar>
  );
}

// product under cat 3 level
function SubChildItem({ item, level, onBreadcrumbUpdate, closeMenu }) {
  const { title, url = "#", icon, child, level: itemLevel } = item;
  const { push } = useGuardedRouter();
  const IconComponent = icon && Icons[icon] ? Icons[icon] : null;
  // console.log("item hereee",item)
  const isNew =
    item?.createdAt && dayjs().diff(dayjs(item.createdAt), "day") <= 14;
  // Component-level guard to prevent multiple clicks
  const navigatingRef = useRef(false);
  const lastNavigatedRouteRef = useRef(null);

  const handleItemClick = () => {
    if (child?.length > 0) {
      onBreadcrumbUpdate({ title, url });
    }
  };

  return (
    <div>
      {/* <Link href={url}   onClick={handleItemClick}> */}

      <SubCategoryListItem onClick={handleItemClick}>
        {/* <Box display="flex" alignItems="center" >
                   
         <Typography
            sx={{
              width: "100%",
              marginTop: 1,
              display: "block",
              // border:"1px solid red",
              borderRadius: level === 3 && child?.length > 0 ? "20px" : 0,
              px: level === 3 && child?.length > 0 ? 3 : 0,
              py: level === 3 && child?.length > 0 ? 0.5 : 0,
              fontSize: level === 3 ? "16px" : "13px",
              fontWeight: level === 3 && child?.length > 0 ? 600 : 400,
              backgroundColor:
                level === 3 && child?.length > 0 ? "grey.100" : "transparent",
              color: "text.primary",
              pointerEvents: level === 3 && child?.length > 0 ? "none" : "auto",
              cursor: level === 3 && child?.length > 0 ? "default" : "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
              whiteSpace: "normal",
              wordBreak: "break-word",
              "&:hover":
                level === 3 && child?.length > 0
                  ? {}
                  : {
                      // borderRadius: 10,
                      // p: 1,
                      fontWeight: "bold",
                      // backgroundColor: "#F3F5F9",
                      transform: "scale(1.05)",
                      color: "primary.main",
                    },
            }}
            onClick={() => {
              closeMenu();
              console.log(item.name, "clicked SubCategoryListItem");
            }}
          >
            {title} vvvvv
          </Typography>  
          {isNew && (
                      <Chip
                        label="NEW"
                        color="error"
                        size="small"
                        sx={{
                         fontSize: "0.65rem",
                          height: 16,
                          // width: 50,/
                          // px: 0.5,
                            borderRadius: "8px",
                        }}
                      />
                    )}
          </Box> */}
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Typography
            sx={{
              borderRadius: level === 3 && child?.length > 0 ? "20px" : 0,
              px: level === 3 && child?.length > 0 ? 3 : 0,
              py: level === 3 && child?.length > 0 ? 0.5 : 0,
              fontSize: level === 3 ? "14px" : "13px",
              fontWeight: level === 3 && child?.length > 0 ? 600 : 400,
              backgroundColor:
                level === 3 && child?.length > 0 ? "grey.100" : "transparent",
              color: "text.primary",
              pointerEvents: level === 3 && child?.length > 0 ? "none" : "auto",
              cursor: level === 3 && child?.length > 0 ? "default" : "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
              whiteSpace: "normal",
              wordBreak: "break-word",
              "&:hover":
                level === 3 && child?.length > 0
                  ? {}
                  : {
                      fontWeight: "bold",
                      transform: "scale(1.05)",
                      color: "primary.main",
                    },
            }}
            onClick={async (e) => {
              e.stopPropagation(); // Prevent event bubbling
              e.preventDefault(); // Prevent default behavior
              
              const targetRoute = `/allProducts?category=${item.id}&view=grid`;
              
              // EARLY CHECK: Use global route guard state BEFORE component-level checks
              const guardCheck = wouldBlockNavigation(targetRoute);
              if (guardCheck.blocked) {
                console.log('[SubChildItem] Blocked by route guard:', targetRoute, guardCheck);
                return;
              }
              
              // Component-level duplicate prevention (backup)
              if (navigatingRef.current || lastNavigatedRouteRef.current === targetRoute) {
                console.log('[SubChildItem] Blocked duplicate click:', targetRoute);
                return;
              }
              
              navigatingRef.current = true;
              lastNavigatedRouteRef.current = targetRoute;
              
              // Start performance tracking
              const perfId = performanceMonitor.start('category-click', 'category-navigation', {
                categoryId: item.id,
                categoryTitle: item.title || title,
                trigger: 'navbar-subcategory-item',
              });
              
              // Mark loader start
              const loaderStartTime = performance.now();
              if (typeof window !== 'undefined' && window.NProgress) {
                window.__navTriggerType = 'navbar-category';
                window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
                window.__startTimeRef && (window.__startTimeRef.current = Date.now());
                window.NProgress.start();
              }
              performanceMonitor.markMilestone(perfId, 'loader-shown', {
                loaderStartTime: performance.now() - loaderStartTime,
              });
              
              try {
                // Navigate - route guard handles duplicate prevention efficiently
                const navStartTime = performance.now();
                await push(targetRoute);
                performanceMonitor.markMilestone(perfId, 'navigation-complete', {
                  navigationTime: performance.now() - navStartTime,
                  targetUrl: targetRoute,
                });
                
                closeMenu();
                
                console.log(
                  item.name,
                  item.id,
                  " item clicked SubCategoryListItem"
                );
              } catch (error) {
                console.error('[SubChildItem] Navigation error:', error);
              } finally {
                // Reset after navigation completes or fails
                setTimeout(() => {
                  navigatingRef.current = false;
                  lastNavigatedRouteRef.current = null;
                }, 2000);
              }
              
              // Note: Product display milestone will be marked in product-search.jsx
            }}
          >
            {title}
          </Typography>
          {isNew && (
            <Chip
              label="NEW"
              color="error"
              size="small"
              sx={{
                fontSize: "0.6rem",
                height: 16,
                borderRadius: "8px",
                animation: "fadeInSlide 0.5s ease-out",
                "@keyframes fadeInSlide": {
                  from: {
                    opacity: 0,
                    transform: "translateY(-5px)",
                  },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            />
          )}
        </Box>
      </SubCategoryListItem>
      {/* </Link> */}
      {child?.length > 0 && (
        <SubCategoryList sx={{ display: "block" }}>
          {child.map((nestedChild, idx) => (
            <SubChildItem
              key={nestedChild?.id || nestedChild?.item || idx}
              item={nestedChild}
              level={level + 1}
              onBreadcrumbUpdate={onBreadcrumbUpdate}
              closeMenu={closeMenu}
            />
          ))}
        </SubCategoryList>
      )}
    </div>
  );
}

// Internal prefetch helper
function PrefetchCategories({ categories }) {
  // Use regular useRouter for prefetch - prefetch doesn't need guarding
  const router = useRouter();
  useEffect(() => {
    if (!categories) return;
    const urls = [];
    categories.forEach((c) => {
      if (c?.id) urls.push(`/allProducts?category=${c.id}&view=grid`);
      c?.child?.forEach((sc) => {
        if (sc?.id) urls.push(`/allProducts?category=${sc.id}&view=grid`);
      });
    });
    urls.slice(0, 20).forEach((u) => router.prefetch(u));
  }, [categories]);
  return null;
}
