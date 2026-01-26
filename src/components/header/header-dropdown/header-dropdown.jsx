"use client";

import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import {
  Wrapper,
  StyledCard,
  CategoryList,
  MenusContainer,
  SubCategoryList,
  CategoryListItem,
  SubCategoryListItem,
} from "components/navbar/nav-list/category-based-menu/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useGuardedRouter, { wouldBlockNavigation } from "hooks/useGuardedRouter";
import OverlayScrollbar from "components/overlay-scrollbar";
import { Chip } from "@mui/material";
import dayjs from "dayjs";
import performanceMonitor from "utils/performanceMonitor";

/**
 * HeaderDropdown - A reusable dropdown component for header navigation
 * 
 * @param {Object} props
 * @param {string} props.title - Dropdown title
 * @param {Array} props.menuList - Array of menu items/categories
 * @param {Object} props.nav - Navigation object
 */
export default function HeaderDropdown({ title, menuList: categories, nav }) {
  const { push } = useGuardedRouter();
  const [selected, setSelected] = useState();
  const [closeTimeout, setCloseTimeout] = useState(null);
  const navigatingRef = useRef(false);
  const lastNavigatedRouteRef = useRef(null);
  
  // Only use provided categories, no fallback to dummy data
  const categoriesList = (categories && Array.isArray(categories) && categories.length > 0) 
    ? categories 
    : [];

  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  const handleCategorySelect = (name) => {
    setSelected(name);
  };

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  const handlePopupMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  // Only use provided categories, no fallback
  const finalCategoriesList = categoriesList;
  
  // Update selected when categories change
  useEffect(() => {
    if (finalCategoriesList && finalCategoriesList.length > 0 && finalCategoriesList[0]?.title) {
      setSelected(finalCategoriesList[0]?.title);
    }
  }, [finalCategoriesList]);
  
  // Don't render if still no categories
  if (!finalCategoriesList || finalCategoriesList.length === 0) {
    return null;
  }
  
  // Find selected category, fallback to first category with children
  const finalSelectedCategory = finalCategoriesList?.find((item) => item.title === selected) 
    || finalCategoriesList.find((item) => item.child && item.child.length > 0)
    || finalCategoriesList[0];

  return (
    <Wrapper
      className="menu-wrapper"
      onMouseEnter={handleMouseEnter}
      sx={{
        position: "relative",
        zIndex: 999999,
        "& .menu-title": {
          display: "none", // Hide the title since it's already shown in the nav link
        },
      }}
    >
      <MenusContainer
        className="menu-list"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={handlePopupMouseEnter}
        sx={{
          display: "block !important",
          position: "relative",
          left: "auto",
          transform: "none",
          top: "auto",
          width: "100%",
          height: "fit-content",
          zIndex: 999999,
          backgroundColor: "#FEFAF0",
          padding: "16px",
        }}
      >
        <StyledCard
          sx={{
            zIndex: 999999,
            position: "relative",
            backgroundColor: "#FEFAF0",
            boxShadow: "none",
            border: "none",
            marginTop: 0,
            height: "fit-content",
          }}
        >
          <CategoryList
            sx={{
              backgroundColor: "#F5F5F5",
              borderRadius: "0 !important",
              height: "fit-content",
            }}
          >
            {finalCategoriesList?.length > 0 ? finalCategoriesList.map((item, index) => (
              <CategoryListItem
                key={item?.id || item?.item || index}
                active={selected === item?.title}
                onMouseEnter={() => handleCategorySelect(item?.title)}
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                }}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "forwards",
                }}
                onClick={async (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  
                  const targetRoute = `/allProducts?category=${item?.id}&view=grid`;
                  
                  const guardCheck = wouldBlockNavigation(targetRoute);
                  if (guardCheck.blocked) {
                    return;
                  }
                  
                  if (navigatingRef.current || lastNavigatedRouteRef.current === targetRoute) {
                    return;
                  }
                  
                  navigatingRef.current = true;
                  lastNavigatedRouteRef.current = targetRoute;
                  
                  const perfId = performanceMonitor.start('category-click', 'category-navigation', {
                    categoryId: item?.id,
                    categoryTitle: item?.title,
                    trigger: 'header-dropdown',
                  });
                  
                  const loaderStartTime = performance.now();
                  if (typeof window !== 'undefined' && window.NProgress) {
                    window.__navTriggerType = 'header-dropdown-category';
                    window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
                    window.__startTimeRef && (window.__startTimeRef.current = Date.now());
                    window.NProgress.start();
                  }
                  performanceMonitor.markMilestone(perfId, 'loader-shown', {
                    loaderStartTime: performance.now() - loaderStartTime,
                  });
                  
                  try {
                    const navStartTime = performance.now();
                    await push(targetRoute);
                    performanceMonitor.markMilestone(perfId, 'navigation-complete', {
                      navigationTime: performance.now() - navStartTime,
                      targetUrl: targetRoute,
                    });
                  } catch (error) {
                    console.error('[HeaderDropdown] Navigation error:', error);
                  } finally {
                    setTimeout(() => {
                      navigatingRef.current = false;
                      lastNavigatedRouteRef.current = null;
                    }, 2000);
                  }
                }}
              >
                <span>{item?.title}</span>
                <ArrowForwardIcon fontSize="small" className="icon" />
              </CategoryListItem>
            )) : (
              <Box sx={{ p: 2, textAlign: "center", color: "grey.600" }}>
                No categories available
              </Box>
            )}
          </CategoryList>
          <SubChildList
            subChildren={finalSelectedCategory}
            title={title}
          />
        </StyledCard>
      </MenusContainer>
    </Wrapper>
  );
}

