// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { Fragment, useCallback, useEffect, useState } from "react";
// import Typography from "@mui/material/Typography";
// // GLOBAL CUSTOM COMPONENTS
// import {
//   Footer1,
//   FooterApps,
//   FooterContact,
//   FooterLinksWidget,
//   FooterSocialLinks,
// } from "components/footer";
// import Sticky from "components/sticky";
// import { CategoryList } from "components/categories";
// import { Navbar, NavigationList } from "components/navbar";
// import { MobileMenu } from "components/navbar/mobile-menu";
// import { MobileNavigationBar } from "components/mobile-navigation";
// import { Header, HeaderCart, HeaderLogin } from "components/header";
// import { MobileHeader, HeaderSearch } from "components/header/mobile-header";
// import {
//   Topbar,
//   TopbarLanguageSelector,
//   TopbarSocialLinks,
// } from "components/topbar";
// import { SearchInput, SearchInputWithCategory, MobileSearchInput } from "components/search-box";
// import {
//   footer,
//   header,
//   topbar,
//   mobileNavigation,
//   logoUrl,
//   footerSocialLinks,
//   footerContact,
//   footerCustomerCareLinks,
//   footerAboutLinks,
//   footerDescription,
//   footerData,
// } from "../../../utils/constants";
// import {
//   convertToCategoryListByDisplayOrder,
//   findBreadcrumbPath,
//   transformCategoriesForMegaMenu,
// } from "utils/helpers";
// import {
//   useGetAllProductsQuery,
//   useGetMegaMenuCategoriesQuery,
//   useGetSpecialProductsQuery,
//   useGetUserCartQuery,
//   useGetWebsiteInfoQuery,
//   useUpdateCartMutation,
// } from "app/store/services";
// import { useSnackbar } from "notistack";
// import AccountPopover from "../vendor-dashboard/dashboard-navbar/account-popover";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Container,
//   Stack,
//   useTheme,
// } from "@mui/material";
// import useProducts from "hooks/useProducts";
// import {
//   languageOptions,
//   topbarSocialLinks,
// } from "data/layout-data";
// import DeliveryCutoffDropdown from "components/DeliveryDropdown/DeliveryDropdown";
// import useCart from "hooks/useCart";
// import useCategoriesMegaMenu from "hooks/useCategoriesMegaMenu";
// import BreadcrumbNav from "components/BreadcrumbsNav";
// import {
//   useParams,
//   useRouter,
//   usePathname,
//   useSearchParams,
// } from "next/navigation";
// import useUser from "hooks/useUser";
// import useWebsiteInfo from "hooks/useWebsiteInfo";
// import PhoneIcon from "@mui/icons-material/Phone";
// import ContactButton from "components/contactUsButton/contactUsButton";
// import FloatingWhatsApp from "components/whatsapp/FloatingWhatsApp";

// // import { navigationBackendrespo } from "utils/constants";

// // CUSTOM DATA MODEL
// // ==============================================================
// // ==============================================================

// export default function ShopLayout1({
//   children,
//   // data
// }) {
//   const { enqueueSnackbar } = useSnackbar();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [user, setUser] = useState(null);
//   const [breadcrumb, setBreadcrumb] = useState([]);
//   const params = useParams(); // dynamic segments like [id]
//   const searchParams = useSearchParams(); // query params like ?category=...

//   const [shouldShowBreadcrumb, setShouldShowBreadcrumb] = useState(false);

//   const { state: userState, dispatch: userDispatch } = useUser();

//   const { state, dispatch } = useProducts();

//   const { state: cartState, dispatch: cartDispatch } = useCart();

//   const { state: megaMenuState, dispatch: megaMenuDispatch } =
//     useCategoriesMegaMenu();
//   // Use website info context state to avoid repeated fetches
//   const { state: websiteInfoState, dispatch: webInfoDispatch } = useWebsiteInfo();

//   // New: route-aware checks to limit heavy global queries on specific pages
//   const isAllProductsPage = pathname === "/allProducts";
//   const isProductPage = pathname.startsWith("/products/");

//   // Old flags (kept for easy revert)
//   // const shouldFetchMegaMenu = !megaMenuState?.megaMenuList?.length;
//   // const shouldFetchProducts = !state?.products?.length;
//   // const shouldFetchCart = !cartState.cart?.length;
//   // const shouldFetchSpecialProducts = !cartState.mostSold?.length;

//   // New flags: avoid duplicate global products fetch and defer specials on /allProducts
//   const shouldFetchMegaMenu = !megaMenuState?.megaMenuList?.length;
//   const shouldFetchProducts = !isAllProductsPage && !isProductPage && !state?.products?.length;
//   const shouldFetchCart = !cartState.cart?.length;
//   const shouldFetchSpecialProducts = !isAllProductsPage && !isProductPage && !cartState.mostSold?.length;
//   // Fetch website info only once when not already in context
//   const shouldFetchWebsiteInfo = !websiteInfoState?.description && !websiteInfoState?.contact?.email;

//   const {
//     data,
//     error,
//     isLoading,
//     refetch: refetchMegaMenu,
//     isUninitialized: isMegaMenuUninitialized,
//   } = useGetMegaMenuCategoriesQuery(undefined, {
//     skip: !shouldFetchMegaMenu,
//   });

//   const {
//     data: getProducts,
//     isLoading: productLoading,
//     error: productError,
//     refetch: refetchProducts,
//     isUninitialized: isProductsUninitialized,
//   } = useGetAllProductsQuery(undefined, {
//     skip: !shouldFetchProducts,
//   });

//   const {
//     data: specialProducts,
//     isLoading: specialProductLoading,
//     error: specialProductError,
//     refetch: refetchSpecialProducts,
//     isUninitialized: isSpecialUninitialized,
//   } = useGetSpecialProductsQuery(undefined, {
//     skip: !shouldFetchSpecialProducts,
//   });

//   // Only fetch website info once; subsequent renders use context
//   const {
//     data: websiteInfo,
//     isLoading: websiteInfoLoading,
//     error: websiteInfoError,
//     refetch: refetchWebsiteInfo,
//     isUninitialized: isWebsiteInfoUninitialized,
//   } = useGetWebsiteInfoQuery(undefined, { skip: !shouldFetchWebsiteInfo });
//   const {
//     description: footerDescription,
//     aboutUs,
//     shippingReturnPolicy,
//     privacyPolicy,
//     termsConditionsPolicy,
//     contact: footerContact,
//     socialLinks: footerSocialLinks,
//   } = websiteInfo?.data?.content || {};

//   // console.log("webInfo", websiteInfo?.data?.content )

//   //breadcumb visibility
//   useEffect(() => {
//     const isProductPage = pathname.startsWith("/products/");
//     const isAllProductsPage = pathname === "/allProducts";
//     setShouldShowBreadcrumb(breadcrumb && (isProductPage || isAllProductsPage));
//   }, [pathname, breadcrumb]);

//   // Only call the query if user is logged in
//   const {
//     data: cartData,
//     isLoading: cartLoading,
//     error: cartError,
//   } = useGetUserCartQuery(userState?.user?.id, {
//     skip: !userState?.user?.id,
//   });

//   const [isFixed, setIsFixed] = useState(false);
//   const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);

//   //website info useEffect

