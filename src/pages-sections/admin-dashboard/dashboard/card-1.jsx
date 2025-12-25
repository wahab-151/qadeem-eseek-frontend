import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

// MUI ICON COMPONENTS
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";


// ========================================================


// ========================================================

export default function Card1(props) {
  const {
    title,
    amount1,
    amount2,
    percentage,
    status = "up",
    color = "info.main"
  } = props;
  return <Card className="p-1" sx={{
    border: '1px solid',
    borderColor: 'divider',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      borderColor: 'primary.main',
      boxShadow: 3
    }
  }}>
      <Typography variant="h6" sx={{
      mb: 1,
      color: "grey.600"
    }}>
        {title}
      </Typography>

      <Typography variant="h3" sx={{
      mb: 0.3
    }}>
        {amount1}
      </Typography>

      <FlexBetween>
        <Typography variant="h6" sx={{
        color: "grey.500"
      }}>
          {amount2}
        </Typography>

        <FlexBox alignItems="center" color={color}>
          {status === "up" && <ArrowDropUp />}
          {status === "down" && <ArrowDropDown />}
          <Typography variant="body1" sx={{
          fontSize: 12
        }}>
            {percentage}
          </Typography>
        </FlexBox>
      </FlexBetween>
    </Card>;
}