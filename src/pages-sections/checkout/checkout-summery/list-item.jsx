import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import FlexBetween from "components/flex-box/flex-between";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";


// ==============================================================


// ==============================================================

export default function ListItem({
  title,
  value,
  mb = 0.5,
  color = "grey.600",
  titleSx,
  valueSx,
}) {
  return (
    <FlexBetween mb={mb}>
      <Typography
        variant="body1"
        //   sx={{
        //   color
        // }}
        sx={titleSx}
      >
        {title}:
      </Typography>
      <Typography variant="h6" sx={valueSx}>
        {value ? currency(value) : "-"}
      </Typography>
    </FlexBetween>
  );
}