//   const theme = useTheme();
//   useEffect(() => {
//     if (websiteInfo?.data?.content) {
//       const {
//         description,
//         aboutUs,
//         shippingAndReturnPolicy,
//         privacyPolicy,
//         termsAndConditions,
//         contact,
//         socialLinks,
//         bulkPurchasing,
//       } = websiteInfo.data.content;

//       // console.log("webInfo useEffect", websiteInfo.data.content);

//       webInfoDispatch({
//         type: "SET_WEBSITE_INFO",
//         payload: {
//           description,
//           aboutUs,
//           shippingAndReturnPolicy,
//           privacyPolicy,
//           termsAndConditions,
//           contact,
//           socialLinks,
//           bulkPurchasing,
//         },
//       });
//     }
//   }, [websiteInfo, webInfoDispatch]);

//   //megamenu useEffect

//   useEffect(() => {
//     if (!megaMenuState?.megaMenuList) return;

//     const menu = megaMenuState?.megaMenuList;
//     const categoryId = searchParams.get("category");
//     const productId = params?.slug;

//     // console.log("💡 useEffect triggered:", { categoryId, productId });

//     if (categoryId) {
//       const path = findBreadcrumbPath(menu, categoryId);
//       // console.log("📂 Breadcrumb for category", path);
//       setBreadcrumb(path);
//     } else if (productId) {
//       const path = findBreadcrumbPath(menu, productId);
//       // console.log("📂 Breadcrumb for product", path);
//       setBreadcrumb(path);
//     }
//   }, [searchParams, params, megaMenuState?.megaMenuList]);

//   // useEffect(() => {
//   //     if (typeof window !== "undefined" && router.isReady)
//   //  {
//   //       const authUser = sessionStorage.getItem("auth-user");
//   //       const parsedUser = authUser ? JSON.parse(authUser) : null;
//   // console.log("auth effect", parsedUser, userState?.user, router.pathname);
//   //       // ✅ Redirect if user already exists and you're on login and set if user set
//   //       if (parsedUser) {
//   //         console.log("auth user found");
//   //         setUser(parsedUser);

//   //         if (userState?.user == null && parsedUser?.id) {
//   //           console.log("auth dispatch called in layout");
//   //           userDispatch({ type: "SET_USER", payload: parsedUser });
//   //         }
//   //          if (router.pathname === "/login") router.push("/home");
//   //       } else {
//   //         setUser(null);
//   //         cartDispatch({ type: "CLEAR_CART" });
//   //       }
//   //     }
//   //   }, [router.isReady]);

//   const [redirecting, setRedirecting] = useState(false);

//   useEffect(() => {
//     // console.log("auth useEffect running");

//     const authUser = sessionStorage.getItem("auth-user");
//     const parsedUser = authUser ? JSON.parse(authUser) : null;

//     // console.log("auth effect", parsedUser, userState?.user, pathname);

//     // ✅ Redirect if user exists and on /login
//     if (parsedUser && pathname === "/login") {
//       console.log("Redirecting to /home...");
//       setRedirecting(true); // this blocks rendering
//       // router.push("/home");
//       router.replace("/home");
//       return;
//     }
   

//     if (parsedUser) {
//       // console.log("auth user found");
//       setUser(parsedUser);

//       if (!userState?.user && parsedUser?.id) {
//         // console.log("dispatching user");
//         userDispatch({ type: "SET_USER", payload: parsedUser });
//       }
//     } else {
//       // console.log("No user found, clearing user and cart");
//       setUser(null);
//       cartDispatch({ type: "CLEAR_CART" });
//     }
//   }, [pathname]);


  
//   const cartDataRecieved = cartData?.data?.items?.length > 0;

//   const cartAlreadySet = cartState.cart?.length > 0;
//   // console.log("cartAlreadySet ", cartState, cartData);

//   // Function to generate dynamic Google Maps embed URL
//   const generateMapEmbedUrl = (address) => {
//     if (!address) return "";
//     const encodedAddress = encodeURIComponent(address);
//     // Use a simpler, more reliable Google Maps embed URL
//     return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}`;
//   };

//   //this code for cart is for loggin user only

//   useEffect(() => {
//     // console.log("cart data from query", cartData, cartDataRecieved);
//     // console.log(
//     //   "cart condition",
//     //   cartDataRecieved,
//     //   !cartAlreadySet,
//     //   user,
//     //   userState?.user
//     // );
//     //for logged in user
//     if (cartDataRecieved && !cartAlreadySet && user) {
//       // console.log("1111111111111111");
//       cartData?.data?.items?.forEach((item) => {
//         console.log("cart triggered layout", item);
//         cartDispatch({
//           type: "CHANGE_CART_AMOUNT",
//           payload: {
//             id: item?.id,
//             cartId: item?.cartId,
//             slug: item?.title,
//             price: item?.price,
//             title: item?.title,
//             thumbnail: item?.thumbnail,
//             qty: item?.quantity,
//             category: item?.category,
//           },
//         });
//       });
//     }

//     if (cartError) {
//       enqueueSnackbar("Cart Fetch failed!", { variant: "error" });
//     }
//   }, [cartDataRecieved, cartLoading, cartError]);

//   const categoriesReady = data?.data?.length > 0;
//   const productsReady = getProducts?.data?.products?.length > 0;
//   const productsAlreadySet = state.products?.length > 0;

//   //useEffect to set products and main categories
//   useEffect(() => {
//     // console.log("DATA SET ", data?.data?.length ,getProducts?.data?.products,state.products);
//     if (categoriesReady && productsReady && !productsAlreadySet) {
//       const categoryList = convertToCategoryListByDisplayOrder(data.data);
//       const categoryNavigation = transformCategoriesForMegaMenu(data.data);
//       // console.log("category 111", categoryList,categoryNavigation);

//       dispatch({
//         type: "SET_PRODUCTS",
//         payload: getProducts?.data.products,
//       });
//       // dispatch({
//       //   type: "SET_MOST_SOLD",
//       //   payload: getProducts?.data.mostSold,
//       // });
//       // dispatch({
//       //   type: "SET_MOST_POPULAR",
//       //   payload: getProducts?.data.mostPopular,
//       // });
//       // dispatch({
//       //   type: "SET_FEATURED",
//       //   payload: getProducts?.data.featured,
//       // });
//       dispatch({
//         type: "PAGINATION",
//         payload: getProducts?.data.pagination,
//       });

//       // 🔄 Set values in CategoryMegaMenu context
//       megaMenuDispatch({
//         type: "SET_MAIN_CATEGORIES_LIST",
//         payload: categoryList,
//       });

//       megaMenuDispatch({
//         type: "SET_MEGAMENU_LIST",
//         payload: categoryNavigation,
//       });
//     }

//     if (error || productError) {
//       enqueueSnackbar("Navigation failed!", { variant: "error" });
//     }
//   }, [
//     // data?.data?.length,
//     categoriesReady,
//     productsReady,
//     // getProducts,
//     error,
//     productError,
//     isLoading,
//   ]);

