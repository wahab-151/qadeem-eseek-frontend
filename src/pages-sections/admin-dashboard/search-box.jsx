import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import debounce from "lodash/debounce";

// MUI
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";

// GLOBAL CUSTOM COMPONENTS
import SearchInput from "components/SearchInput";
import FlexBox from "components/flex-box/flex-box";


// ===============================================================


// ===============================================================

export default function SearchArea({
  url = "/",
  buttonText = "Add Product",
  searchPlaceholder = "Search Product...",
    onSearchChange,
    showButton=true,
    rightSlot=null
}) {
  const router = useRouter();
  const pathname = usePathname();
  const downSM = useMediaQuery(theme => theme.breakpoints.down("sm"));

  // const handleSearch = debounce(value => {
  //   if (value) router.push(`?q=${value}`);else router.push(pathname);
  // }, 100);

   const handleSearch = debounce(value => {
    if (onSearchChange) {
      onSearchChange(value); // 👈 update the parent state directly
    } else {
      if (value) router.push(`?q=${value}`);
      else router.push(pathname);
    }
  }, 300); // adjust debounce time if needed




  return <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
    <div></div>
      {/* <SearchInput placeholder={searchPlaceholder} onChange={e => handleSearch(e.target.value)} /> */}

      <FlexBox gap={2}>
        { showButton && <Button 
          href={url} 
          color="primary" 
          fullWidth={downSM} 
          variant="contained" 
          startIcon={<Add />} 
          LinkComponent={Link} 
          sx={{
            minHeight: 44,
            backgroundColor: '#8B7548', // Heritage bronze
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#6B5D4F', // Darker brown on hover
            }
          }}
        >
          {buttonText}
        </Button>}
        {rightSlot}
      </FlexBox>
    </FlexBox>;
}