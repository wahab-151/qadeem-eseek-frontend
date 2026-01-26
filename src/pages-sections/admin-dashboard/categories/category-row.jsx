"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { RemoveRedEye } from "@mui/icons-material";
// GLOBAL CUSTOM COMPONENT
import BazaarSwitch from "components/BazaarSwitch";
import { IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// STYLED COMPONENTS
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../styles";
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "app/store/services";
import { useSnackbar } from "notistack";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography as MuiTypography,
} from "@mui/material";
import CategoryForm from "./category-form";
import { EXCLUDED_CATEGORY_ID } from "utils/constants";

export default function CategoryRow({ 
  category, 
  refetchCategories, 
  childCategories = [], 
  isParent = false,
  level = 0
}) {
  const { image, name, level: categoryLevel, CategoryName, featured, _id: id, slug, parentId, hasChildren, displayOrder } = category;
  // console.log("in row", category);
  const [featuredCategory, setFeaturedCategory] = useState(featured);
  const [isExpanded, setIsExpanded] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [mode, setMode] = useState("create");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteCategory, { isLoading, error }] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      await deleteCategory({ id }).unwrap();
      enqueueSnackbar("Category deleted successfully", { variant: "success" });
      await refetchCategories();
    } catch (error) {
      enqueueSnackbar("Failed to delete category", { variant: "error" });
      console.error("Delete error:", error?.message || error);
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const categoryAction = `${capitalize(mode)} Category`;

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const renderIndentation = () => {
    if (isParent && hasChildren) {
      return (
        <IconButton
          size="small"
          onClick={handleExpandToggle}
          sx={{ p: 0.5 }}
        >
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      );
    }
    
    // Show indicator for categories that can't have children (level 4)
    if (categoryLevel === 4) {
      return (
        <Box 
          sx={{ 
            px: 0.5, 
            py: 0.5, 
            borderRadius: 0.5, 
            fontSize: '0.625rem',
            backgroundColor: 'grey.300',
            color: 'grey.600',
            fontWeight: 'medium',
            cursor: 'default'
          }}
          title="Maximum level reached - cannot have children"
        >
          MAX
        </Box>
      );
    }
    
    return null;
  };

  const renderLevelIndicators = () => {
    if (level > 0) {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          {Array.from({ length: level }).map((_, index) => (
            <KeyboardArrowRight key={index} sx={{ color: 'text.secondary', fontSize: 16 }} />
          ))}
          <Typography variant="body2" color="text.secondary">
            {displayOrder}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const renderLevelBadge = () => {
    // Special badge for deletedCategories parent
    if (category._id === EXCLUDED_CATEGORY_ID) {
      return (
        <Box 
          sx={{ 
            px: 1, 
            py: 0.5, 
            borderRadius: 1, 
            fontSize: '0.75rem',
            backgroundColor: 'error.light',
            color: 'error.dark',
            fontWeight: 'medium'
          }}
        >
          DELETED
        </Box>
      );
    }
    
    if (categoryLevel > 1) {
      return (
        <Box 
          sx={{ 
            px: 1, 
            py: 0.5, 
            borderRadius: 1, 
            fontSize: '0.75rem',
            backgroundColor: categoryLevel === 4 ? 'warning.light' : 'info.light',
            color: categoryLevel === 4 ? 'warning.dark' : 'info.dark',
            fontWeight: 'medium'
          }}
        >
          L{categoryLevel}
        </Box>
      );
    }
    return null;
  };

  return (
    <>
      <StyledTableRow tabIndex={-1} role="checkbox">
        <StyledTableCell align="left">
          <Box 
            display="flex" 
            alignItems="center" 
            gap={1} 
            sx={{ 
              pl: level * 3,
              borderLeft: level > 0 ? `2px solid ${level === 4 ? '#D97706' : '#8B7548'}` : 'none', // Heritage colors
              ml: level > 0 ? 1 : 0,
              position: 'relative',
              opacity: category.parentId === EXCLUDED_CATEGORY_ID ? 0.6 : 1
            }}
          >
            {renderIndentation()}
            {/* {renderLevelIndicators()} */}
            <CategoryWrapper>{name}</CategoryWrapper>
            {renderLevelBadge()}
          </Box>
        </StyledTableCell>
        
        <StyledTableCell align="left">
          <Avatar
            variant="rounded"
            sx={{ width: 56, height: 56, position: "relative" }}
          >
            <Image
              fill
              alt={name}
              src={image || "/assets/images/small-screen-logo.png"}
              sizes="(100% 100%)"
              style={{ objectFit: "contain" }}
            />
          </Avatar>
        </StyledTableCell>

        {/* <StyledTableCell align="left">{categoryLevel}</StyledTableCell> */}
        <StyledTableCell align="left">{(category._id === EXCLUDED_CATEGORY_ID) ? "-" : displayOrder}</StyledTableCell>
        {/* <StyledTableCell align="left">{CategoryName}</StyledTableCell> */}
        {/* <StyledTableCell align="left">
          <BazaarSwitch
            color="info"
            checked={featuredCategory}
            onChange={() => setFeaturedCategory((state) => !state)}
          />
        </StyledTableCell> */}
        <StyledTableCell align="center">
          <StyledIconButton
            onClick={() => {
              setEditOpen(true);
              console.log("set a  s view");
              setMode("view");
            }}
          >
            <RemoveRedEye />
          </StyledIconButton>

          {/* view brand details Dialog */}
          <Dialog
            open={editOpen}
            onClose={() => setEditOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle style={{ textAlign: "center", fontWeight: 600 }}>
              {categoryAction}
            </DialogTitle>
            <DialogContent>
              <CategoryForm
                initialValues={{
                  id: category._id,
                  name: category.name,
                  title: category.title,
                  description: category.description,
                  image: category.image,
                  slug: category.slug,
                  parentId: category.parentId,
                  level: category.level,
                  isActive: category.isActive,
                  displayOrder: category.displayOrder,
                  isRecentlyAdded: category.isRecentlyAdded,
                  hasChildren: category.hasChildren,
                  hasParts: category.hasParts,
                  modelNumbers: category.modelNumbers || [],
                  attributes: category.attributes || {},
                }}
                onSuccess={() => {
                  refetchCategories();
                  setEditOpen(false);
                }}
                mode={mode}
              />
            </DialogContent>
          </Dialog>

          <StyledIconButton
            onClick={() => {
              setEditOpen(true);
              setMode("edit");
            }}
          >
            <Edit />
          </StyledIconButton>
          
          {/* Edit Dialog */}
          <Dialog
            open={editOpen}
            onClose={() => setEditOpen(false)}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                position: "relative",
              },
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => setEditOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.primary[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle style={{ textAlign: "center", fontWeight: 600 }}>
              {categoryAction}
            </DialogTitle>
            <DialogContent>
              <CategoryForm
                initialValues={{
                  id: category._id,
                  name: category.name,
                  title: category.title,
                  description: category.description,
                  image: category.image,
                  slug: category.slug,
                  parentId: category.parentId,
                  level: category.level,
                  isActive: category.isActive,
                  displayOrder: category.displayOrder,
                  isRecentlyAdded: category.isRecentlyAdded,
                  hasChildren: category.hasChildren,
                  hasParts: category.hasParts,
                  modelNumbers: category.modelNumbers || [],
                  attributes: category.attributes || {},
                }}
                onSuccess={() => {
                  refetchCategories();
                  setEditOpen(false);
                }}
                mode={mode}
              />
            </DialogContent>
          </Dialog>
          
          {/* Hide delete button for deletedCategories parent category */}
          {category._id !== EXCLUDED_CATEGORY_ID && (
            <StyledIconButton
              onClick={() => setConfirmOpen(true)}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : <Delete />}
            </StyledIconButton>
          )}
          
          {/* Delete Confirmation Dialog */}
          <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <MuiTypography>
                Are you sure you want to delete the category &quot;{name}&quot;?
              </MuiTypography>
              <MuiTypography variant="body2" color="error" sx={{ mt: 1 }}>
                This action cannot be undone.
              </MuiTypography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
              <Button
                onClick={handleDelete}
                color="error"
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>
        </StyledTableCell>
      </StyledTableRow>

      {/* Render child categories when expanded - recursively handle nested children */}
      {isParent && isExpanded && hasChildren && childCategories.map((childCategory) => (
        <CategoryRow
          key={childCategory._id}
          category={childCategory}
          refetchCategories={refetchCategories}
          childCategories={childCategory.childCategories || []}
          isParent={childCategory.hasChildren}
          image={childCategory.image}
          level={level + 1}
        />
      ))}
    </>
  );
}
