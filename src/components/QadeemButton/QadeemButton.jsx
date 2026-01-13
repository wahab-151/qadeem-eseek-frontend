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

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 500,
  borderRadius: 0,
  transition: "all 0.2s ease-in-out",
  "&.Mui-disabled": {
    opacity: 0.6,
  },
}));

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

  return (
    <StyledButton
      variant={variant}
      color={color}
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

