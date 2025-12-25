'use client'
// MUI
import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";

// GLOBAL CUSTOM COMPONENT
import FlexRowCenter from "components/flex-box/flex-row-center";
import LogoWithTitle from "pages-sections/sessions/components/logo-title";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { Link } from "@mui/material";

export default function Layout({
  children
}) {
  const router=useRouter()
  return <FlexRowCenter flexDirection="column" minHeight="100vh" px={2}>
      <Card elevation={3} sx={{
      maxWidth: 500,
      padding: "2rem 3rem",
      width: "100%",
     position: "relative" 
    }}>
       <IconButton
            aria-label="close"
            onClick={() => router.push('/home')}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.primary[500],
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
        <LogoWithTitle />
        {children}
        <FlexRowCenter mt={3} justifyContent="center" gap={1}>
        Don&apos;t have an account?
        <Link href="/register">Register</Link>
      </FlexRowCenter>
      </Card>
    </FlexRowCenter>;
}