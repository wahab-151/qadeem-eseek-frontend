// components/ModelsInput.jsx
"use client";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Chip, Box, Autocomplete, CircularProgress } from "@mui/material";
import { useAddTagMutation, useGetAllTagsQuery } from "app/store/services";

export default function TagsInput({
  name = "tags",
  label = "Tags",
  placeholder = "Enter Tags",
}) {
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState("");

  const [addTag, { isLoading: adding }] = useAddTagMutation();
  const { data: allTagsRes, isLoading } = useGetAllTagsQuery();
  const allTags = allTagsRes?.data || [];

  // DEFAULT MANUAL CHIP ENTRY - These functions are now moved inside the render function

  // console.log("allTags", a/llTags);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value = [] } }) => {
        // Common handler to add tag manually or via autocomplete
        const handleAdd = async (tag) => {
          if (value.includes(tag)) return;

          if (allTags.includes(tag)) {
            onChange([...value, tag]);
          } else {
            try {
              const res = await addTag({ name: tag }).unwrap();
              if (res?.name || tag) {
                onChange([...value, tag]);
              }
            } catch (err) {
              console.error("Error adding tag:", err);
            }
          }
        };

        // AUTOCOMPLETE ENABLED

        return (
          <Autocomplete
            multiple
            freeSolo
            options={allTags} // ✅ allTags = ['Iphone', 'Cable', ...]
            value={value}
            onChange={(e, newValue) => onChange(newValue)}
            inputValue={inputValue}
            onInputChange={(e, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && inputValue.trim()) {
                e.preventDefault();
                await handleAdd(inputValue.trim());
                setInputValue("");
              }
            }}
            filterSelectedOptions // ✅ avoids showing already-selected tags
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...chipProps } = getTagProps({ index });
                return <Chip key={key} label={option} {...chipProps} />;
              })
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
                      {(isLoading || adding) && (
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
