export const layoutConstant = {
  topbarHeight: 47,
  headerHeight: 80,
  mobileNavHeight: 64,
  containerWidth: 1200,
  mobileHeaderHeight: 64,
  grocerySidenavWidth: 280
};

export const EXCLUDED_CATEGORY_ID = "68a82786992db6bf45ed73ce";

export const USERTYPE_WHOLESALER = "Wholesale";    //tier 1 max discount
export const USERTYPE_CHAINSTORE = "ChainStore"; //tier 2
export const USERTYPE_RETAILER = "Retailer"; //tier 3
export const USERTYPE_FRANCHISE = "Franchise"; //tier 4
export const USERTYPE_SALESPERSON = "SalesPerson"; //sales person role

export const ORDER_STATUS_DELIVERED="delivered";
export const ORDER_STATUS_PENDING="pending";
export const ORDER_STATUS_PROCESSSING="processing";
export const ORDER_STATUS_CANCELLED="cancelled";


export const USERTYPE_ADMIN = "Admin";

// export const topbarSocialLinks = {
//   facebook: "https://www.facebook.com/",
//   twitter: "https://twitter.com/",
//   instagram: "https://www.instagram.com/"
// };


// // TOP BAR LANGUAGE OPTIONS
// export const languageOptions = {
//   en: {
//     title: "EN",
//     value: "en"
//   },
//   es: {
//     title: "DE",
//     value: "de"
//   }
// };


// MOBILE NAVIGATION LIST
export const mobileNavigation = [{
  title: "Home",
  icon: "Home",
  href: "/",
  badge: false
},
// {
//   title: "Category",
//   icon: "CategoryOutlined",
//   href: "/mobile-categories",
//   badge: false
// }, 
{
  title: "Cart",
  icon: "ShoppingBagOutlined",
  href: "/cart",
  badge: true
}, {
  title: "Account",
  icon: "User2",
  href: "/profile",
  badge: false
}];


// SIDEBAR FOOTER LINKS
export const footerLinks = [{
  title: "Terms",
  url: "/t&c"
}, {
  title: "Privacy",
  url: "/privacyPolicy"
},
 {
  title: "Contact us",
  url: "/"
}
];




export const footerAboutLinks = [
//   {
//   title: "Careers",
//   url: "#"
// }, 
// {
//   title: "Our Stores",
//   url: "#"
// }, 
{
  title: "About Us",
  url: "/aboutUs"
},
 {
  title: "Terms & Conditions",
  url: "/t&c"
}, {
  title: "Privacy Policy",
  url: "/privacyPolicy"
}];




export const footerCustomerCareLinks = [
//   {
//   title: "Help Center",
//   url: "#"
// }, 
{
  title: "Track Your Order",
  url: "/orders"
}, {
  title: "Corporate & Bulk Purchasing",
  url: "/corporateBulkPurchasing"
}, {
  title: "Shipping & Returns",
  url: "/shipping&returns"
}];



export const footerSocialLinks = {
  facebook: "https://www.facebook.com/",
  twitter: "https://twitter.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.instagram.com/",
  google: "https://www.instagram.com/"
};



// export const footerDescription = "SIFRA Wholesale is your trusted source for high-quality mobile phone parts and accessories in Norcross, Georgia. We specialize in wholesale cell phone repair parts, including screens, batteries, chargers, tools, and more for top brands like Apple and Samsung. With fast nationwide shipping, secure checkout, and a 30-day return policy, we make it easy for repair shops and resellers to get the parts they need—on time and at the right price.  Sign up for our newsletter to get exclusive offers and updates on new arrivals.";


// export const footerContact = {
//   phone: "+1 762 436 5912",
//   email: "sifrausa@gmail.com",
//   address: "5955 Jimmy Carter Blvd ste 120, Norcross, GA 30071, United States"
// };

export const logoUrl = "/assets/images/logo3.jpeg"

