import { forwardRef } from "react";

// MUI ICON COMPONENTS
import ChevronRight from "@mui/icons-material/ChevronRight";

// STYLED COMPONENT
import { RootContainer } from "./styles";


// =================================================================


// =================================================================

const AccordionHeader = forwardRef((props, ref) => {
  const {
    showIcon = true,
    open = false,
    children,
    sx,
    ...others
  } = props;
  return <RootContainer ref={ref} open={open} sx={sx} {...others}>
      {children}
      {showIcon && <ChevronRight className="caret" fontSize="small" />}
    </RootContainer>;
});

AccordionHeader.displayName = 'AccordionHeader';
export default AccordionHeader;