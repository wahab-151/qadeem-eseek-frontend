import Image from "next/image";
import Typography from "@mui/material/Typography";

// CUSTOM COMPONENTS
import FlexRowCenter from "components/flex-box/flex-row-center";

// IMPORT IMAGES
import logo from "../../../../public/assets/images/logo.jpeg";
import Link from "next/link";
export default function LogoWithTitle() {
  return <FlexRowCenter flexDirection="column" mb={4}>
     <Link href="/home" style={{ display: 'block', maxWidth: '100%', width: 'fit-content' }}>
       <Image 
         src={logo} 
         alt="SIFRA" 
         height={100} 
         width={200}
         style={{
           maxWidth: '100%',
           height: 'auto',
           objectFit: 'contain'
         }}
         sizes="(max-width: 600px) 150px, (max-width: 960px) 180px, 200px"
       />
     </Link>
      <Typography variant="h6">Your access to wholesale rates</Typography>
    </FlexRowCenter>;
}