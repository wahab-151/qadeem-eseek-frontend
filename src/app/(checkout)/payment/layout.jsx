import Container from "@mui/material/Container";
import Steppers from "../steppers";
export default function Layout({
  children
}) {
  return <Container className="mt-2 mb-2">
      <Steppers />
      {children}
    </Container>;
}