//   //useEffect to set special products
//   useEffect(() => {
//     if (specialProducts?.data?.products?.mostSold?.length > 0) {
//       // console.log("specialProducts received", specialProducts?.data?.products);
//       dispatch({
//         type: "SET_MOST_SOLD",
//         payload: specialProducts?.data?.products.mostSold,
//       });
//       dispatch({
//         type: "SET_MOST_POPULAR",
//         payload: specialProducts?.data?.products.mostPopular,
//       });
//       dispatch({
//         type: "SET_FEATURED",
//         payload: specialProducts?.data?.products.featured,
//       });
//     }
//     if (specialProductError) {
//       enqueueSnackbar("Special Products Fetch failed!", { variant: "error" });
//     }
//   }, [specialProducts, specialProductError, specialProductLoading]);

//   // Refetch role-based data when auth changes (login or logout)
//   useEffect(() => {
//     // Refetch website info in case any role-based content exists (safe no-op if server ignores role)
//     if (!isWebsiteInfoUninitialized) refetchWebsiteInfo && refetchWebsiteInfo();

//     // Always refetch products/special products on auth changes to get correct pricing
//     if (!isProductsUninitialized) refetchProducts && refetchProducts();
//     if (!isSpecialUninitialized) refetchSpecialProducts && refetchSpecialProducts();
//   }, [userState?.user?.id]);


//   if (pathname === "/login" && redirecting) {
//     return null; // show nothing while redirecting
//   }

//   const MOBILE_VERSION_HEADER = (
//     <MobileHeader>
//       <MobileHeader.Left>
//         <MobileMenu navigation={megaMenuState?.megaMenuList} /> 
//       </MobileHeader.Left>
//       <MobileHeader.Logo logoUrl={logoUrl} />
//       <MobileHeader.Right>
//         <HeaderSearch>
//           <MobileSearchInput />
//         </HeaderSearch>
//         {/* <HeaderLogin /> */}
//         <AccountPopover />
//         <HeaderCart />
//       </MobileHeader.Right>
//     </MobileHeader>
//   );
//   return (
//     <Fragment>
//       {/* TOP BAR SECTION */}
//       <Topbar data={{
//         title: websiteInfo?.data?.content?.promotionalDetails?.title || websiteInfo?.data?.content?.tickerTitle,
//         label: websiteInfo?.data?.content?.promotionalDetails?.label || websiteInfo?.data?.content?.tickeLable
//       }}>
//         <Topbar.Right>
//           {/* {/* <TopbarLanguageSelector languages={languageOptions} />  */}
//           {/* delivery dropdown and contact */}
//           <DeliveryCutoffDropdown />
//           <ContactButton />

//           {/* <TopbarSocialLinks links={topbarSocialLinks} /> */}
//         </Topbar.Right>
//       </Topbar>
//       {/* HEADER (non-sticky) */}
//       <Header mobileHeader={MOBILE_VERSION_HEADER}>
//         <Header.Logo url={logoUrl} />
//         {isFixed ? (
//           <Header.CategoryDropdown>
//             <CategoryList categories={megaMenuState?.categoriesList} />
//           </Header.CategoryDropdown>
//         ) : null}
//         <Header.Mid>
//           {/* {isLoading ? (
//             <CircularProgress size={24} />
//           ) : categories ? ( */}
//           <SearchInputWithCategory
//             categories={megaMenuState?.categoriesList}
//             refetchMegaMenu={refetchMegaMenu}
//           />
//           {/* ) : (
//             ""
//           )} */}
//         </Header.Mid>
//         <Header.Right>
//           {/* HEADER LOGIN BUTTON */}
//           {/* <HeaderLogin /> */}
//           <AccountPopover />
//           {/* HEADER CART BUTTON */}
//           <HeaderCart />
//         </Header.Right>
//       </Header>

//       {/* NAVIGATION BAR (sticky) */}
//       <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
//         <Navbar
//           border={1}
//           elevation={0}
//           navigation={megaMenuState?.megaMenuList}
//           isLoading={isLoading}
//           // categories={<CategoryList categories={header.categoryMenus} />}
//         />
//       </Sticky>

//       {breadcrumb && shouldShowBreadcrumb && (
//         <BreadcrumbNav breadcrumb={breadcrumb} />
//       )}
//       {/* BODY CONTENT */}
//       {children}
//       {/* SMALL DEVICE BOTTOM NAVIGATION-bottomsheet */}
//       <MobileNavigationBar navigation={mobileNavigation} />
     
//       {/* Floating WhatsApp Button - At the end of Fragment to float above everything */}
//       <FloatingWhatsApp phone={footerContact?.phone} />
     
//       {/* FOOTER SECTION */}
//       <Footer1>
//         <Box
//           display={"flex"}
//           gap={2}
//           sx={{
//             flexDirection: {
//               xs: "column", // Default is row
//               sm: "column", // Column on small screens
//               md: "row", // Column on medium screens
//               lg: "row", // Back to row on large screens
//             },
//             width: "100%",
//             alignItems: "center",
//           }}
//         >
//           {/* Map iframe - full width */}
//           <Box
//             sx={{
//               width: "400px",
//               height: 300,
//               mt: 3,
//               p: 1,
//               position: "relative",
//               borderRadius: 1,
//               overflow: "hidden",
//               border: `2px solid ${theme.palette.secondary.main}`,
//               backgroundColor: theme.palette.secondary.main,
//             }}
//           >
//             <iframe
//               src={generateMapEmbedUrl(footerContact?.address)}
//               width="100%"
//               height="100%"
//               style={{ border: 0 }}
//               allowFullScreen
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               title="eSeekMap Location"
//             />
//           </Box>
//           <Footer1.Brand
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "flex-start",
//               width: "100%",
//             }}
//           >
//             {/* Logo at the top */}
//             <Link href="/" style={{ marginBottom: "16px" }}>
//               <Image
//                 src={logoUrl}
//                 alt="logo"
//                 width={105}
//                 height={50}
//                 style={{ display: "block" }}
//               />
//             </Link>

//             {/* Description text below map */}
//             <Typography
//               variant="body1"
//               sx={{
//                 color: "grey.500",
//                 maxWidth: 370,
//                 textAlign: "left",
//                 color: "black",
//               }}
//             >
//               {footerDescription}
//             </Typography>
//           </Footer1.Brand>

//           <Footer1.Widget1>
//             <FooterLinksWidget title="About Us" links={footerAboutLinks} />
//           </Footer1.Widget1>

//           <Footer1.Widget2>
//             <FooterLinksWidget
//               title="Customer Care"
//               links={footerCustomerCareLinks}
//             />
//           </Footer1.Widget2>

//           <Footer1.Contact>
//             <FooterContact
//               phone={footerContact?.phone}
//               email={footerContact?.email}
//               address={footerContact?.address}
//             />
//             {/* <FooterSocialLinks links={footerSocialLinks} /> */}
//           </Footer1.Contact>
//         </Box>
//         {/* Social Media Icons and Copyright */}
//         <Box
//           sx={{
//             width: "100%",
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between", // This will push items to opposite ends
//             flexWrap: "wrap", // Allow items to wrap on smaller screens
//             // py: 3,
//             borderTop: "1px solid",
//             borderColor: "divider",
//             color: "black",
//           }}
//         >
//           {/* Copyright Text - Left Aligned */}
//           <Typography variant="body2" color="secondary">
//             Copyright © {new Date().getFullYear()} SIFRA. All rights
//             reserved.
//           </Typography>

