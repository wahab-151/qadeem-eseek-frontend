import Container from "@mui/material/Container";
import Steppers from "../steppers";
export default function Layout({
  children
}) {
  return <Container 
    className="mt-2 mb-2"
    maxWidth="xl"
    sx={{
      px: { xs: 1, sm: 2, md: 3 }
    }}
  >
      <Steppers />
      {children}
    </Container>;
}