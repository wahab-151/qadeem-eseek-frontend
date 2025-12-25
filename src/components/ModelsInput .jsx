// components/ModelsInput.jsx
'use client'
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Chip, Box, Autocomplete } from '@mui/material';
import { useAddTagMutation, useGetAllTagsQuery } from 'app/store/services';

export default function ModelsInput({ name = "models", label = "Models", placeholder = "Compatible Models" , autocompleteFeatue= false}) {
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState("");

  const [addTag, { isLoading: adding }]= useAddTagMutation();

 const { data: allTags, isLoading } = useGetAllTagsQuery();



  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value = [] } }) => {
        const handleKeyDown = (e) => {
          if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            if (!value.includes(inputValue.trim())) {
              onChange([...value, inputValue.trim()]);
            }
            setInputValue("");
          }
        };

        const handleDelete = (chipToDelete) => {
          onChange(value.filter((chip) => chip !== chipToDelete));
        };

        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              fullWidth
              label={label}
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              color="info"
              size="medium"
            />
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {value?.map((chip, idx) => (
                <Chip key={idx} label={chip} onDelete={() => handleDelete(chip)} />
              ))}
            </Box>
          </Box>
        );
      }}
    />
  );
}

