// import { Fragment } from "react";

// // STYLED COMPONENTS
// import { Heading, StyledLink } from "./styles";


// // ==============================================================


// // ==============================================================

// export default function FooterLinksWidget({
//   isDark,
//   links,
//   title
// }) {
//   return <Fragment>
//       <Heading>{title}</Heading>

//       {links.map((item, ind) => <StyledLink isDark={isDark} href={item.url} key={ind}>
//           {item.title}
//         </StyledLink>)}
//     </Fragment>;
// }



import { Fragment } from "react";

// STYLED COMPONENTS
import { Heading, StyledLink } from "./styles";


// ==============================================================


// ==============================================================

export default function FooterLinksWidget({
  isDark,
  links,
  title
}) {
  return <Fragment >
      <Heading sx={{
    color:"secondary.main",
 
      cursor: "pointer",
      transition: "color 0.3s",
      "&:hover": {
        color: "primary.main",
      },
   
  }}>{title}</Heading>

      {links.map((item, ind) => <StyledLink sx={{
    color:"black",
 
      cursor: "pointer",
    
      transition: "color 0.3s",
      "&:hover": {
        color: "primary.main",
          fontWeight:700,
      },
  }} isDark={isDark} href={item.url} key={ind}>
          {item.title}
        </StyledLink>)}
    </Fragment>;
}