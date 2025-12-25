import Image from "next/image";

// GLOBAL CUSTOM COMPONENT
import FlexBetween from "components/flex-box/flex-between";

// LOCAL CUSTOM HOOK
import { useLayout } from "../dashboard-layout-context";

// STYLED COMPONENT
import { ChevronLeftIcon } from "./styles";
export default function LogoArea() {
  const {
    TOP_HEADER_AREA,
    COMPACT,
    sidebarCompact,
    handleSidebarCompactToggle
  } = useLayout();
  return <FlexBetween p={2} maxHeight={TOP_HEADER_AREA} justifyContent={COMPACT ? "center" : "space-between"}>
      <Image 
        alt="SIFRA Logo" 
        src={COMPACT ? "/assets/images/logo.jpeg" : "/assets/images/logo3.jpeg"} 
        width={105} 
        height={50} 
        style={{
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'contain',
          marginLeft: COMPACT ? 0 : 8
        }}
        sizes="(max-width: 600px) 80px, 105px"
      />

      <ChevronLeftIcon color="disabled" compact={COMPACT} onClick={handleSidebarCompactToggle} sidebar_compact={sidebarCompact ? 1 : 0} />
    </FlexBetween>;
}