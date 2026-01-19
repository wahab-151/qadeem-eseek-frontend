"use client";

import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

/**
 * QadeemButton - A comprehensive, reusable button component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button text/content
 * @param {React.ReactNode} props.startIcon - Icon to display at the start
 * @param {React.ReactNode} props.endIcon - Icon to display at the end
 * @param {boolean} props.iconOnly - If true, renders as icon button without text
 * @param {boolean} props.loading - Shows loading spinner
 * @param {boolean} props.disabled - Disables the button
 * @param {string} props.variant - Button variant: 'contained', 'outlined', 'text'
 * @param {string} props.color - Button color: 'primary', 'secondary', 'error', 'warning', 'info', 'success'
 * @param {string} props.size - Button size: 'small', 'medium', 'large'
 * @param {boolean} props.fullWidth - Makes button full width
 * @param {string} props.href - Link URL (uses Link component)
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type: 'button', 'submit', 'reset'
 * @param {string} props.className - Additional CSS class
 * @param {Object} props.sx - Additional MUI sx styles
 * @param {Object} props.component - Component to render as (e.g., Link)
 * @param {boolean} props.disableRipple - Disables ripple effect
 * @param {boolean} props.disableElevation - Disables elevation shadow
 */

const StyledButton = styled(Button)(({ theme, ownerState }) => {
  const { variant, customColor } = ownerState;
  
  // Default styles for all buttons
  const baseStyles = {
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 0,
    transition: "all 0.2s ease-in-out",
    "&.Mui-disabled": {
      opacity: 0.6,
    },
  };

  // Custom dark brown color (#5D4037) styles
  if (customColor === "darkBrown") {
    if (variant === "contained") {
      return {
        ...baseStyles,
        backgroundColor: "#5D4037",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#422f24",
        },
        "&.Mui-disabled": {
          backgroundColor: "#9E9E9E",
          opacity: 0.6,
        },
      };
    }
    if (variant === "outlined") {
      return {
        ...baseStyles,
        borderColor: "#5D4037",
        color: "#5D4037",
        "&:hover": {
          borderColor: "#422f24",
          backgroundColor: "rgba(93, 64, 55, 0.04)",
        },
        "&.Mui-disabled": {
          borderColor: "#9E9E9E",
          color: "#9E9E9E",
          opacity: 0.6,
        },
      };
    }
  }

  // For contained variant without customColor, ensure it uses theme primary
  // MUI Button already handles this via color="primary", but we ensure it's applied
  if (variant === "contained" && !customColor) {
    return {
      ...baseStyles,
      // MUI will apply theme.palette.primary.main via color prop
      // We just ensure our base styles are applied
    };
  }

  return baseStyles;
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: "all 0.2s ease-in-out",
  "&.Mui-disabled": {
    opacity: 0.6,
  },
}));

const LoadingSpinner = styled(CircularProgress)(({ theme, size }) => ({
  marginRight: size === "small" ? "8px" : size === "large" ? "12px" : "10px",
}));

export default function QadeemButton({
  children,
  startIcon,
  endIcon,
  iconOnly = false,
  loading = false,
  disabled = false,
  variant = "contained",
  color = "primary",
  customColor, // Custom color prop for brand-specific colors like darkBrown
  size = "medium",
  fullWidth = false,
  href,
  onClick,
  type = "button",
  className = "",
  sx = {},
  component,
  disableRipple = false,
  disableElevation = false,
  ...otherProps
}) {
  // If iconOnly is true, render as IconButton
  if (iconOnly) {
    // Use startIcon or endIcon as the icon (prefer startIcon)
    const icon = startIcon || endIcon;
    
    if (!icon) {
      console.warn("QadeemButton: iconOnly requires either startIcon or endIcon");
      return null;
    }

    return (
      <StyledIconButton
        onClick={onClick}
        disabled={disabled || loading}
        size={size}
        color={color}
        href={href}
        component={component}
        className={className}
        disableRipple={disableRipple}
        sx={sx}
        {...otherProps}
      >
        {loading ? (
          <CircularProgress size={size === "small" ? 20 : size === "large" ? 28 : 24} />
        ) : (
          icon
        )}
      </StyledIconButton>
    );
  }

  // Determine which icons to show
  const showStartIcon = startIcon && !loading;
  const showEndIcon = endIcon && !loading;

  // Loading spinner replaces startIcon when loading
  const displayStartIcon = loading ? (
    <LoadingSpinner size={size} />
  ) : showStartIcon ? (
    startIcon
  ) : null;

  // Ensure color defaults to "primary" if not specified and no customColor
  const buttonColor = customColor ? undefined : (color || "primary");

  return (
    <StyledButton
      variant={variant}
      color={buttonColor} // Use MUI color prop (defaults to "primary") which applies theme.palette.primary.main
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={displayStartIcon}
      endIcon={showEndIcon ? endIcon : null}
      onClick={onClick}
      type={type}
      href={href}
      component={component}
      className={className}
      disableRipple={disableRipple}
      disableElevation={disableElevation}
      ownerState={{ variant, customColor }}
      sx={sx}
      {...otherProps}
    >
      {children}
    </StyledButton>
  );
}

// Export types for TypeScript users (if needed)
export const QadeemButtonVariants = {
  CONTAINED: "contained",
  OUTLINED: "outlined",
  TEXT: "text",
};

export const QadeemButtonColors = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  SUCCESS: "success",
};

export const QadeemButtonSizes = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

