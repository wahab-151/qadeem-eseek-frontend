import Search from "@mui/icons-material/Search";
import FlexBox from "components/flex-box/flex-box";
import Link from "next/link";

import Globe from "icons/Globe";

// LOCAL CUSTOM COMPONENTS
import AccountPopover from "./account-popover";
import NotificationsPopover from "./notification-popover";

// STYLED COMPONENTS
import { CustomButton, StyledInputBase } from "./styles";
export default function RightContent() {
  return <FlexBox alignItems="center" gap={2}>
      <StyledInputBase placeholder="Search anything..." startAdornment={<Search sx={{
      color: "grey.500"
    }} />} />
 {/* <CustomButton LinkComponent={Link} href="/" startIcon={<Globe sx={{
      color: "grey.900"
    }} />}>
        Browse Website
      </CustomButton>  */}



      <NotificationsPopover />
      <AccountPopover />
    </FlexBox>;
}