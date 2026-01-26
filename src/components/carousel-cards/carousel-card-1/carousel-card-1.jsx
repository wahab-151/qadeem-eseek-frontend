import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import QadeemButton from "components/QadeemButton";

// STYLED COMPONENT
import { StyledRoot } from "./styles";
import { Box } from "@mui/material";


// ==================================================

export default function CarouselCard1({ src, index = 0 }) {
  return (
    <Box sx={{
      width: "100%",
      height: { xs: 500, sm: 600, md: 717 },
      position: "relative",
      overflow: "hidden",
      borderRadius: 0,
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Background Image */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        '& img': {
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }
      }}>
        <LazyImage
          key={src}
          src={src}
          alt={`Rug collection ${index + 1}`}
          fill
          sizes="100vw"
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          decoding={index === 0 ? "sync" : "async"}
          style={{
            objectFit: 'cover'
          }}
        />
      </Box>

      {/* Dark overlay for better text readability */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1
      }} />

      {/* Text content - wrapped in Container to align with other sections */}
      <Container
        sx={{
          // Match the same content width as other homepage sections (e.g. New Arrival)
          maxWidth: '1240px',
          width: '100%',
          margin: 'auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* IMPORTANT: no Grid spacing here; spacing adds left padding even with a single item and misaligns content */}
        <Grid container spacing={0} sx={{ height: '100%', alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            position: 'relative'
          }}>
          {/* New Arrival - Inter Semi Bold, 16px, Letter Spacing 3px */}
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#ffffff', 
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: { xs: '14px', sm: '15px', md: '16px' },
              fontWeight: 600, // Semi Bold
              marginBottom: 1,
              letterSpacing: { xs: '2px', sm: '2.5px', md: '3px' },
              lineHeight: 'normal',
              textTransform: 'uppercase'
            }}
          >
            New Arrival
          </Typography>
          
          {/* Discover Our - Inter Bold, 52px, Line Height 65px */}
          <Typography 
            variant="h1" 
            sx={{ 
              color: '#ffffff', 
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: { xs: '32px', sm: '42px', md: '52px' },
              fontWeight: 700, // Bold
              lineHeight: { xs: '40px', sm: '52px', md: '65px' },
              marginBottom: 0.5,
              letterSpacing: '0px'
            }}
          >
            Discover Our
          </Typography>
          
          {/* New Collection - Inter Bold, 52px, Line Height 65px */}
          <Typography 
            variant="h1" 
            sx={{ 
              color: '#ffffff', 
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: { xs: '32px', sm: '42px', md: '52px' },
              fontWeight: 700, // Bold
              lineHeight: { xs: '40px', sm: '52px', md: '65px' },
              marginBottom: 2,
              letterSpacing: '0px'
            }}
          >
            New Collection
          </Typography>
          
          {/* Description - Inter Medium, 16px, Line Height 147.5% */}
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#ffffff', 
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: { xs: '14px', sm: '15px', md: '16px' },
              fontWeight: 500, // Medium
              marginBottom: 3,
              lineHeight: '147.5%', // 1.475
              letterSpacing: '0px',
              maxWidth: '90%'
            }}
          >
            Explore our exquisite collection of authentic gemstones, each rich in cultural heritage and natural beauty.
          </Typography>
          
          <QadeemButton
            variant="contained"
            sx={{
              backgroundColor: '#ffffff',
              color: '#000000',
              px: { xs: 3, sm: 3.5, md: 4 },
              py: { xs: 1, sm: 1.25, md: 1.5 },
              fontSize: { xs: '0.9375rem', sm: '1rem', md: '1.0625rem' },
              fontWeight: 700,
              borderRadius: 0,
              width: 'fit-content',
              minWidth: { xs: '110px', sm: '130px', md: '150px' },
              '&:hover': {
                backgroundColor: '#f5f5f5',
              }
            }}
          >
            Shop Now
          </QadeemButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}