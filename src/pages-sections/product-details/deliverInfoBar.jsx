'use client';
import { Box, Typography, Tooltip, Stack, Paper } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const infoItems = [
  {
    icon: <LocalShippingIcon />,
    text: 'Free Delivery Over $500',
    tooltip: 'Free standard delivery when your order exceeds $500.',
  },
  {
    icon: <InventoryIcon />,
    text: 'Same Day Shipping',
    tooltip: 'Order before 2 PM for same-day dispatch.',
  },
  {
    icon: <CreditCardIcon />,
    text: 'Secure Payment',
    tooltip: 'All payments are processed securely with encryption.',
  },
];

export default function DeliveryInfoBar() {
  return (
    <Paper
      elevation={0}
      sx={{
        mt:4,
        p: 2,
        borderRadius: 4,
        border: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'center',
        gap: 4,
        flexWrap: 'wrap',
      }}
    >
      {infoItems.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          alignItems="center"
          spacing={1.2}
          sx={{ color: '#444' }}
        >
          {item.icon}
          <Typography variant="body2" fontWeight={500}>
            {item.text}
          </Typography>
          <Tooltip title={item.tooltip} arrow>
            <InfoOutlinedIcon fontSize="small" color="action" />
          </Tooltip>
        </Stack>
      ))}
    </Paper>
  );
}