//           {/* Right Aligned Group (Privacy Links + Social Icons) */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 3, // Space between privacy links and social icons
//             }}
//           >
//             {/* Privacy Links */}
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <Link href="/privacyPolicy" passHref>
//                 <Typography
//                   variant="body2"
//                   color="secondary"
//                   sx={{
//                     cursor: "pointer",
//                     transition: "color 0.3s",
//                     "&:hover": {
//                       color: "primary.main",
//                       fontWeight: 700,
//                     },
//                   }}
//                 >
//                   Privacy
//                 </Typography>
//               </Link>
//               <Typography variant="body2" color="black">
//                 |
//               </Typography>
//               <Link href="/t&c" passHref>
//                 <Typography
//                   variant="body2"
//                   color="secondary"
//                   sx={{
//                     cursor: "pointer",
//                     transition: "color 0.3s",
//                     "&:hover": {
//                       color: "primary.main",
//                       fontWeight: 700,
//                     },
//                   }}
//                 >
//                   Terms & Condition
//                 </Typography>
//               </Link>
//               {/* <Typography variant="body2" color="black">
//               |
//             </Typography>
//             <Typography variant="body2" color="secondary">
//               Cookie
//             </Typography> */}
//             </Box>

//             {/* Social Media Icons */}
//             <Box sx={{ display: "flex", gap: 1 }}>
//               {footerData?.paymentLinks.map((item, index) => (
//                 <Link
//                   href={item.href}
//                   key={index}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Image src={item.src} alt={item.alt} width={40} height={40} />
//                 </Link>
//               ))}
//             </Box>
//           </Box>
//         </Box>
//       </Footer1>
     
//     </Fragment>
//   );
// }


