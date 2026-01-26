import Switch from "@mui/material/Switch";
import styled from "@mui/material/styles/styled";


// STYLED COMPONENT
const StyledSwitch = styled(Switch)(({
  theme
}) => ({
  padding: 8,
  "& .MuiSwitch-switchBase.MuiButtonBase-root": {
    backgroundColor: "transparent"
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    borderRadius: 22 / 2,
    backgroundColor: "#D4C4A0", // Light heritage gold
    "&:before, &:after": {
      width: 16,
      height: 16,
      top: "50%",
      content: '""',
      position: "absolute",
      transform: "translateY(-50%)"
    }
  },
  "& .MuiSwitch-thumb": {
    width: 16,
    height: 16,
    margin: "2px",
    boxShadow: "none",
    backgroundColor: "#6B5D4F" // Medium brown
  },
  "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
    backgroundColor: "#8B7548" // Heritage bronze when checked
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "rgba(139, 117, 72, 0.3)", // Light bronze track when checked
    opacity: 1,
  }
}));
export default function EseekGoSwitch(props) {
  return <StyledSwitch {...props} />;
}