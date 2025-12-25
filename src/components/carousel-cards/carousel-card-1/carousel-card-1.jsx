import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";

// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";

// STYLED COMPONENT
import { StyledRoot } from "./styles";
import { Box } from "@mui/material";


// ==================================================

// export default function CarouselCard1({
//   title,
//   imgUrl,
//   buttonLink,
//   buttonText,
//   description,
//   buttonColor = "primary",
//   index
// }) {
//   const isEven = index % 2 === 0;
 
//      return <StyledRoot>
//       <Grid
//         container
//         spacing={3}
//         alignItems="center"
//         sx={{ width: "100%" }}
//         direction={isEven ? "row" : "row-reverse"}
//       >
//         <Grid item className="grid-item" xs={12} sm={6} md={5} xl={5}  sx={{
//     maxWidth: {
//       xs: "100%",  // for below md
//       md: "47%",   // for md and up
//     },
//   }}>
//           <h1 className="title">{title}</h1>
//           <p className="description">{description}</p>
//           <Button
//             size="large"
//             disableElevation
//             href={buttonLink}
//             color={buttonColor}
//             variant="contained"
//             className="button-link"
//           >
//             {buttonText}
//           </Button>
//         </Grid>

//         <Grid item xs={12} sm={6} md={7} xl={8} className="imagesDiv">
//           <div className="img-wrapper multiple">
//             {imgUrl.map((src, i) => (
//               <LazyImage
//                 key={i}
//                 src={src}
//                 alt={`${title}-${i}`}
//                 width={0}
//                 height={0}
//                 sizes="100vw"
//                 className="multi-img"
//               />
//             ))}
//           </div>
//         </Grid>
//       </Grid>
//     </StyledRoot>
  
// }

//banner image only
export default function CarouselCard1({ src, index = 0 }) {
  return (
    <Box sx={{
      width: "100%",
      height: { xs: 300, sm: 300, md: 500 },
      position: "relative",
      overflow: "hidden",
      borderRadius: '25px'
    }}>
      <LazyImage
        key={src}
        src={src}
        alt={`Eseek banner ${index + 1}`}
        fill
        sizes="100vw"
        priority={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        decoding={index === 0 ? "sync" : "async"}
      />
    </Box>
  );
}