function SubChildList({ subChildren, title }) {
  const { push } = useGuardedRouter();
  const navigatingRef = useRef(false);
  const lastNavigatedRouteRef = useRef(null);

  // Don't render if no subChildren or no child array
  if (!subChildren || !subChildren.child || !Array.isArray(subChildren.child) || subChildren.child.length === 0) {
    return (
      <OverlayScrollbar sx={{ width: "100%" }}>
        <Box px={6} pt={2} pb={0} height="fit-content">
          <Box display="flex" alignItems="center" justifyContent="center" minHeight="200px">
            <Box sx={{ color: "grey.600", textAlign: "center" }}>
              No items available
            </Box>
          </Box>
        </Box>
      </OverlayScrollbar>
    );
  }

  return (
    <OverlayScrollbar sx={{ width: "100%" }}>
      <Box px={6} pt={2} pb={0} height="fit-content">
        <Box display="flex" flexWrap="wrap" gap={1}>
          {subChildren.child.map((item, idx) => {
            const isNew =
              item?.createdAt &&
              dayjs().diff(dayjs(item.createdAt), "day") <= 14;
            
            if (title === "Accessories" || title === "Tools" || title === "Refurbishing") {
              return (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 100,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "transform 0.3s ease, opacity 0.3s ease",
                      transform: "scale(1)",
                      opacity: 1,
                      "&:hover": {
                        transform: "scale(1.05)",
                        opacity: 0.9,
                        "& span": {
                          color: "#271E03",
                        },
                      },
                      "&:active": {
                        transform: "scale(0.98)",
                        transition: "transform 0.1s ease",
                      },
                    }}
                    onClick={async (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      
                      const targetRoute = `/allProducts?category=${item.id}&view=grid`;
                      
                      const guardCheck = wouldBlockNavigation(targetRoute);
                      if (guardCheck.blocked) return;
                      
                      if (navigatingRef.current || lastNavigatedRouteRef.current === targetRoute) {
                        return;
                      }
                      
                      navigatingRef.current = true;
                      lastNavigatedRouteRef.current = targetRoute;
                      
                      const perfId = performanceMonitor.start('category-click', 'category-navigation', {
                        categoryId: item.id,
                        categoryTitle: item.title,
                        trigger: 'header-dropdown-circle',
                      });
                      
                      if (typeof window !== 'undefined' && window.NProgress) {
                        window.__navTriggerType = 'header-dropdown-category';
                        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
                        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
                        window.NProgress.start();
                      }
                      
                      try {
                        await push(targetRoute);
                      } catch (error) {
                        console.error('[HeaderDropdown] Navigation error:', error);
                      } finally {
                        setTimeout(() => {
                          navigatingRef.current = false;
                          lastNavigatedRouteRef.current = null;
                        }, 2000);
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "0",
                        border: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          borderColor: "#271E03",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <img
                        src={item?.icon || "/assets/images/small-screen-logo.png"}
                        alt={item.title || "Product"}
                        style={{
                          width: "60%",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                    <Box
                      component="span"
                      sx={{
                        mt: 1,
                        textAlign: "center",
                        fontWeight: 500,
                        width: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "0.875rem",
                        transition: "color 0.3s ease",
                        color: "#333",
                      }}
                    >
                      {item.title}
                    </Box>
                    {isNew && (
                      <Chip
                        label="NEW"
                        color="error"
                        size="small"
                        sx={{
                          fontSize: "0.65rem",
                          height: 16,
                          borderRadius: "0",
                        }}
                      />
                    )}
                  </Box>
                </Box>
              );
            } else {
              // Consistent styling for all subcategories matching category buttons
              return (
                <Box
                  key={idx}
                  display="flex"
                  alignItems="center"
                  sx={{ 
                    cursor: 'pointer', 
                    width: "fit-content",
                    height: "fit-content",
                    padding: "6px 6px",
                    marginBottom: "6px",
                    backgroundColor: "transparent",
                    borderRadius: 0,
                    color: "#333",
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    wordBreak: "keep-all",
                    transition: "background-color 0.3s ease, color 0.3s ease, transform 0.2s ease",
                    transform: "translateY(0)",
                    "&:hover": {
                      backgroundColor: "#FFFFFF",
                      color: "#271E03",
                      transform: "translateY(-2px)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                      transition: "transform 0.1s ease",
                    },
                  }}
                  onClick={async (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    
                    const targetRoute = `/allProducts?category=${item.id}&view=grid`;
                    
                    const guardCheck = wouldBlockNavigation(targetRoute);
                    if (guardCheck.blocked) return;
                    
                    if (navigatingRef.current || lastNavigatedRouteRef.current === targetRoute) {
                      return;
                    }
                    
                    navigatingRef.current = true;
                    lastNavigatedRouteRef.current = targetRoute;
                    
                    if (typeof window !== 'undefined' && window.NProgress) {
                      window.__navTriggerType = 'header-dropdown-category';
                      window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
                      window.__startTimeRef && (window.__startTimeRef.current = Date.now());
                      window.NProgress.start();
                    }
                    
                    try {
                      await push(targetRoute);
                    } catch (error) {
                      console.error('[HeaderDropdown] Navigation error:', error);
                    } finally {
                      setTimeout(() => {
                        navigatingRef.current = false;
                        lastNavigatedRouteRef.current = null;
                      }, 2000);
                    }
                  }}
                >
                  <Box component="span">
                    {item.title}
                  </Box>
                  {isNew && (
                    <Chip
                      label="NEW"
                      color="error"
                      size="small"
                      sx={{
                        fontSize: "0.65rem",
                        height: 16,
                        borderRadius: "0",
                        ml: 1,
                      }}
                    />
                  )}
                </Box>
              );
            }
          })}
        </Box>
      </Box>
    </OverlayScrollbar>
  );
}