// export const mainCarouselData = [
//   {
//     title: "Shop Mobile Accessories Online",
//     imgUrl: ["/assets/images/bannerImages/cam1.jpeg","/assets/images/bannerImages/cam2.jpeg","/assets/images/bannerImages/cam3.jpeg"],
//     description: `Explore a wide range of smartphone accessories including ring lights, car mounts, dash cams, and more.`,
//     buttonText: "Shop Accessories",
//     buttonLik: "/allProducts?view=grid",
//   },
//   {
//     title: "Trendy Phone Cases for All Brands",
//     imgUrl: ["/assets/images/bannerImages/cases1.jpeg","/assets/images/bannerImages/cases2.jpeg","/assets/images/bannerImages/cases3.jpeg"],
//     description: `Find stylish and protective phone cases for iPhone, Samsung, and other top models — available in all styles.`,
//     buttonText: "Shop Cases",
//     buttonLik: "/allProducts?view=grid",
//   },
//   {
//     title: "Latest Wireless Earphones Online",
//     imgUrl: ["/assets/images/bannerImages/earbuds1.jpeg","/assets/images/bannerImages/earbuds2.jpeg","/assets/images/bannerImages/earbuds3.jpeg"],
//     description: `Discover Bluetooth earphones with great sound and battery life — perfect for music, calls, and workouts.`,
//     buttonText: "Buy Earphones",
//     buttonLik: "/allProducts?view=grid",
//   },
//   {
//     title: "Portable & Powerful Bluetooth Speakers",
//     imgUrl: ["/assets/images/bannerImages/speaker1.jpeg","/assets/images/bannerImages/speaker2.jpeg","/assets/images/bannerImages/speaker3.jpeg"],
//     description: `Shop compact to high-power Bluetooth speakers ideal for parties, travel, and everyday use.`,
//     buttonText: "Explore Speakers",
//     buttonLik: "/allProducts?view=grid",
//   },
//   {
//     title: "Buy Cell Phone Parts Online",
//     imgUrl: ["/assets/images/bannerImages/parts1.jpeg","/assets/images/bannerImages/parts2.jpeg","/assets/images/bannerImages/parts3.jpeg"],
//     description: `High-quality replacement parts for all smartphone models — screens, batteries, and more in stock.`,
//     buttonText: "Browse Parts",
//     buttonLik: "/allProducts?view=grid",
//   },
// ];


export const mainCarouselData = [
  "/assets/images/banners/banner1.jpeg",
  "/assets/images/banners/banner2.jpeg",
  "/assets/images/banners/banner3.jpeg",
  "/assets/images/banners/banner4.jpeg",
];



   export  const footerData = {
  paymentLinks: [
    {
      src: "/assets/images/payment-methods/visacard.jpeg",
      alt: "Visa",
      href: "https://www.visa.com",
    },
    {
      src: "/assets/images/payment-methods/mastercard.jpeg",
      alt: "MasterCard",
      href: "https://www.mastercard.com",
    },
  
  // {
  //   icon: <Image src="/assets/images/paypal.png" alt="PayPal" width={40} height={40} />,
  //   href: 'https://www.paypal.com',
  // },
  // {
  //   icon: <Image src="/assets/images/amazon.png" alt="Amazon Pay" width={40} height={40} />,
  //   href: 'https://pay.amazon.com',
  // },
],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.728050975037!2d-84.21456262333567!3d33.92239812457375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a6c9533fffff%3A0x2dc2370665615def!2sNorcross%20Triangle%20Shopping%20Center%2C%205955%20Jimmy%20Carter%20Blvd%20%23120%2C%20Norcross%2C%20GA%2030071%2C%20USA!5e0!3m2!1sen!2s!4v1754045207037!5m2!1sen!2s"
  };


  // <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3996.1522177784236!2d-84.21456262377211!3d33.92239812457458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a6c9533fffff%3A0x2dc2370665615def!2sNorcross%20Triangle%20Shopping%20Center%2C%205955%20Jimmy%20Carter%20Blvd%20%23120%2C%20Norcross%2C%20GA%2030071%2C%20USA!5e1!3m2!1sen!2s!4v1753996421336!5m2!1sen!2s" 