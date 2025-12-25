import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";
// import logo from "/public/assets/images/logo.jpeg";
import logo from "../../../../../public/assets/images/logo.jpeg";

// CUSTOM ICON COMPONENTS
import Globe from "icons/Globe";
import Toggle from "icons/Toggle";

// LOCAL CUSTOM HOOKS
import { useLayout } from "../dashboard-layout-context";

// STYLED COMPONENTS
import { CustomButton, ToggleWrapper } from "./styles";
export default function LeftContent() {
  const {
    handleOpenMobileSidebar
  } = useLayout();
  return <Fragment>
      <ToggleWrapper onClick={handleOpenMobileSidebar}>
        <Toggle />
      </ToggleWrapper>
          <Link href="/home" style={{ display: 'block', maxWidth: '100%' }}>
            <Image 
              src={logo} 
              alt="logo" 
              width={105}
              height={50}
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
              sizes="(max-width: 600px) 80px, 105px"
            />
          </Link>
       
      {/* <CustomButton LinkComponent={Link} href="/" startIcon={<Globe sx={{
      color: "grey.900"
    }} />}>
        Browse Website
      </CustomButton> */}
    </Fragment>;
}