"use client";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import {
  Footer1,
  FooterApps,
  FooterContact,
  FooterLinksWidget,
  FooterSocialLinks,
} from "components/footer";
import { CategoryList } from "components/categories";
import { MobileMenu } from "components/navbar/mobile-menu";
import { MobileNavigationBar } from "components/mobile-navigation";
import { Header, HeaderCart, HeaderLogin } from "components/header";
import HeaderWishlist from "components/header/header-wishlist";
import HeaderLoginButton from "components/header/header-login-button";
import HeaderNavigation from "components/header/header-navigation";
import HeaderNavigationSkeleton from "components/header/header-navigation-skeleton";
import HeaderSearchButton from "components/header/header-search";
import HeaderSearchDropdown from "components/header/header-search-dropdown";
import MiniCartDrawer from "components/mini-cart-drawer/MiniCartDrawer";
import { MobileHeader, HeaderSearch } from "components/header/mobile-header";
import { SearchInput, SearchInputWithCategory, MobileSearchInput } from "components/search-box";
import {
  footer,
  header,
  topbar,
  mobileNavigation,
  logoUrl,
  footerSocialLinks,
  footerContact,
  footerCustomerCareLinks,
  footerAboutLinks,
  footerDescription,
  footerData,
} from "../../../utils/constants";
import {
  convertToCategoryListByDisplayOrder,
  findBreadcrumbPath,
  transformCategoriesForMegaMenu,
} from "utils/helpers";
import {
  useGetAllProductsQuery,
  useGetMegaMenuCategoriesQuery,
  useGetSpecialProductsQuery,
  useGetUserCartQuery,
  useGetWebsiteInfoQuery,
  useUpdateCartMutation,
} from "app/store/services";
import { useSnackbar } from "notistack";
import AccountPopover from "../vendor-dashboard/dashboard-navbar/account-popover";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  useTheme,
} from "@mui/material";
import useProducts from "hooks/useProducts";
import {
  languageOptions,
} from "data/layout-data";
import useCart from "hooks/useCart";
import useCategoriesMegaMenu from "hooks/useCategoriesMegaMenu";
import BreadcrumbNav from "components/BreadcrumbsNav";
import {
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import useGuardedRouter from "hooks/useGuardedRouter";
import useUser from "hooks/useUser";
import useWebsiteInfo from "hooks/useWebsiteInfo";
import useTrackLastVisitedPage from "hooks/useTrackLastVisitedPage";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FloatingWhatsApp from "components/whatsapp/FloatingWhatsApp";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { prefetchCommonRoutes, setupViewportPrefetching, setupHoverPrefetching } from "utils/prefetch";
import { setupRscDeduplication } from "utils/rsc-deduplication";
import performanceMonitor from "utils/performanceMonitor";

// import { navigationBackendrespo } from "utils/constants";

// CUSTOM DATA MODEL
// ==============================================================
// ==============================================================

export default function ShopLayout1(props) {
  // Destructure only the props we need to prevent unknown props from being passed to DOM
  const { children, data: layoutData } = props; // Rename data prop to avoid conflict with query data
  // Any other props (like PaperProps) are ignored, preventing React warnings
  const { enqueueSnackbar } = useSnackbar();
  const { replace } = useGuardedRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const params = useParams(); // dynamic segments like [id]
  const searchParams = useSearchParams(); // query params like ?category=...

  const [shouldShowBreadcrumb, setShouldShowBreadcrumb] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isMiniCartLoading, setIsMiniCartLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { state: userState, dispatch: userDispatch } = useUser();

  const { state, dispatch } = useProducts();

  const { state: cartState, dispatch: cartDispatch } = useCart();
  
  // Track last visited page for next login (customer side only)
  useTrackLastVisitedPage(!!userState?.user?.id, userState?.user?.role);

  const { state: megaMenuState, dispatch: megaMenuDispatch } =
    useCategoriesMegaMenu();
  // Use website info context state to avoid repeated fetches
  const { state: websiteInfoState, dispatch: webInfoDispatch } = useWebsiteInfo();

  // New: route-aware checks to limit heavy global queries on specific pages
  const isAllProductsPage = pathname === "/allProducts";
  const isProductPage = pathname.startsWith("/products/");
  const isCheckoutPage = pathname.startsWith("/checkout") || pathname.startsWith("/payment");

  // Old flags (kept for easy revert)
  // const shouldFetchMegaMenu = !megaMenuState?.megaMenuList?.length;
  // const shouldFetchProducts = !state?.products?.length;
  // const shouldFetchCart = !cartState.cart?.length;
  // const shouldFetchSpecialProducts = !cartState.mostSold?.length;

  // New flags: avoid duplicate global products fetch and defer specials on /allProducts
  // Skip heavy queries on checkout/payment pages for faster loading (but keep cart and website info)
  const isHomePage = pathname === "/home";
  const shouldFetchMegaMenu = !isCheckoutPage && !megaMenuState?.megaMenuList?.length;
  // Skip getAllProducts on home page and checkout pages - it only needs special products (mostSold, mostPopular, featured)
  // getAllProducts is only needed for product listing/search pages
  const shouldFetchProducts = !isCheckoutPage && !isAllProductsPage && !isProductPage && !isHomePage && !state?.products?.length;
  // Cart is still needed on checkout page, so don't skip it
  const shouldFetchCart = !cartState.cart?.length;
  const shouldFetchSpecialProducts = !isCheckoutPage && !isAllProductsPage && !isProductPage && !state.mostSold?.length;
  const {
    data,
    error,
    isLoading,
    refetch: refetchMegaMenu,
    isUninitialized: isMegaMenuUninitialized,
  } = useGetMegaMenuCategoriesQuery(undefined, {
    skip: !shouldFetchMegaMenu,
  });

  const {
    data: getProducts,
    isLoading: productLoading,
    error: productError,
    refetch: refetchProducts,
    isUninitialized: isProductsUninitialized,
  } = useGetAllProductsQuery(undefined, {
    skip: !shouldFetchProducts,
  });

  const {
    data: specialProducts,
    isLoading: specialProductLoading,
    error: specialProductError,
    refetch: refetchSpecialProducts,
    isUninitialized: isSpecialUninitialized,
  } = useGetSpecialProductsQuery(undefined, {
    skip: !shouldFetchSpecialProducts,
  });

  // Always run website info query - RTK Query will handle caching automatically
  // Remove skip condition to ensure query always runs and populates RTK Query cache
  // The query will use cached data if available, so no unnecessary network requests
  const {
    data: websiteInfo,
    isLoading: websiteInfoLoading,
    error: websiteInfoError,
    refetch: refetchWebsiteInfo,
    isUninitialized: isWebsiteInfoUninitialized,
  } = useGetWebsiteInfoQuery(undefined, { 
    // Don't skip - let RTK Query handle caching
    // It will use cached data if available, preventing unnecessary requests
    refetchOnMountOrArgChange: true, // Allow refetch to get fresh data when needed
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

 
  // Performance: Track website info API call when it starts loading
  useEffect(() => {
    if (websiteInfoLoading && !isWebsiteInfoUninitialized && typeof window !== 'undefined' && !window.__websiteInfoPerfId) {
      const perfId = performanceMonitor.start(
        `website-info-${Date.now()}`,
        'website-info-api',
        { pathname }
      );
      window.__websiteInfoPerfId = perfId;
    }
  }, [websiteInfoLoading, isWebsiteInfoUninitialized, pathname]);
  
  // Use context state as primary source, fallback to query data, then constants
  const footerDataFromQuery = websiteInfo?.data?.content || {};
  const finalFooterDescription = websiteInfoState?.description || footerDataFromQuery.description ;
  const finalFooterContact = websiteInfoState?.contact || footerDataFromQuery.contact ;
  const finalFooterSocialLinks = websiteInfoState?.socialLinks || footerDataFromQuery.socialLinks || footerSocialLinks;
  
  // Extract other fields with fallbacks
  const finalAboutUs = websiteInfoState?.aboutUs || footerDataFromQuery.aboutUs;
  const finalShippingReturnPolicy = websiteInfoState?.shippingAndReturnPolicy || footerDataFromQuery.shippingReturnPolicy;
  const finalPrivacyPolicy = websiteInfoState?.privacyPolicy || footerDataFromQuery.privacyPolicy;
  const finalTermsConditionsPolicy = websiteInfoState?.termsAndConditions || footerDataFromQuery.termsConditionsPolicy;

  // console.log("webInfo", websiteInfo?.data?.content )

  //breadcumb visibility
  useEffect(() => {
    const isProductPage = pathname.startsWith("/products/");
    const isAllProductsPage = pathname === "/allProducts";
    setShouldShowBreadcrumb(breadcrumb && (isProductPage || isAllProductsPage));
  }, [pathname, breadcrumb]);

  // Only call the query if user is logged in
  const {
    data: cartData,
    isLoading: cartLoading,
    error: cartError,
  } = useGetUserCartQuery(userState?.user?.id, {
    skip: !userState?.user?.id,
    refetchOnMountOrArgChange: !isCheckoutPage, // Allow refetch on checkout to get latest cart
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);

  //website info useEffect

  const theme = useTheme();
  useEffect(() => {
    if (websiteInfo?.data?.content) {
      // Performance tracking: End timing when data is received
      if (typeof window !== 'undefined' && window.__websiteInfoPerfId) {
        performanceMonitor.end(window.__websiteInfoPerfId, 'success', {
          hasHomepageBanners: !!websiteInfo.data.content.homepageBanners?.length,
          hasDescription: !!websiteInfo.data.content.description,
        });
        delete window.__websiteInfoPerfId;
      }

      const {
        description,
        aboutUs,
        shippingAndReturnPolicy,
        privacyPolicy,
        termsAndConditions,
        contact,
        socialLinks,
        bulkPurchasing,
        homepageBanners, // Include homepageBanners
      } = websiteInfo.data.content;

      // console.log("webInfo useEffect", websiteInfo.data.content);

      webInfoDispatch({
        type: "SET_WEBSITE_INFO",
        payload: {
          description,
          aboutUs,
          shippingAndReturnPolicy,
          privacyPolicy,
          termsAndConditions,
          contact,
          socialLinks,
          bulkPurchasing,
          homepageBanners: homepageBanners || [], // Include homepageBanners with fallback
        },
      });
    }
    if (websiteInfoError) {
      // Performance tracking: End timing on error
      if (typeof window !== 'undefined' && window.__websiteInfoPerfId) {
        performanceMonitor.end(window.__websiteInfoPerfId, 'error', {
          error: websiteInfoError.message || 'Unknown error'
        });
        delete window.__websiteInfoPerfId;
      }
    }
  }, [websiteInfo, websiteInfoError, webInfoDispatch]);

  //megamenu useEffect

  useEffect(() => {
    if (!megaMenuState?.megaMenuList) return;

    const menu = megaMenuState?.megaMenuList;
    const categoryId = searchParams.get("category");
    const productId = params?.slug;

    // console.log("💡 useEffect triggered:", { categoryId, productId });

    if (categoryId) {
      const path = findBreadcrumbPath(menu, categoryId);
      // console.log("📂 Breadcrumb for category", path);
      setBreadcrumb(path);
    } else if (productId) {
      const path = findBreadcrumbPath(menu, productId);
      // console.log("📂 Breadcrumb for product", path);
      setBreadcrumb(path);
    }
  }, [searchParams, params, megaMenuState?.megaMenuList]);

  // useEffect(() => {
  //     if (typeof window !== "undefined" && router.isReady)
  //  {
  //       const authUser = sessionStorage.getItem("auth-user");
  //       const parsedUser = authUser ? JSON.parse(authUser) : null;
  // console.log("auth effect", parsedUser, userState?.user, router.pathname);
  //       // ✅ Redirect if user already exists and you're on login and set if user set
  //       if (parsedUser) {
  //         console.log("auth user found");
  //         setUser(parsedUser);

  //         if (userState?.user == null && parsedUser?.id) {
  //           console.log("auth dispatch called in layout");
  //           userDispatch({ type: "SET_USER", payload: parsedUser });
  //         }
  //          if (router.pathname === "/login") router.push("/home");
  //       } else {
  //         setUser(null);
  //         cartDispatch({ type: "CLEAR_CART" });
  //       }
  //     }
  //   }, [router.isReady]);

  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // console.log("auth useEffect running");

    const authUser = localStorage.getItem("auth-user");
    const parsedUser = authUser ? JSON.parse(authUser) : null;

    // console.log("auth effect", parsedUser, userState?.user, pathname);

    // ✅ Redirect if user exists and on /login
    if (parsedUser && pathname === "/login") {
      console.log("Redirecting to /home...");
      setRedirecting(true); // this blocks rendering
      // Use guarded router to prevent duplicate navigation calls
      replace("/home").catch(console.error);
      return;
    }
   

    if (parsedUser) {
      // console.log("auth user found");
      setUser(parsedUser);

      if (!userState?.user && parsedUser?.id) {
        // console.log("dispatching user");
        userDispatch({ type: "SET_USER", payload: parsedUser });
      }
    } else {
      // console.log("No user found");
      setUser(null);
      // Do not clear cart here to preserve guest cart and avoid hydration races
    }
  }, [pathname]);


  
  const cartDataRecieved = cartData?.data?.items?.length > 0;

  const cartAlreadySet = cartState.cart?.length > 0;
  // console.log("cartAlreadySet ", cartState, cartData);

  // Function to generate dynamic Google Maps embed URL
  const generateMapEmbedUrl = (address) => {
    if (!address) return null;
    const encodedAddress = encodeURIComponent(address);
    // Use a simpler, more reliable Google Maps embed URL
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}`;
  };

  //this code for cart is for loggin user only

  useEffect(() => {
    // console.log("cart data from query", cartData, cartDataRecieved);
    // console.log(
    //   "cart condition",
    //   cartDataRecieved,
    //   !cartAlreadySet,
    //   user,
    //   userState?.user
    // );
    //for logged in user
    if (cartDataRecieved && !cartAlreadySet && user) {
      // Normalize and set cart items with SKU preserved
      const normalizedItems = cartData?.data?.items
        ?.filter((item) => item && item.id)
        .map((item) => ({
          id: item.id,
          cartId: item.cartId,
          slug: item.slug || item.title,
          price: Number(item.price || 0),
          title: item.title,
          thumbnail: item.thumbnail || "",
          qty: Number(item.quantity || 0),
          user: user.id,
          stock: item.stock,
          category: item?.category || "",
          // Preserve SKU from server response, ensure it's a string
          sku: item.sku !== undefined && item.sku !== null && item.sku !== "" ? String(item.sku) : "",
        })) || [];
      
      if (normalizedItems.length > 0) {
        console.log("[ShopLayout] Setting cart with normalized items:", normalizedItems);
        cartDispatch({ type: "SET_CART", payload: normalizedItems });
      }
    }

    if (cartError) {
      enqueueSnackbar("Cart Fetch failed!", { variant: "error" });
    }
  }, [cartDataRecieved, cartLoading, cartError]);

  const categoriesReady = data?.data?.length > 0;
  const productsReady = getProducts?.data?.products?.length > 0;
  const productsAlreadySet = state.products?.length > 0;

  // Track app initialization performance
  useEffect(() => {
    // Check if this is a logo click or initial app load
    const perfId = typeof window !== 'undefined' ? sessionStorage.getItem('__logoClickPerfId') : null;
    const isInitialLoad = !perfId && pathname === '/home' && !megaMenuState?.megaMenuList?.length;
    
    if (isInitialLoad) {
      // Start tracking initial app load
      const newPerfId = performanceMonitor.start('app-initial-load', 'app-load', {
        trigger: 'initial-page-load',
        pathname,
      });
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('__appLoadPerfId', newPerfId);
      }
    }
  }, []);

  // Populate Mega Menu as soon as categories are ready (independent of products)
  useEffect(() => {
    if (!categoriesReady) return;
    
    // Track API response for app load
    const perfId = typeof window !== 'undefined' 
      ? (sessionStorage.getItem('__logoClickPerfId') || sessionStorage.getItem('__appLoadPerfId'))
      : null;
    
    if (perfId) {
      performanceMonitor.markMilestone(perfId, 'categories-api-response', {
        categoriesCount: data.data?.length || 0,
      });
    }
    
    const categoryList = convertToCategoryListByDisplayOrder(data.data);
    const categoryNavigation = transformCategoriesForMegaMenu(data.data);

    megaMenuDispatch({
      type: "SET_MAIN_CATEGORIES_LIST",
      payload: categoryList,
    });

    megaMenuDispatch({
      type: "SET_MEGAMENU_LIST",
      payload: categoryNavigation,
    });
    
    // Mark categories mapped milestone
    if (perfId) {
      performanceMonitor.markMilestone(perfId, 'categories-mapped', {
        categoryListCount: categoryList?.length || 0,
        megaMenuCount: categoryNavigation?.length || 0,
      });
    }

    if (error) {
      enqueueSnackbar("Navigation failed!", { variant: "error" });
    }
  }, [categoriesReady, data, error]);

  // Set products state when available (not required for navbar/breadcrumbs)
  useEffect(() => {
    if (!(productsReady && !productsAlreadySet)) return;
    
    // Track products API response for app load
    const perfId = typeof window !== 'undefined' 
      ? (sessionStorage.getItem('__logoClickPerfId') || sessionStorage.getItem('__appLoadPerfId'))
      : null;
    
    if (perfId) {
      performanceMonitor.markMilestone(perfId, 'products-api-response', {
        productsCount: getProducts?.data?.products?.length || 0,
      });
    }
    
    dispatch({
      type: "SET_PRODUCTS",
      payload: getProducts?.data.products,
    });
    dispatch({
      type: "PAGINATION",
      payload: getProducts?.data.pagination,
    });
    
    // Mark products mapped milestone
    if (perfId) {
      performanceMonitor.markMilestone(perfId, 'products-mapped', {
        productsSet: getProducts?.data?.products?.length || 0,
      });
      
      // End app load tracking after all APIs are mapped
      setTimeout(() => {
        const timer = performanceMonitor.activeTimers.get(perfId);
        if (timer) {
          performanceMonitor.end(perfId, 'success', {
            totalAppLoadTime: performance.now() - timer.startTime,
          });
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('__logoClickPerfId');
            sessionStorage.removeItem('__appLoadPerfId');
          }
        }
      }, 100);
    }
    
    if (productError) {
      enqueueSnackbar("Products fetch failed!", { variant: "error" });
    }
  }, [productsReady, productsAlreadySet, getProducts, productError]);

  // Performance tracking: Track special products API call when it starts loading
  useEffect(() => {
    if (specialProductLoading && typeof window !== 'undefined' && !window.__specialProductsPerfId) {
      const perfId = performanceMonitor.start(
        `special-products-${Date.now()}`,
        'special-products-api',
        { pathname }
      );
      window.__specialProductsPerfId = perfId;
    }
  }, [specialProductLoading, pathname]);

  //useEffect to set special products
  useEffect(() => {
    if (specialProducts?.data?.products?.mostSold?.length > 0) {
      // Performance tracking: End timing when data is received
      if (typeof window !== 'undefined' && window.__specialProductsPerfId) {
        performanceMonitor.end(window.__specialProductsPerfId, 'success', {
          mostSoldCount: specialProducts.data.products.mostSold.length,
          mostPopularCount: specialProducts.data.products.mostPopular.length,
          featuredCount: specialProducts.data.products.featured.length,
        });
        delete window.__specialProductsPerfId;
      }
      
      // Also track as milestone in app-load if it's still active
      const appLoadPerfId = typeof window !== 'undefined' 
        ? (sessionStorage.getItem('__logoClickPerfId') || sessionStorage.getItem('__appLoadPerfId'))
        : null;
      if (appLoadPerfId) {
        performanceMonitor.markMilestone(appLoadPerfId, 'special-products-api-response', {
          mostSoldCount: specialProducts.data.products.mostSold.length,
          mostPopularCount: specialProducts.data.products.mostPopular.length,
          featuredCount: specialProducts.data.products.featured.length,
        });
        performanceMonitor.markMilestone(appLoadPerfId, 'special-products-mapped', {
          mapped: true,
        });
        
        // On home page, complete app-load after special products are mapped
        // (since we skip getAllProducts on home page)
        if (pathname === '/home') {
          setTimeout(() => {
            const timer = performanceMonitor.activeTimers.get(appLoadPerfId);
            if (timer) {
              performanceMonitor.end(appLoadPerfId, 'success', {
                totalAppLoadTime: performance.now() - timer.startTime,
                note: 'Completed after special products (getAllProducts skipped on home)',
              });
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('__logoClickPerfId');
                sessionStorage.removeItem('__appLoadPerfId');
              }
            }
          }, 100);
        }
      }
      
      // console.log("specialProducts received", specialProducts?.data?.products);
      dispatch({
        type: "SET_MOST_SOLD",
        payload: specialProducts?.data?.products.mostSold,
      });
      dispatch({
        type: "SET_MOST_POPULAR",
        payload: specialProducts?.data?.products.mostPopular,
      });
      dispatch({
        type: "SET_FEATURED",
        payload: specialProducts?.data?.products.featured,
      });
    }
    if (specialProductError) {
      // Performance tracking: End timing on error
      if (typeof window !== 'undefined' && window.__specialProductsPerfId) {
        performanceMonitor.end(window.__specialProductsPerfId, 'error', {
          error: specialProductError.message || 'Unknown error'
        });
        delete window.__specialProductsPerfId;
      }
      
      // Track error in app-load if active
      const appLoadPerfId = typeof window !== 'undefined' 
        ? (sessionStorage.getItem('__logoClickPerfId') || sessionStorage.getItem('__appLoadPerfId'))
        : null;
      if (appLoadPerfId) {
        performanceMonitor.markMilestone(appLoadPerfId, 'special-products-api-error', {
          error: specialProductError.message || 'Unknown error'
        });
      }
      
      enqueueSnackbar("Special Products Fetch failed!", { variant: "error" });
    }
  }, [specialProducts, specialProductError, specialProductLoading, dispatch, enqueueSnackbar, pathname]);

  // Refetch role-based data when auth changes (login or logout)
  // Use setTimeout to make this non-blocking and allow navigation to complete first
  useEffect(() => {
    // Delay refetch slightly to allow navigation to complete first
    const timeoutId = setTimeout(() => {
      // Refetch website info in case any role-based content exists (safe no-op if server ignores role)
      if (!isWebsiteInfoUninitialized && refetchWebsiteInfo) {
        refetchWebsiteInfo();
      }

      // Always refetch products/special products on auth changes to get correct pricing
      if (!isProductsUninitialized && refetchProducts) {
        refetchProducts();
      }
      if (!isSpecialUninitialized && refetchSpecialProducts) {
        refetchSpecialProducts();
      }
    }, 100); // Small delay to prioritize navigation

    return () => clearTimeout(timeoutId);
  }, [userState?.user?.id, isWebsiteInfoUninitialized, isProductsUninitialized, isSpecialUninitialized, refetchWebsiteInfo, refetchProducts, refetchSpecialProducts]);

  // Setup route prefetching for better navigation performance
  useEffect(() => {
    // Prefetch common routes after page load
    prefetchCommonRoutes();
    
    // Setup viewport prefetching for links
    const mainContent = document.querySelector('main') || document.body;
    const cleanupViewport = setupViewportPrefetching(mainContent);
    
    // Setup hover prefetching for navigation
    const navElements = document.querySelectorAll('nav, [role="navigation"]');
    const cleanupHovers = navElements.length > 0 
      ? Array.from(navElements).map(el => setupHoverPrefetching(el))
      : [];
    
    return () => {
      cleanupViewport?.();
      cleanupHovers.forEach(cleanup => cleanup?.());
    };
  }, [pathname]); // Re-run when route changes to setup prefetching for new page

  if (pathname === "/login" && redirecting) {
    return null; // show nothing while redirecting
  }

  const MOBILE_VERSION_HEADER = (
    <MobileHeader>
      <MobileHeader.Left>
        <MobileMenu navigation={megaMenuState?.megaMenuList} /> 
      </MobileHeader.Left>
      <MobileHeader.Logo logoUrl={logoUrl} />
      <MobileHeader.Right>
        <HeaderSearch>
          <MobileSearchInput />
        </HeaderSearch>
        {/* <HeaderLogin /> */}
        <AccountPopover />
        <HeaderCart 
          onCartClick={() => {
            setIsMiniCartLoading(true);
            setIsMiniCartOpen(true);
            setTimeout(() => setIsMiniCartLoading(false), 150); // Reduced from 300ms for faster rendering
          }} 
          isLoading={isMiniCartLoading}
        />
      </MobileHeader.Right>
    </MobileHeader>
  );
  return (
    <Fragment>
      {/* HEADER (non-sticky) */}
      <Header mobileHeader={MOBILE_VERSION_HEADER}>
        <Header.Logo url={logoUrl} />
        {isFixed ? (
          <Header.CategoryDropdown>
            <CategoryList categories={megaMenuState?.categoriesList} />
          </Header.CategoryDropdown>
        ) : null}
        <Header.Mid>
          {isLoading ? (
            <HeaderNavigationSkeleton />
          ) : megaMenuState?.megaMenuList ? (
            <HeaderNavigation navigation={megaMenuState?.megaMenuList} />
          ) : null}
        </Header.Mid>
        <Header.Right>
          {/* HEADER SEARCH BUTTON */}
          <HeaderSearchButton 
            onSearchClick={() => {
              setIsSearchOpen(true);
            }} 
          />
          {/* HEADER CART BUTTON */}
          <HeaderCart 
            onCartClick={() => {
              setIsMiniCartLoading(true);
              setIsMiniCartOpen(true);
              // Hide loader after drawer animation completes
              setTimeout(() => setIsMiniCartLoading(false), 150); // Reduced from 300ms for faster rendering
            }} 
            isLoading={isMiniCartLoading}
          />
          {/* HEADER WISHLIST BUTTON */}
          <HeaderWishlist />
          {/* HEADER LOGIN BUTTON */}
          <HeaderLoginButton />
        </Header.Right>
      </Header>

      {/* HEADER SEARCH DROPDOWN */}
      <HeaderSearchDropdown 
        open={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />


      {breadcrumb && shouldShowBreadcrumb && (
        <BreadcrumbNav breadcrumb={breadcrumb} />
      )}
      {/* BODY CONTENT */}
      {children}
      {/* MINI CART DRAWER */}
      <MiniCartDrawer 
        isOpen={isMiniCartOpen} 
        onClose={() => {
          setIsMiniCartLoading(true);
          setIsMiniCartOpen(false);
          setTimeout(() => setIsMiniCartLoading(false), 100); // Reduced from 200ms for faster rendering
        }}
        isLoading={isMiniCartLoading}
      />
      {/* SMALL DEVICE BOTTOM NAVIGATION-bottomsheet */}
      <MobileNavigationBar navigation={mobileNavigation} />
     
      {/* Floating WhatsApp Button - At the end of Fragment to float above everything */}
      <FloatingWhatsApp phone={finalFooterContact?.phone} />
     
    {/* FOOTER SECTION  */}
    <Footer1>
      <Grid container spacing={4} sx={{ pb: 4 }}>
        {/* Column 1: Company Information */}
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            {/* Logo */}
            <Link href="/" style={{ display: "block", marginBottom: "16px", maxWidth: "100%", width: "fit-content" }}>
              <Image
                src="/assets/images/footer-logo.png"
                alt="logo"
                width={230}
                height={94}
                style={{
                  objectFit: "contain",
                  width: "230px",
                  height: "auto",
                  maxWidth: "230px",
                  display: "block",
                  flexShrink: 0,
                }}
              />
            </Link>

            {/* Description */}
            <Typography
              variant="body2"
              sx={{
                color: "#0B090A",
                mb: 2,
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspetristique. Duis n eros elecuenindisse varius enim
            </Typography>

            {/* Phone */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <PhoneIcon sx={{ color: "#0B090A", fontSize: "1.2rem", mr: 1 }} />
              <Typography
                variant="body2"
                sx={{
                  color: "#0B090A",
                  fontSize: "0.875rem",
                }}
              >
                +92 3000000000
              </Typography>
            </Box>

            {/* Email */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon sx={{ color: "#0B090A", fontSize: "1.2rem", mr: 1 }} />
              <Typography
                variant="body2"
                sx={{
                  color: "#0B090A",
                  fontSize: "0.875rem",
                }}
              >
                forexample@gmail.com
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Column 2: Quick Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#0B090A",
                fontWeight: 600,
                fontSize: "1rem",
                mb: 2,
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0B090A",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#0B090A", fontWeight: 500, opacity: 0.7 },
                  }}
                >
                  Home
                </Typography>
              </Link>
              <Link href="/shop" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0B090A",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#0B090A", fontWeight: 500, opacity: 0.7 },
                  }}
                >
                  Shop
                </Typography>
              </Link>
              <Link href="/products" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0B090A",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#0B090A", fontWeight: 500, opacity: 0.7 },
                  }}
                >
                  Products
                </Typography>
              </Link>
              <Link href="/about" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0B090A",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#0B090A", fontWeight: 500, opacity: 0.7 },
                  }}
                >
                  About
                </Typography>
              </Link>
              <Link href="/blogs" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0B090A",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#0B090A", fontWeight: 500, opacity: 0.7 },
                  }}
                >
                  Blogs
                </Typography>
              </Link>
            </Box>
          </Box>
        </Grid>

        {/* Column 3: Help & Infor */}
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#0B090A",
                fontWeight: 600,
                fontSize: "1rem",
                mb: 2,
              }}
            >
              Help & Infor
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/orders" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0B090A",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#0B090A", fontWeight: 500, opacity: 0.7 },
                  }}
                >
                  Track Your Order
                </Typography>
              </Link>
              <Link href="/returns" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0B090A",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#0B090A", fontWeight: 500, opacity: 0.7 },
                  }}
                >
                  Returns Policies
                </Typography>
              </Link>
              <Link href="/shipping" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0B090A",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#0B090A", fontWeight: 500, opacity: 0.7 },
                  }}
                >
                  Shipping + Delivery
                </Typography>
              </Link>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0B090A",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#0B090A", fontWeight: 500, opacity: 0.7 },
                  }}
                >
                  Contact Us
                </Typography>
              </Link>
              <Link href="/faqs" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0B090A",
                    fontSize: "0.875rem",
                    "&:hover": { color: "#0B090A", fontWeight: 500, opacity: 0.7 },
                  }}
                >
                  FAQs
                </Typography>
              </Link>
            </Box>
          </Box>
        </Grid>

        {/* Column 4: Newsletter */}
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#0B090A",
                fontWeight: 600,
                fontSize: "1rem",
                mb: 1.5,
              }}
            >
              Newsletter
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#0B090A",
                fontSize: "0.875rem",
                mb: 2,
                lineHeight: 1.6,
              }}
            >
              Sign up for newsletter and get 10% cash back offer
            </Typography>

            {/* Newsletter Subscription Form */}
            <Box
              sx={{
                display: "flex",
                gap: 0,
                mb: 3,
              }}
            >
              <TextField
                placeholder="Email address"
                variant="outlined"
                size="small"
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#FEFAF0",
                    borderRadius: 0,
                    "& fieldset": {
                      borderColor: "#0B090A",
                      borderWidth: "1px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#0B090A",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0B090A",
                      borderWidth: "1px",
                    },
                    "&.Mui-focused": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  },
                  "& input": {
                    padding: "8px 12px",
                    fontSize: "0.875rem",
                    color: "#0B090A",
                    backgroundColor: "#FEFAF0",
                    "&:focus": {
                      outline: "none",
                    },
                    "&::placeholder": {
                      color: "#0B090A",
                      opacity: 0.6,
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0B090A",
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0B090A",
                  color: "#fff",
                  borderRadius: 0,
                  px: 2,
                  textTransform: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#0B090A",
                    opacity: 0.9,
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>

            {/* Social Media Icons */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {/* Facebook Icon */}
              <Link
                href={footerSocialLinks?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
              >
                <Box
                  component="svg"
                  viewBox="0 0 24 24"
                  sx={{
                    width: "1.5rem",
                    height: "1.5rem",
                    fill: "#0B090A",
                    "&:hover": { opacity: 0.7 },
                    transition: "opacity 0.2s",
                  }}
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </Box>
              </Link>

              {/* X (Twitter) Icon */}
              <Link
                href={footerSocialLinks?.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
              >
                <Box
                  component="svg"
                  viewBox="0 0 24 24"
                  sx={{
                    width: "1.5rem",
                    height: "1.5rem",
                    fill: "#0B090A",
                    "&:hover": { opacity: 0.7 },
                    transition: "opacity 0.2s",
                  }}
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </Box>
              </Link>

              {/* Instagram Icon */}
              <Link
                href={footerSocialLinks?.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
              >
                <Box
                  component="svg"
                  viewBox="0 0 24 24"
                  sx={{
                    width: "1.5rem",
                    height: "1.5rem",
                    fill: "none",
                    stroke: "#0B090A",
                    strokeWidth: 1.5,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "&:hover": { opacity: 0.7 },
                    transition: "opacity 0.2s",
                  }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </Box>
              </Link>

              {/* LinkedIn Icon */}
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
              >
                <Box
                  component="svg"
                  viewBox="0 0 24 24"
                  sx={{
                    width: "1.5rem",
                    height: "1.5rem",
                    fill: "#0B090A",
                    "&:hover": { opacity: 0.7 },
                    transition: "opacity 0.2s",
                  }}
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </Box>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Copyright Section */}
      <Box
        sx={{
          width: "100%",
          borderTop: "1px solid #D7CCC8",
          pt: 2,
          pb: 2,
          textAlign: "center",
          px: { xs: 2, sm: 3 },
          mx: { xs: -2, sm: -3 },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#0B090A",
            fontSize: "0.875rem",
          }}
        >
          Copyright © 2025 Qadeem handicraft | All Rights Reserved
        </Typography>
      </Box>
    </Footer1>
     
    </Fragment>
  );
}