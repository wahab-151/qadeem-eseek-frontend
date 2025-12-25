"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

// STYLED COMPONENT
import { SearchOutlinedIcon } from "./styles";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = async () => {
    if (search) {
      setIsLoading(true);
      try {
        const params = new URLSearchParams(searchParams);
        params.set("q", search);
        await router.push(`/products/search?${params.toString()}`);
        setSearch("");
      } catch (error) {
        console.error("Search navigation error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const INPUT_PROPS = {
    sx: {
      border: 0,
      height: 44,
      paddingRight: 0,
      overflow: "hidden",
      backgroundColor: "grey.200",
      "& .MuiOutlinedInput-notchedOutline": {
        border: 0
      }
    },
    endAdornment: (
      <Button 
        color="primary" 
        disableElevation 
        variant="contained" 
        onClick={handleSearch} 
        disabled={isLoading}
        sx={{
          px: "3rem",
          height: "100%",
          borderRadius: "0 4px 4px 0",
          minWidth: "120px"
        }}
      >
        {isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          "Search"
        )}
      </Button>
    ),
    startAdornment: <SearchOutlinedIcon fontSize="small" />
  };
  
  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <TextField 
        fullWidth 
        variant="outlined" 
        placeholder="Searching for..." 
        onChange={e => setSearch(e.target.value)}
        value={search}
        InputProps={INPUT_PROPS} 
      />
    </Box>
  );
}