// import { Box, Typography, Card, List, ListItem, Link } from '@mui/material';

// export default function ProductDescription({data}) {
//   return    <Card variant="outlined" sx={{ p: 2 }}>

//       <Box
//         sx={{
//           backgroundColor: '#f1f1f1',
//           px: 2,
//           py: 1,
//           borderTopLeftRadius: '16px',
//           borderTopRightRadius: '16px',
//         }}
//       >   <Typography variant="h3" sx={{
//       mb: 2
//     }}>
//         Specification:
//       </Typography>
//       </Box>

//       <div  style={{marginTop:'16px', marginBottom:'16px', paddingLeft:'16px'}}>
//         {data}
//         {/* Brand: Beats <br />
//         Model: S450 <br />
//         Wireless Bluetooth Headset <br />
//         FM Frequency Response: 87.5 – 108 MHz <br />
//         Feature: FM Radio, Card Supported (Micro SD / TF) <br />
//         Made in China <br /> */}
//       </div>
//       {/* <Card variant="outlined" sx={{ p: 2 }}> */}
//       <Box
//         sx={{
//           backgroundColor: '#f1f1f1',
//           px: 2,
//           py: 1,
//           borderTopLeftRadius: '16px',
//           borderTopRightRadius: '16px',
//         }}
//       >
//         <Typography variant="h3">Warranty & Shipping</Typography>
//       </Box>
//       <List sx={{ mt: 1, pl: 2 }}>
//         <ListItem sx={{ display: 'list-item', pl: 0 }}>
//           Please check the warranty policy for details!
//         </ListItem>
//         <ListItem sx={{ display: 'list-item', pl: 0 }}>
//           <Link href="/shipping&returns" color="error" underline="hover" fontWeight="bold">
//             Return Policy Link
//           </Link>
//         </ListItem>
//         <ListItem sx={{ display: 'list-item', pl: 0 }}>
//           Same Day Ground and Overnight Shipping.
//         </ListItem>
//       </List>
//     {/* </Card> */}
//     </Card>;
// }

"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Card,
  List,
  ListItem,
  Link,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useRouter } from "next/navigation";
import useTheme from "@mui/material/styles/useTheme";
export default function ProductDescription({ models, data }) {
    const router = useRouter();
  const theme = useTheme();
  // console.log(models, "models in product description");
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      {/* Compatible models Accordion */}
      {/* {models?.length > 0 && (
        <Accordion
          defaultExpanded
          disableGutters
          className="mb-4" // 👈 gap below this accordion
          sx={{
            // border: '1px solid #e0e0e0',
            border: "none", // remove border
            boxShadow: "none", // remove shadow
            borderRadius: "25px",
            overflow: "hidden",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "#f1f1f1",
              px: 2,
              // py: 1,
              borderRadius: "25px",
              transition: "border-radius 0.3s",
            }}
          >
            <Typography variant="h3" fontWeight="bold">
              Compatible Models
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, py: 2 }}>
            <Box>
              {models?.length > 0 && (
                <Box
                  mt={1}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ overflowX: "auto", whiteSpace: "nowrap" }}
                >
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {models.map((model, index) => (
                      <Button
                        key={index}
                        onClick={() => router.push(`/allProducts/${model}`)}
                        variant="contained"
                        disableElevation
                        sx={{
                          borderRadius: "999px",
                          px: 2,
                          py: 0.5,
                          fontSize: "0.75rem",
                          textTransform: "none",
                          backgroundColor: theme.palette.dark.main,
                          color: theme.palette.dark.contrastText,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.getContrastText(
                              theme.palette.primary.main
                            ),
                          },
                        }}
                      >
                        {model}
                      </Button>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      )} */}
      {/* Specification Accordion */}
      <Accordion
        defaultExpanded
        disableGutters
        className="mb-4" // 👈 gap below this accordion
        sx={{
          // border: '1px solid #e0e0e0',
          border: "none", // remove border
          boxShadow: "none", // remove shadow
          borderRadius: "25px",
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#f1f1f1",
            px: 2,
            // py: 1,
            borderRadius: "25px",
            transition: "border-radius 0.3s",
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            Specification
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 3, py: 2 }}>
          <Box className="text-sm text-gray-700 leading-relaxed">{data}</Box>
        </AccordionDetails>
      </Accordion>

      {/* Warranty & Shipping Accordion */}
      <Accordion
        defaultExpanded
        disableGutters
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "25px",
          overflow: "hidden",
          border: "none", // remove border
          boxShadow: "none", // remove shadow
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#f1f1f1",
            px: 2,
            // py: 1,
            borderRadius: "25px",
            transition: "border-radius 0.3s",
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            Warranty & Shipping
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 3, py: 2 }}>
          <List sx={{ pl: 2 }}>
            <ListItem sx={{ display: "list-item", pl: 0 }}>
              Please check the warranty policy for details!
            </ListItem>
            <ListItem sx={{ display: "list-item", pl: 0 }}>
              <Link
                href="/shipping&returns"
                color="error"
                underline="hover"
                fontWeight="bold"
              >
                Return Policy Link
              </Link>
            </ListItem>
            <ListItem sx={{ display: "list-item", pl: 0 }}>
              Same Day Ground and Overnight Shipping.
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}
