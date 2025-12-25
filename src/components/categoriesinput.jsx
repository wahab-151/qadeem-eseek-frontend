// components/CategoriesInput.jsx
"use client";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Chip, Box, Autocomplete, CircularProgress } from "@mui/material";

export default function CategoriesInput({
  name = "categories",
  label = "Categories",
  placeholder = "Enter Categories",
  categories = [],
  loading = false,
}) {
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState("");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value = [] } }) => {
        // Common handler to add category manually or via autocomplete
        const handleAdd = (category) => {
          if (value.some(cat => cat._id === category._id)) return;
          onChange([...value, category]);
        };

        // AUTOCOMPLETE ENABLED
        return (
          <Autocomplete
            multiple
            freeSolo
            options={categories} // ✅ categories = [{_id, name}, ...]
            value={value}
            onChange={(e, newValue) => onChange(newValue)}
            inputValue={inputValue}
            onInputChange={(e, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && inputValue.trim()) {
                e.preventDefault();
                // Create a new category object for manual entry
                const newCategory = {
                  _id: `temp-${Date.now()}`,
                  name: inputValue.trim()
                };
                handleAdd(newCategory);
                setInputValue("");
              }
            }}
            getOptionLabel={(option) => option.name || option}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            filterSelectedOptions // ✅ avoids showing already-selected categories
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip 
                  key={option._id || index} 
                  label={option.name} 
                  {...getTagProps({ index })} 
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                color="info"
                size="medium"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading && (
                        <CircularProgress color="inherit" size={20} />
                      )}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
}
