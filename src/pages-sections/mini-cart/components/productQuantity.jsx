'use client';

import { Box, Button, Typography, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import FlexBox from "components/flex-box/flex-box";
import React, { useState, useEffect } from 'react';

const  OrderQuantity = ({ quantity, onChange, min = 1, max = 99, fullWidth = false }) => {
  const [inputValue, setInputValue] = useState(quantity.toString());

  // Sync local state when quantity prop changes
  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);
  
  const handleIncrement = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  const handleInputChange = (event) => {
    const rawValue = event.target.value;
    
    // Allow empty string for intermediate typing state
    if (rawValue === '') {
      setInputValue('');
      return;
    }
    
    // Only allow numeric input
    if (!/^\d+$/.test(rawValue)) {
      return;
    }
    
    const numValue = parseInt(rawValue, 10);
    
    // Allow typing intermediate values, but don't update parent yet
    if (numValue >= 0 && numValue <= max) {
      setInputValue(rawValue);
    } else if (numValue > max) {
      // If exceeds max, set to max
      setInputValue(max.toString());
      onChange(max);
    }
  };

  const handleBlur = (event) => {
    const rawValue = event.target.value;
    
    // If empty or invalid, set to min
    if (rawValue === '' || isNaN(parseInt(rawValue, 10))) {
      setInputValue(min.toString());
      onChange(min);
      return;
    }
    
    const numValue = parseInt(rawValue, 10);
    
    // Enforce min and max bounds
    if (numValue < min) {
      setInputValue(min.toString());
      onChange(min);
    } else if (numValue > max) {
      setInputValue(max.toString());
      onChange(max);
    } else {
      // Valid value, update parent
      setInputValue(numValue.toString());
      onChange(numValue);
    }
  };

  return (
    <>
     <Box
      display="flex"
      alignItems="center"
      border="1px solid #ccc"
      borderRadius="999px"
      overflow="hidden"
      sx={{
        width: '100%',
        minWidth: fullWidth ? '100%' : '100px',
        maxWidth: fullWidth ? '100%' : '140px'
      }}
    >
      <Button
        onClick={handleDecrement}
        disabled={quantity === min}
        sx={{
          minWidth: 37,
          height: '-webkit-fill-available',
          borderRadius: 0,
          backgroundColor: '#f5f5f5',
          color: '#000',
          '&:hover': { backgroundColor: '#e0e0e0' },
        }}
      >
        <Remove sx={{ fontSize: 28, fontWeight: 'bold' }}/>
      </Button>

      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="white"
        sx={{
          minWidth: '40px',
          flex: '1 1 auto'
        }}
      >
        <TextField
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          fullWidth
          inputProps={{
            min: min,
            max: max,
            style: {
              textAlign: 'center',
              fontSize: '18px',
              border: 'none',
              outline: 'none',
              width: '100%',
              padding: '8px 4px',
              WebkitAppearance: 'none',
              MozAppearance: 'textfield',
              minWidth: '30px'
            }
          }}
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              border: 'none',
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
            '& .MuiInputBase-input': {
              padding: '8px 4px',
              textAlign: 'center',
              minWidth: '30px',
              width: '100%',
              '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
              '&[type=number]': {
                MozAppearance: 'textfield',
              }
            }
          }}
        />
      </Box>

      <Button
        onClick={handleIncrement}
        disabled={quantity === max}
        sx={{
          minWidth: 37,
          height: '-webkit-fill-available',
          borderRadius: 0,
          backgroundColor: '#f5f5f5',
          color: '#000',
          '&:hover': { backgroundColor: '#e0e0e0' },
        }}
      >
        <Add sx={{ fontSize: 28, fontWeight: 'bold' }} />
      </Button>
    </Box>
   
    </>
  );
};

export default OrderQuantity;