import categoriesMegaMenu from "./categoriesMegaMenu";


// MEGA-MENU DATA
// const megaMenus = [[{
//   title: "Home",
//   child: [{
//     title: "Market 1",
//     url: "/market-1"
//   }, {
//     title: "Market 2",
//     url: "/market-2"
//   }, {
//     title: "Gadget 1",
//     url: "/home"
//   }, {
//     title: "Gadget 2",
//     url: "/gadget-2"
//   }, {
//     title: "Grocery 1",
//     url: "/grocery-1"
//   }, {
//     title: "Grocery 2",
//     url: "/grocery-2"
//   },

// // { title: "Grocery 3", url: "/grocery-3" },
//   {
//     title: "Fashion 1",
//     url: "/fashion-1"
//   }, {
//     title: "Fashion 2",
//     url: "/fashion-2"
//   },

// // { title: "Fashion 3", url: "/fashion-3" },
//   {
//     title: "Gift Store",
//     url: "/gift-shop"
//   }, {
//     title: "Furniture 1",
//     url: "/furniture-1"
//   },

// // { title: "Furniture 2", url: "/furniture-2" },
//   {
//     title: "Health and Beauty",
//     url: "/health-beauty"
//   }]
// }], [{
//   title: "User Account",
//   child: [{
//     title: "Order List",
//     url: "/orders"
//   }, {
//     title: "Order Details",
//     url: "/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
//   }, {
//     title: "View Profile",
//     url: "/profile"
//   }, {
//     title: "Edit Profile",
//     url: "/profile/e42e28ea-528f-4bc8-81fb-97f658d67d75"
//   }, {
//     title: "Address List",
//     url: "/address"
//   }, {
//     title: "Add Address",
//     url: "/address/d27d0e28-c35e-4085-af1e-f9f1b1bd9c34"
//   }, {
//     title: "All tickets",
//     url: "/support-tickets"
//   }, {
//     title: "Ticket details",
//     url: "/support-tickets/when-will-my-product-arrive"
//   }, {
//     title: "Wishlist",
//     url: "/wish-list"
//   }]
// }], [{
//   title: "Vendor Account",
//   child: [{
//     title: "Dashboard",
//     url: "/vendor/dashboard"
//   }, {
//     title: "Profile",
//     url: "/vendor/account-settings"
//   }]
// }, {
//   title: "Products",
//   child: [{
//     title: "All products",
//     url: "/admin/products"
//   }, {
//     title: "Add/Edit product",
//     url: "/admin/products/create"
//   }]
// }, {
//   title: "Orders",
//   child: [{
//     title: "All orders",
//     url: "/admin/orders"
//   }, {
//     title: "Order details",
//     url: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
//   }]
// }, {
//   title: "Authentication",
//   child: [{
//     title: "Login",
//     url: "/login"
//   }, {
//     title: "Register",
//     url: "/register"
//   }]
// }], [{
//   title: "Sale Page",
//   child: [{
//     title: "Sales Version 1",
//     url: "/allProducts"
//   }, {
//     title: "Sales Version 2",
//     url: "/sales-2"
//   }]
// }, {
//   title: "Shop",
//   child: [{
//     title: "Search product",
//     url: "/products/search?category=clothes"
//   }, {
//     title: "Single product",
//     url: "/products/lord-2019"
//   }, {
//     title: "Cart",
//     url: "/cart"
//   }, {
//     title: "Checkout",
//     url: "/checkout"
//   }, {
//     title: "Alternative Checkout",
//     url: "/checkout-alternative"
//   }, {
//     title: "Order confirmation",
//     url: "/order-confirmation"
//   }]
// }]];
// const megaMenus = [[{
//   title: "Electronics",
//   child: [{
//     title: "Smartphones",
//     url: "/electronics/smartphones"
//   }, {
//     title: "Laptops",
//     url: "/electronics/laptops"
//   }, {
//     title: "Tablets",
//     url: "/electronics/tablets"
//   }, {
//     title: "Cameras",
//     url: "/electronics/cameras"
//   }, {
//     title: "TVs & Monitors",
//     url: "/electronics/tvs-monitors"
//   }, {
//     title: "Audio Devices",
//     url: "/electronics/audio"
//   }, {
//     title: "Gaming Consoles",
//     url: "/electronics/gaming"
//   }, {
//     title: "Wearables",
//     url: "/electronics/wearables"
//   }, {
//     title: "Smart Home",
//     url: "/electronics/smart-home"
//   }, {
//     title: "Computer Accessories",
//     url: "/electronics/accessories"
//   }, {
//     title: "Drones",
//     url: "/electronics/drones"
//   }]
// }],
// // the rest remains unchanged
// [{
//   title: "User Account",
//   child: [{
//     title: "Order List",
//     url: "/orders"
//   }, {
//     title: "Order Details",
//     url: "/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
//   }, {
//     title: "View Profile",
//     url: "/profile"
//   }, {
//     title: "Edit Profile",
//     url: "/profile/e42e28ea-528f-4bc8-81fb-97f658d67d75"
//   }, {
//     title: "Address List",
//     url: "/address"
//   }, {
//     title: "Add Address",
//     url: "/address/d27d0e28-c35e-4085-af1e-f9f1b1bd9c34"
//   }, {
//     title: "All tickets",
//     url: "/support-tickets"
//   }, {
//     title: "Ticket details",
//     url: "/support-tickets/when-will-my-product-arrive"
//   }, {
//     title: "Wishlist",
//     url: "/wish-list"
//   }]
// }], [{
//   title: "Vendor Account",
//   child: [{
//     title: "Dashboard",
//     url: "/vendor/dashboard"
//   }, {
//     title: "Profile",
//     url: "/vendor/account-settings"
//   }]
// }, {
//   title: "Products",
//   child: [{
//     title: "All products",
//     url: "/admin/products"
//   }, {
//     title: "Add/Edit product",
//     url: "/admin/products/create"
//   }]
// }, {
//   title: "Orders",
//   child: [{
//     title: "All orders",
//     url: "/admin/orders"
//   }, {
//     title: "Order details",
//     url: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
//   }]
// }, {
//   title: "Authentication",
//   child: [{
//     title: "Login",
//     url: "/login"
//   }, {
//     title: "Register",
//     url: "/register"
//   }]
// }], [{
//   title: "Sale Page",
//   child: [{
//     title: "Sales Version 1",
//     url: "/allProducts"
//   }, {
//     title: "Sales Version 2",
//     url: "/sales-2"
//   }]
// }, {
//   title: "Shop",
//   child: [{
//     title: "Search product",
//     url: "/products/search?category=electronics"
//   }, {
//     title: "Single product",
//     url: "/products/gadget-x"
//   }, {
//     title: "Cart",
//     url: "/cart"
//   }, {
//     title: "Checkout",
//     url: "/checkout"
//   }, {
//     title: "Alternative Checkout",
//     url: "/checkout-alternative"
//   }, {
//     title: "Order confirmation",
//     url: "/order-confirmation"
//   }]
// }]];
// const megaMenus = [[{
//   title: "Apple",
//   child: [
//     {
//       title: "iPhone Parts",
//       image: "/images/iphone.jpg",
//       child: [
//         { title: "All iPhone Screens", url: "/apple/iphone/all-screens" },
//         { title: "iPhone 15 Pro Max", url: "/apple/iphone/15-pro-max" }
//       ]
//     },
//     {
//       title: "iPad Parts",
//       image: "/images/ipad.jpg",
//       child: [
//         { title: "iPad Pro 12.9 (2022)", url: "/apple/ipad/ipad-pro-12.9-2022" }
//       ]
//     }
//   ]
// }],

// [{
//   title: "Samsung",
//   child: [
//     {
//       title: "Samsung Screens",
//       image: "/images/samsung.jpg",
//       child: [
//         { title: "Galaxy S24 Ultra", url: "/samsung/screens/s24-ultra" },
//         { title: "Note 20 Ultra", url: "/samsung/screens/note-20-ultra" }
//       ]
//     }
//   ]
// }],

// [{
//   title: "Accessories",
//   child: [
//     {
//       title: "Cables & Chargers",
//       image: "/images/cables.jpg",
//       child: [
//         { title: "Lightning Cables", url: "/accessories/cables/lightning" },
//         { title: "USB-C Chargers", url: "/accessories/chargers/usb-c" }
//       ]
//     },
//     {
//       title: "Phone Cases",
//       image: "/images/cases.jpg",
//       child: [
//         { title: "iPhone Cases", url: "/accessories/cases/iphone" },
//         { title: "Samsung Cases", url: "/accessories/cases/samsung" }
//       ]
//     }
//   ]
// }]];



// MAIN NAVIGATION DATA
// const navbarNavigation = [{
//   title: "Home",
//   megaMenu: false,
//   megaMenuWithSub: false,
//   child: [{
//     title: "Market",
//     child: [{
//       title: "Market 1",
//       url: "/market-1"
//     }, {
//       title: "Market 2",
//       url: "/market-2"
//     }]
//   }, {
//     title: "Gadget",
//     child: [{
//       title: "Gadget 1",
//       url: "/home"
//     }, {
//       title: "Gadget 2",
//       url: "/gadget-2"
//     }, {
//       title: "Gadget 3",
//       url: "/gadget-3"
//     }]
//   }, {
//     title: "Grocery",
//     child: [{
//       title: "Grocery 1",
//       url: "/grocery-1"
//     }, {
//       title: "Grocery 2",
//       url: "/grocery-2"
//     }, {
//       title: "Grocery 3",
//       url: "/grocery-3"
//     }, {
//       title: "Grocery 4",
//       url: "/grocery-4"
//     }]
//   }, {
//     title: "Fashion",
//     child: [{
//       title: "Fashion 1",
//       url: "/fashion-1"
//     }, {
//       title: "Fashion 2",
//       url: "/fashion-2"
//     }, {
//       title: "Fashion 3",
//       url: "/fashion-3"
//     }]
//   }, {
//     title: "Furniture",
//     child: [{
//       title: "Furniture 1",
//       url: "/furniture-1"
//     }, {
//       title: "Furniture 2",
//       url: "/furniture-2"
//     }, {
//       title: "Furniture 3",
//       url: "/furniture-3"
//     }]
//   }, {
//     title: "Medical",
//     url: "/medical"
//   }, {
//     title: "Gift Store",
//     url: "/gift-shop"
//   }, {
//     title: "Health and Beauty",
//     url: "/health-beauty"
//   }]
// }, {
//   megaMenu: true,
//   megaMenuWithSub: false,
//   title: "Mega Menu",
//   child: megaMenus
// }, {
//   megaMenu: false,
//   megaMenuWithSub: true,
//   title: "Full Screen Menu",
//   child: categoriesMegaMenu
// }, {
//   megaMenu: false,
//   megaMenuWithSub: false,
//   title: "Pages",
//   child: [{
//     title: "Sale Page",
//     child: [{
//       title: "Version 1",
//       url: "/allProducts"
//     }, {
//       title: "Version 2",
//       url: "/sales-2"
//     }]
//   }, {
//     title: "Vendor",
//     child: [{
//       title: "All vendors",
//       url: "/shops"
//     }, {
//       title: "Vendor store",
//       url: "/shops/scarlett-beauty"
//     }]
//   }, {
//     title: "Shop",
//     child: [{
//       title: "Search product",
//       url: "/products/search?category=clothes"
//     }, {
//       title: "Single product",
//       url: "/products/lord-2019"
//     }, {
//       title: "Cart",
//       url: "/cart"
//     }, {
//       title: "Checkout",
//       url: "/checkout"
//     }, {
//       title: "Alternative Checkout",
//       url: "/checkout-alternative"
//     }, {
//       title: "Order confirmation",
//       url: "/order-confirmation"
//     }]
//   }, {
//     title: "Auth",
//     child: [{
//       title: "Login",
//       url: "/login"
//     }, {
//       title: "Register",
//       url: "/register"
//     }]
//   }]
// }, {
//   megaMenu: false,
//   megaMenuWithSub: false,
//   title: "User Account",
//   child: [{
//     title: "Orders",
//     child: [{
//       title: "Order List",
//       url: "/orders"
//     }, {
//       title: "Order Details",
//       url: "/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
//     }]
//   }, {
//     title: "Profile",
//     child: [{
//       title: "View Profile",
//       url: "/profile"
//     }, {
//       title: "Edit Profile",
//       url: "/profile/e42e28ea-528f-4bc8-81fb-97f658d67d75"
//     }]
//   }, {
//     title: "Address",
//     child: [{
//       title: "Address List",
//       url: "/address"
//     }, {
//       title: "Add Address",
//       url: "/address/d27d0e28-c35e-4085-af1e-f9f1b1bd9c34"
//     }]
//   }, {
//     title: "Support tickets",
//     child: [{
//       title: "All tickets",
//       url: "/support-tickets"
//     }, {
//       title: "Ticket details",
//       url: "/support-tickets/when-will-my-product-arrive"
//     }]
//   }, {
//     title: "Wishlist",
//     url: "/wish-list"
//   }]
// }, {
//   megaMenu: false,
//   megaMenuWithSub: false,
//   title: "Vendor Account",
//   child: [{
//     title: "Dashboard",
//     url: "/vendor/dashboard"
//   }, {
//     title: "Products",
//     child: [{
//       title: "All products",
//       url: "/admin/products"
//     }, {
//       title: "Add/Edit product",
//       url: "/admin/products/lord-2019"
//     }]
//   }, {
//     title: "Orders",
//     child: [{
//       title: "All orders",
//       url: "/admin/orders"
//     }, {
//       title: "Order details",
//       url: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
//     }]
//   }, {
//     title: "Profile",
//     url: "/vendor/account-settings"
//   }]
// }];


// const navbarNavigation = [
// {
//   // megaMenu: false,
//   // megaMenuWithSub: true,
//   title: "Samsung",
//   child: categoriesMegaMenu
// },
// {
//   // megaMenu: false,
//   // megaMenuWithSub: true,
//   title: "Apple",
//   child: categoriesMegaMenu
// },
// {
//   // megaMenu: false,
//   // megaMenuWithSub: true,
//   title: "Motorolla",
//   child: categoriesMegaMenu
// },
// ];





// const navbarNavigation = [
//   {
//     // megaMenu: false,
//     // megaMenuWithSub: true,
//     title: "Samsung",
//     child: [{
//       title: "Phones",
//       child: [{
//         title: "Smartphones",
//         child: [{
//           title: "iPhone Series",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Samsung Galaxy",
//           url: "#",
//           icon: "UserTie"
//         }, {
//           title: "Google Pixel",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "OnePlus",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "Xiaomi & Redmi",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Oppo & Vivo",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Realme",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Refurbished Phones",
//           url: "#",
//           icon: "Vest"
//         }, {
//           title: "5G Phones",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "Budget Phones",
//           url: "#",
//           icon: "Vest"
//         }, {
//           title: "Gaming Phones",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "Foldable Phones",
//           url: "#",
//           icon: "Vest"
//         }]
//       }, {
//         title: "Feature Phones",
//         child: [{
//           title: "Nokia",
//           url: "#",
//           icon: "UserProfile"
//         }, {
//           title: "Itel",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "QMobile",
//           url: "#",
//           icon: "Accounts"
//         }, {
//           title: "Voice",
//           url: "#",
//           icon: "AdminEcommerce"
//         }, {
//           title: "GRight",
//           url: "#",
//           icon: "Calender"
//         }, {
//           title: "Haier",
//           url: "#",
//           icon: "Chat"
//         }, {
//           title: "Jazz Digit",
//           url: "#",
//           icon: "Customers"
//         }, {
//           title: "Dany",
//           url: "#",
//           icon: "Dashboard"
//         }, {
//           title: "iTel Smart",
//           url: "#",
//           icon: "DataTable"
//         }, {
//           title: "Other Brands",
//           url: "#",
//           icon: "Ecommerce"
//         }, {
//           title: "Flip Phones",
//           url: "#",
//           icon: "ElementHub"
//         }, {
//           title: "Mini Phones",
//           url: "#",
//           icon: "Invoice"
//         }]
//       }, {
//         title: "Phone Bundles",
//         child: [{
//           title: "Smartphone + Case",
//           url: "#",
//           icon: "Logout"
//         }, {
//           title: "Phone + Screen Protector",
//           url: "#",
//           icon: "Order"
//         }, {
//           title: "Combo Offers",
//           url: "#",
//           icon: "Pages"
//         }, {
//           title: "Phone + Charger",
//           url: "#",
//           icon: "Pricing"
//         }, {
//           title: "Starter Kits",
//           url: "#",
//           icon: "Products"
//         }, {
//           title: "Wholesale Deals",
//           url: "#",
//           icon: "ProjectChart"
//         }, {
//           title: "Bulk Orders",
//           url: "#",
//           icon: "Refund"
//         }, {
//           title: "Prepaid Offers",
//           url: "#",
//           icon: "Review"
//         }, {
//           title: "Postpaid Plans",
//           url: "#",
//           icon: "Seller"
//         }, {
//           title: "SIM + Phone Bundles",
//           url: "#",
//           icon: "Session"
//         }, {
//           title: "Corporate Packs",
//           url: "#",
//           icon: "Settings"
//         }, {
//           title: "Special Discounts",
//           url: "#",
//           icon: "TodoList"
//         }]
//       }]
//     }, {
//       title: "Phone Accessories",
//       child: [{
//         title: "Essential Accessories",
//         child: [{
//           url: "allProducts",
//           title: "Earphones & Headsets",
//           img: "/assets/images/products/bgearphone.png"
//         }, {
//           url: "allProducts/electronics",
//           title: "Charging Cables",
//           img: "/assets/images/products/Electronics/35.beatsbluetoothearpohones.png"
//         }, {
//           url: "#",
//           title: "Wireless Earbuds",
//           img: "/assets/images/products/Electronics/33.beatswirelessearphones.png"
//         }, {
//           url: "#",
//           title: "Cable Organizers",
//           img: "/assets/images/products/Electronics/2.COSOR1.png"
//         }, {
//           url: "#",
//           title: "Power Banks",
//           img: "/assets/images/products/Electronics/3.PanasonicCharge.png"
//         }, {
//           url: "#",
//           title: "Phone Cases",
//           img: "/assets/images/products/Electronics/32.iphone7.png"
//         }]
//       }, {
//         title: "Charging Equipment",
//         child: [{
//           url: "#",
//           title: "Wall Chargers",
//           img: "/assets/images/products/Electronics/5.AtechCam1080p.png"
//         }, {
//           url: "#",
//           title: "Car Chargers",
//           img: "/assets/images/products/Electronics/6.Sonya9.png"
//         }, {
//           url: "#",
//           title: "Wireless Chargers",
//           img: "/assets/images/products/Electronics/7.beatsw3.png"
//         }, {
//           url: "#",
//           title: "Charging Docks",
//           img: "/assets/images/products/Electronics/8.BenQ2020.png"
//         }, {
//           url: "#",
//           title: "Fast Chargers",
//           img: "/assets/images/products/Electronics/10.SonyPS4.png"
//         }]
//       }, {
//         title: "Smart Devices & Gadgets",
//         child: [{
//           url: "#",
//           title: "Smart Watches",
//           img: "/assets/images/products/Electronics/12.SonyBGB.png"
//         }, {
//           url: "#",
//           title: "Fitness Trackers",
//           img: "/assets/images/products/Electronics/13.LGProducts.png"
//         }, {
//           url: "#",
//           title: "Bluetooth Speakers",
//           img: "/assets/images/products/Electronics/14.Panasonic2019.png"
//         }, {
//           url: "#",
//           title: "Phone Holders",
//           img: "/assets/images/products/Electronics/15.DuneHD.png"
//         }, {
//           url: "#",
//           title: "Screen Protectors",
//           img: "/assets/images/products/Electronics/16.SonyCCTV.png"
//         }]
//       }]
//     }]
//   },
//   {
//     // megaMenu: false,
//     // megaMenuWithSub: true,
//     title: "Apple",
//     child: [{
//       title: "Phones",
//       child: [{
//         title: "Smartphones",
//         child: [{
//           title: "iPhone Series",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Samsung Galaxy",
//           url: "#",
//           icon: "UserTie"
//         }, {
//           title: "Google Pixel",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "OnePlus",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "Xiaomi & Redmi",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Oppo & Vivo",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Realme",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Refurbished Phones",
//           url: "#",
//           icon: "Vest"
//         }, {
//           title: "5G Phones",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "Budget Phones",
//           url: "#",
//           icon: "Vest"
//         }, {
//           title: "Gaming Phones",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "Foldable Phones",
//           url: "#",
//           icon: "Vest"
//         }]
//       }, {
//         title: "Feature Phones",
//         child: [{
//           title: "Nokia",
//           url: "#",
//           icon: "UserProfile"
//         }, {
//           title: "Itel",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "QMobile",
//           url: "#",
//           icon: "Accounts"
//         }, {
//           title: "Voice",
//           url: "#",
//           icon: "AdminEcommerce"
//         }, {
//           title: "GRight",
//           url: "#",
//           icon: "Calender"
//         }, {
//           title: "Haier",
//           url: "#",
//           icon: "Chat"
//         }, {
//           title: "Jazz Digit",
//           url: "#",
//           icon: "Customers"
//         }, {
//           title: "Dany",
//           url: "#",
//           icon: "Dashboard"
//         }, {
//           title: "iTel Smart",
//           url: "#",
//           icon: "DataTable"
//         }, {
//           title: "Other Brands",
//           url: "#",
//           icon: "Ecommerce"
//         }, {
//           title: "Flip Phones",
//           url: "#",
//           icon: "ElementHub"
//         }, {
//           title: "Mini Phones",
//           url: "#",
//           icon: "Invoice"
//         }]
//       }, {
//         title: "Phone Bundles",
//         child: [{
//           title: "Smartphone + Case",
//           url: "#",
//           icon: "Logout"
//         }, {
//           title: "Phone + Screen Protector",
//           url: "#",
//           icon: "Order"
//         }, {
//           title: "Combo Offers",
//           url: "#",
//           icon: "Pages"
//         }, {
//           title: "Phone + Charger",
//           url: "#",
//           icon: "Pricing"
//         }, {
//           title: "Starter Kits",
//           url: "#",
//           icon: "Products"
//         }, {
//           title: "Wholesale Deals",
//           url: "#",
//           icon: "ProjectChart"
//         }, {
//           title: "Bulk Orders",
//           url: "#",
//           icon: "Refund"
//         }, {
//           title: "Prepaid Offers",
//           url: "#",
//           icon: "Review"
//         }, {
//           title: "Postpaid Plans",
//           url: "#",
//           icon: "Seller"
//         }, {
//           title: "SIM + Phone Bundles",
//           url: "#",
//           icon: "Session"
//         }, {
//           title: "Corporate Packs",
//           url: "#",
//           icon: "Settings"
//         }, {
//           title: "Special Discounts",
//           url: "#",
//           icon: "TodoList"
//         }]
//       }]
//     }, {
//       title: "Phone Accessories",
//       child: [{
//         title: "Essential Accessories",
//         child: [{
//           url: "allProducts",
//           title: "Earphones & Headsets",
//           img: "/assets/images/products/bgearphone.png"
//         }, {
//           url: "allProducts/electronics",
//           title: "Charging Cables",
//           img: "/assets/images/products/Electronics/35.beatsbluetoothearpohones.png"
//         }, {
//           url: "#",
//           title: "Wireless Earbuds",
//           img: "/assets/images/products/Electronics/33.beatswirelessearphones.png"
//         }, {
//           url: "#",
//           title: "Cable Organizers",
//           img: "/assets/images/products/Electronics/2.COSOR1.png"
//         }, {
//           url: "#",
//           title: "Power Banks",
//           img: "/assets/images/products/Electronics/3.PanasonicCharge.png"
//         }, {
//           url: "#",
//           title: "Phone Cases",
//           img: "/assets/images/products/Electronics/32.iphone7.png"
//         }]
//       }, {
//         title: "Charging Equipment",
//         child: [{
//           url: "#",
//           title: "Wall Chargers",
//           img: "/assets/images/products/Electronics/5.AtechCam1080p.png"
//         }, {
//           url: "#",
//           title: "Car Chargers",
//           img: "/assets/images/products/Electronics/6.Sonya9.png"
//         }, {
//           url: "#",
//           title: "Wireless Chargers",
//           img: "/assets/images/products/Electronics/7.beatsw3.png"
//         }, {
//           url: "#",
//           title: "Charging Docks",
//           img: "/assets/images/products/Electronics/8.BenQ2020.png"
//         }, {
//           url: "#",
//           title: "Fast Chargers",
//           img: "/assets/images/products/Electronics/10.SonyPS4.png"
//         }]
//       }, {
//         title: "Smart Devices & Gadgets",
//         child: [{
//           url: "#",
//           title: "Smart Watches",
//           img: "/assets/images/products/Electronics/12.SonyBGB.png"
//         }, {
//           url: "#",
//           title: "Fitness Trackers",
//           img: "/assets/images/products/Electronics/13.LGProducts.png"
//         }, {
//           url: "#",
//           title: "Bluetooth Speakers",
//           img: "/assets/images/products/Electronics/14.Panasonic2019.png"
//         }, {
//           url: "#",
//           title: "Phone Holders",
//           img: "/assets/images/products/Electronics/15.DuneHD.png"
//         }, {
//           url: "#",
//           title: "Screen Protectors",
//           img: "/assets/images/products/Electronics/16.SonyCCTV.png"
//         }]
//       }]
//     }]
//   },
//   {
//     // megaMenu: false,
//     // megaMenuWithSub: true,
//     title: "Motorolla",
//     child: [{
//       title: "Phones",
//       child: [{
//         title: "Smartphones",
//         child: [{
//           title: "iPhone Series",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Samsung Galaxy",
//           url: "#",
//           icon: "UserTie"
//         }, {
//           title: "Google Pixel",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "OnePlus",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "Xiaomi & Redmi",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Oppo & Vivo",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Realme",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Refurbished Phones",
//           url: "#",
//           icon: "Vest"
//         }, {
//           title: "5G Phones",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "Budget Phones",
//           url: "#",
//           icon: "Vest"
//         }, {
//           title: "Gaming Phones",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "Foldable Phones",
//           url: "#",
//           icon: "Vest"
//         }]
//       }, {
//         title: "Feature Phones",
//         child: [{
//           title: "Nokia",
//           url: "#",
//           icon: "UserProfile"
//         }, {
//           title: "Itel",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "QMobile",
//           url: "#",
//           icon: "Accounts"
//         }, {
//           title: "Voice",
//           url: "#",
//           icon: "AdminEcommerce"
//         }, {
//           title: "GRight",
//           url: "#",
//           icon: "Calender"
//         }, {
//           title: "Haier",
//           url: "#",
//           icon: "Chat"
//         }, {
//           title: "Jazz Digit",
//           url: "#",
//           icon: "Customers"
//         }, {
//           title: "Dany",
//           url: "#",
//           icon: "Dashboard"
//         }, {
//           title: "iTel Smart",
//           url: "#",
//           icon: "DataTable"
//         }, {
//           title: "Other Brands",
//           url: "#",
//           icon: "Ecommerce"
//         }, {
//           title: "Flip Phones",
//           url: "#",
//           icon: "ElementHub"
//         }, {
//           title: "Mini Phones",
//           url: "#",
//           icon: "Invoice"
//         }]
//       }, {
//         title: "Phone Bundles",
//         child: [{
//           title: "Smartphone + Case",
//           url: "#",
//           icon: "Logout"
//         }, {
//           title: "Phone + Screen Protector",
//           url: "#",
//           icon: "Order"
//         }, {
//           title: "Combo Offers",
//           url: "#",
//           icon: "Pages"
//         }, {
//           title: "Phone + Charger",
//           url: "#",
//           icon: "Pricing"
//         }, {
//           title: "Starter Kits",
//           url: "#",
//           icon: "Products"
//         }, {
//           title: "Wholesale Deals",
//           url: "#",
//           icon: "ProjectChart"
//         }, {
//           title: "Bulk Orders",
//           url: "#",
//           icon: "Refund"
//         }, {
//           title: "Prepaid Offers",
//           url: "#",
//           icon: "Review"
//         }, {
//           title: "Postpaid Plans",
//           url: "#",
//           icon: "Seller"
//         }, {
//           title: "SIM + Phone Bundles",
//           url: "#",
//           icon: "Session"
//         }, {
//           title: "Corporate Packs",
//           url: "#",
//           icon: "Settings"
//         }, {
//           title: "Special Discounts",
//           url: "#",
//           icon: "TodoList"
//         }]
//       }]
//     }, {
//       title: "Phone Accessories",
//       child: [{
//         title: "Essential Accessories",
//         child: [{
//           url: "allProducts",
//           title: "Earphones & Headsets",
//           img: "/assets/images/products/bgearphone.png"
//         }, {
//           url: "allProducts/electronics",
//           title: "Charging Cables",
//           img: "/assets/images/products/Electronics/35.beatsbluetoothearpohones.png"
//         }, {
//           url: "#",
//           title: "Wireless Earbuds",
//           img: "/assets/images/products/Electronics/33.beatswirelessearphones.png"
//         }, {
//           url: "#",
//           title: "Cable Organizers",
//           img: "/assets/images/products/Electronics/2.COSOR1.png"
//         }, {
//           url: "#",
//           title: "Power Banks",
//           img: "/assets/images/products/Electronics/3.PanasonicCharge.png"
//         }, {
//           url: "#",
//           title: "Phone Cases",
//           img: "/assets/images/products/Electronics/32.iphone7.png"
//         }]
//       }, {
//         title: "Charging Equipment",
//         child: [{
//           url: "#",
//           title: "Wall Chargers",
//           img: "/assets/images/products/Electronics/5.AtechCam1080p.png"
//         }, {
//           url: "#",
//           title: "Car Chargers",
//           img: "/assets/images/products/Electronics/6.Sonya9.png"
//         }, {
//           url: "#",
//           title: "Wireless Chargers",
//           img: "/assets/images/products/Electronics/7.beatsw3.png"
//         }, {
//           url: "#",
//           title: "Charging Docks",
//           img: "/assets/images/products/Electronics/8.BenQ2020.png"
//         }, {
//           url: "#",
//           title: "Fast Chargers",
//           img: "/assets/images/products/Electronics/10.SonyPS4.png"
//         }]
//       }, {
//         title: "Smart Devices & Gadgets",
//         child: [{
//           url: "#",
//           title: "Smart Watches",
//           img: "/assets/images/products/Electronics/12.SonyBGB.png"
//         }, {
//           url: "#",
//           title: "Fitness Trackers",
//           img: "/assets/images/products/Electronics/13.LGProducts.png"
//         }, {
//           url: "#",
//           title: "Bluetooth Speakers",
//           img: "/assets/images/products/Electronics/14.Panasonic2019.png"
//         }, {
//           url: "#",
//           title: "Phone Holders",
//           img: "/assets/images/products/Electronics/15.DuneHD.png"
//         }, {
//           url: "#",
//           title: "Screen Protectors",
//           img: "/assets/images/products/Electronics/16.SonyCCTV.png"
//         }]
//       }]
//     }]
//   },

//   //new 
//   {
//     // megaMenu: false,
//     // megaMenuWithSub: true,
//     title: "Google",
//     child: [{
//       title: "Phones",
//       child: [{
//         title: "Smartphones",
//         child: [{
//           title: "iPhone Series",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Samsung Galaxy",
//           url: "#",
//           icon: "UserTie"
//         }, {
//           title: "Google Pixel",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "OnePlus",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "Xiaomi & Redmi",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Oppo & Vivo",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Realme",
//           url: "#",
//           icon: "Shirt"
//         }, {
//           title: "Refurbished Phones",
//           url: "#",
//           icon: "Vest"
//         }, {
//           title: "5G Phones",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "Budget Phones",
//           url: "#",
//           icon: "Vest"
//         }, {
//           title: "Gaming Phones",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "Foldable Phones",
//           url: "#",
//           icon: "Vest"
//         }]
//       }, {
//         title: "Feature Phones",
//         child: [{
//           title: "Nokia",
//           url: "#",
//           icon: "UserProfile"
//         }, {
//           title: "Itel",
//           url: "#",
//           icon: "Shoe"
//         }, {
//           title: "QMobile",
//           url: "#",
//           icon: "Accounts"
//         }, {
//           title: "Voice",
//           url: "#",
//           icon: "AdminEcommerce"
//         }, {
//           title: "GRight",
//           url: "#",
//           icon: "Calender"
//         }, {
//           title: "Haier",
//           url: "#",
//           icon: "Chat"
//         }, {
//           title: "Jazz Digit",
//           url: "#",
//           icon: "Customers"
//         }, {
//           title: "Dany",
//           url: "#",
//           icon: "Dashboard"
//         }, {
//           title: "iTel Smart",
//           url: "#",
//           icon: "DataTable"
//         }, {
//           title: "Other Brands",
//           url: "#",
//           icon: "Ecommerce"
//         }, {
//           title: "Flip Phones",
//           url: "#",
//           icon: "ElementHub"
//         }, {
//           title: "Mini Phones",
//           url: "#",
//           icon: "Invoice"
//         }]
//       }, {
//         title: "Phone Bundles",
//         child: [{
//           title: "Smartphone + Case",
//           url: "#",
//           icon: "Logout"
//         }, {
//           title: "Phone + Screen Protector",
//           url: "#",
//           icon: "Order"
//         }, {
//           title: "Combo Offers",
//           url: "#",
//           icon: "Pages"
//         }, {
//           title: "Phone + Charger",
//           url: "#",
//           icon: "Pricing"
//         }, {
//           title: "Starter Kits",
//           url: "#",
//           icon: "Products"
//         }, {
//           title: "Wholesale Deals",
//           url: "#",
//           icon: "ProjectChart"
//         }, {
//           title: "Bulk Orders",
//           url: "#",
//           icon: "Refund"
//         }, {
//           title: "Prepaid Offers",
//           url: "#",
//           icon: "Review"
//         }, {
//           title: "Postpaid Plans",
//           url: "#",
//           icon: "Seller"
//         }, {
//           title: "SIM + Phone Bundles",
//           url: "#",
//           icon: "Session"
//         }, {
//           title: "Corporate Packs",
//           url: "#",
//           icon: "Settings"
//         }, {
//           title: "Special Discounts",
//           url: "#",
//           icon: "TodoList"
//         }]
//       }]
//     }, {
//       title: "Phone Accessories",
//       child: [{
//         title: "Essential Accessories",
//         child: [{
//           url: "allProducts",
//           title: "Earphones & Headsets",
//           img: "/assets/images/products/bgearphone.png"
//         }, {
//           url: "allProducts/electronics",
//           title: "Charging Cables",
//           img: "/assets/images/products/Electronics/35.beatsbluetoothearpohones.png"
//         }, {
//           url: "#",
//           title: "Wireless Earbuds",
//           img: "/assets/images/products/Electronics/33.beatswirelessearphones.png"
//         }, {
//           url: "#",
//           title: "Cable Organizers",
//           img: "/assets/images/products/Electronics/2.COSOR1.png"
//         }, {
//           url: "#",
//           title: "Power Banks",
//           img: "/assets/images/products/Electronics/3.PanasonicCharge.png"
//         }, {
//           url: "#",
//           title: "Phone Cases",
//           img: "/assets/images/products/Electronics/32.iphone7.png"
//         }]
//       }, {
//         title: "Charging Equipment",
//         child: [{
//           url: "#",
//           title: "Wall Chargers",
//           img: "/assets/images/products/Electronics/5.AtechCam1080p.png"
//         }, {
//           url: "#",
//           title: "Car Chargers",
//           img: "/assets/images/products/Electronics/6.Sonya9.png"
//         }, {
//           url: "#",
//           title: "Wireless Chargers",
//           img: "/assets/images/products/Electronics/7.beatsw3.png"
//         }, {
//           url: "#",
//           title: "Charging Docks",
//           img: "/assets/images/products/Electronics/8.BenQ2020.png"
//         }, {
//           url: "#",
//           title: "Fast Chargers",
//           img: "/assets/images/products/Electronics/10.SonyPS4.png"
//         }]
//       }, {
//         title: "Smart Devices & Gadgets",
//         child: [{
//           url: "#",
//           title: "Smart Watches",
//           img: "/assets/images/products/Electronics/12.SonyBGB.png"
//         }, {
//           url: "#",
//           title: "Fitness Trackers",
//           img: "/assets/images/products/Electronics/13.LGProducts.png"
//         }, {
//           url: "#",
//           title: "Bluetooth Speakers",
//           img: "/assets/images/products/Electronics/14.Panasonic2019.png"
//         }, {
//           url: "#",
//           title: "Phone Holders",
//           img: "/assets/images/products/Electronics/15.DuneHD.png"
//         }, {
//           url: "#",
//           title: "Screen Protectors",
//           img: "/assets/images/products/Electronics/16.SonyCCTV.png"
//         }]
//       }]
//     }]
//   },
//   ];


// const navbarNavigation = [
//   {
//     title: "Accessories",
//     child: [
//       {
//         title: "Screen Protectors",
//         child: [
//           {
//             title: "Apple",
//             icon: "Vest",
//             child: [
//               {
//                 title: "iPhone protectors", url: "#", icon: "Shirt",
//                 child: [
//                   {
//                     title: "iphone 12", url: "#", child: [
//                       { title: "a", url: "#", icon: "Vest" },
//                       { title: "b", url: "#", icon: "UserProfile" },
//                       { title: "c", url: "#", icon: "Accounts" }
//                     ]
//                   },
//                   { title: "iphone 14", url: "#", icon: "UserProfile" },
//                   { title: "iphone 16", url: "#", icon: "Accounts" }
//                 ]
//               },
//               {
//                 title: "iPad Protectors", url: "#", icon: "UserTie", child: [
//                   { title: "universal", url: "#", icon: "Vest" },
//                   { title: "ipad 13 pro", url: "#", icon: "UserProfile" },
//                   { title: "ipad 12.9(3rd gen)", url: "#", icon: "Accounts" }
//                 ]
//               },
//               {
//                 title: "MacBook Pro tectors", url: "#", icon: "Shirt", child: [
//                   { title: "universal", url: "#", icon: "Vest" },
//                   { title: "ipad 13 pro", url: "#", icon: "UserProfile" },
//                   { title: "ipad 12.9(3rd gen)", url: "#", icon: "Accounts" }
//                 ]
//               },
//               { title: "AirPods Protectors", url: "#", icon: "Shoe" }
//             ]
//           },
//           {
//             title: "Samsung",
//             child: [
//               { title: "S series", url: "#", icon: "Vest" },
//               { title: "A series", url: "#", icon: "UserProfile" },
//               { title: "z series", url: "#", icon: "Accounts" }
//             ]
//           },
//           {
//             title: "Google",
//             child: [
//               { title: "Pixel 7 Pro", url: "#", icon: "Shirt" },
//               { title: "Pixel Tablet", url: "#", icon: "Shoe" }
//             ]
//           }
//         ]
//       }]
//   },
//   {
//     title: "Cases & Covers",
//     child: [
//       {
//         title: "Apple",
//         child: [
//           { title: "iPhone Cases", url: "#", icon: "Shirt" },
//           { title: "iPad Cases", url: "#", icon: "UserTie" },
//           { title: "MacBook Cases", url: "#", icon: "Shirt" }
//         ]
//       },
//       {
//         title: "Samsung",
//         child: [
//           { title: "Galaxy S Series Cases", url: "#", icon: "Shoe" },
//           { title: "Galaxy Note Cases", url: "#", icon: "Vest" },
//           { title: "Tablet Cases", url: "#", icon: "UserProfile" }
//         ]
//       },
//       {
//         title: "Google",
//         child: [
//           { title: "Pixel 6 Series", url: "#", icon: "Shirt" },
//           { title: "Pixel 7 Series", url: "#", icon: "UserTie" }
//         ]
//       }
//     ]
//   },
//   {
//     title: "Repair Parts",
//     child: [
//       {
//         title: "LCD Screens",
//         child: [
//           { title: "iPhone LCDs", url: "#", icon: "Shirt" },
//           { title: "Samsung LCDs", url: "#", icon: "Shoe" },
//           { title: "Google LCDs", url: "#", icon: "Vest" }
//         ]
//       },
//       {
//         title: "Batteries",
//         child: [
//           { title: "iPhone Batteries", url: "#", icon: "UserProfile" },
//           { title: "Samsung Batteries", url: "#", icon: "Accounts" }
//         ]
//       }
//     ]
//   },
//   {
//     title: "Brands",
//     child: [
//       {
//         title: "Apple",
//         child: [
//           { title: "iPhone", url: "#", icon: "Shirt" },
//           { title: "iPad", url: "#", icon: "UserTie" },
//           { title: "MacBook", url: "#", icon: "Shirt" }
//         ]
//       },
//       {
//         title: "Samsung",
//         child: [
//           { title: "Galaxy S Series", url: "#", icon: "Shoe" },
//           { title: "Galaxy Note Series", url: "#", icon: "Vest" }
//         ]
//       }
//     ]
//   },
//   {
//     title: "Tools & Equipment",
//     child: [
//       {
//         title: "Repair Toolkits",
//         child: [
//           { title: "Basic Kits", url: "#", icon: "UserProfile" },
//           { title: "Professional Kits", url: "#", icon: "Shoe" }
//         ]
//       },
//       {
//         title: "Adhesives & Tapes",
//         child: [
//           { title: "Screen Adhesives", url: "#", icon: "Accounts" },
//           { title: "Double-Sided Tapes", url: "#", icon: "AdminEcommerce" }
//         ]
//       }
//     ]
//   },
//   {
//     title: "More",
//     child: [
//       { title: "Gift Cards", url: "#", icon: "Shirt" },
//       { title: "Clearance Sale", url: "#", icon: "UserTie" },
//       { title: "Bundle Deals", url: "#", icon: "Shirt" }
//     ]
//   }
// ];




// const navbarNavigation = [
//   {
//     "title": "Accessories",
//     "child": [
//       {
//         "title": "Screen Protectors",
//         "child": [
//           {
//             "title": "Apple",
//              "icon": "Vest",
//             "child": [
//               {
//                 "title": "iPhone Protectors",
//                 "url": "#",
//                 "child": [
//                   { "title": "iPhone 12", "url": "#" , "icon": "Vest",},
//                   { "title": "iPhone 14", "url": "#" },
//                   { "title": "iPhone 16", "url": "#" }
//                 ]
//               },
//               {
//                 "title": "iPad Protectors",
//                 "url": "#",
//                 "child": [
//                   { "title": "Universal", "url": "#" },
//                   { "title": "iPad 13 Pro", "url": "#" },
//                   { "title": "iPad 12.9 (3rd Gen)", "url": "#" }
//                 ]
//               },
//               {
//                 "title": "MacBook Protectors",
//                 "url": "#",
//                 "child": [
//                   { "title": "Universal", "url": "#" },
//                   { "title": "MacBook Air 2022", "url": "#" },
//                   { "title": "MacBook Pro 2023", "url": "#" }
//                 ]
//               },
//               {
//                 "title": "AirPods Protectors",
//                 "url": "#"
//               }
//             ]
//           },
//           {
//             "title": "Samsung",
//             "child": [
//               { "title": "S Series", "url": "#" },
//               { "title": "A Series", "url": "#" },
//               { "title": "Z Series", "url": "#" }
//             ]
//           },
//           {
//             "title": "Google",
//             "child": [
//               { "title": "Pixel 7 Pro", "url": "#" },
//               { "title": "Pixel Tablet", "url": "#" }
//             ]
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "title": "Cases & Covers",
//     "child": [
//       {
//         "title": "Apple",
//         "child": [
//           { "title": "iPhone Cases", "url": "#" },
//           { "title": "iPad Cases", "url": "#" },
//           { "title": "MacBook Cases", "url": "#" }
//         ]
//       },
//       {
//         "title": "Samsung",
//         "child": [
//           { "title": "Galaxy S Series Cases", "url": "#" },
//           { "title": "Galaxy Note Cases", "url": "#" },
//           { "title": "Tablet Cases", "url": "#" }
//         ]
//       },
//       {
//         "title": "Google",
//         "child": [
//           { "title": "Pixel 6 Series", "url": "#" },
//           { "title": "Pixel 7 Series", "url": "#" }
//         ]
//       }
//     ]
//   },
//   {
//     "title": "Repair Parts",
//     "child": [
//       {
//         "title": "Screens & Displays",
//         "child": [
//           {
//             "title": "iPhone Screens",
//             "child": [
//               {
//                 "title": "iPhone 11 Screen",
//                 "url": "/parts/iphone-screens/iphone-11"
//               },
//               {
//                 "title": "iPhone 12 Screen",
//                 "url": "/parts/iphone-screens/iphone-12"
//               }
//             ]
//           },
//           {
//             "title": "Samsung Displays",
//             "url": "/parts/samsung-displays"
//           }
//         ]
//       },
//       {
//         "title": "Batteries",
//         "child": [
//           {
//             "title": "iPhone Batteries",
//             "url": "/parts/iphone-batteries"
//           },
//           {
//             "title": "Samsung Batteries",
//             "url": "/parts/samsung-batteries"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "title": "Brands",
//     "child": [
//       {
//         "title": "Apple",
//         "child": [
//           { "title": "iPhone", "url": "#" },
//           { "title": "iPad", "url": "#" },
//           { "title": "MacBook", "url": "#" }
//         ]
//       },
//       {
//         "title": "Samsung",
//         "child": [
//           { "title": "Galaxy S Series", "url": "#" },
//           { "title": "Galaxy Note Series", "url": "#" }
//         ]
//       }
//     ]
//   },
//   {
//     "title": "Tools & Equipment",
//     "child": [
//       {
//         "title": "Repair Toolkits",
//         "child": [
//           { "title": "Basic Kits", "url": "#" },
//           { "title": "Professional Kits", "url": "#" }
//         ]
//       },
//       {
//         "title": "Adhesives & Tapes",
//         "child": [
//           { "title": "Screen Adhesives", "url": "#" },
//           { "title": "Double-Sided Tapes", "url": "#" }
//         ]
//       }
//     ]
//   },
//   {
//     "title": "More",
//     "child": [
//       { "title": "Gift Cards", "url": "#" },
//       { "title": "Clearance Sale", "url": "#" },
//       { "title": "Bundle Deals", "url": "#" }
//     ]
//   }
// ];

const navbarNavigation =[
  {
    "title": "Accessories",
    "icon": "Products",
    "child": [
      {
        "title": "Screen Protectors",
        "icon": "Vest",
        "child": [
          {
            "title": "Apple",
            "icon": "Dashboard",
            "child": [
              {
                "title": "iPhone Protectors",
                "url": "#",
                "icon": "Chat",
                "child": [
                  { "title": "iPhone 12", "url": "#", "icon": "Chat" },
                  { "title": "iPhone 14", "url": "#", "icon": "Chat" },
                  { "title": "iPhone 16", "url": "#", "icon": "Chat" }
                ]
              },
              {
                "title": "iPad Protectors",
                "url": "#",
                "icon": "Vest",
                "child": [
                  { "title": "Universal", "url": "#", "icon": "Settings" },
                  { "title": "iPad 13 Pro", "url": "#", "icon": "Settings" },
                  { "title": "iPad 12.9 (3rd Gen)", "url": "#", "icon": "Settings" }
                ]
              },
              {
                "title": "MacBook Protectors",
                "url": "#",
                "icon": "Ecommerce",
                "child": [
                  { "title": "Universal", "url": "#", "icon": "Settings" },
                  { "title": "MacBook Air 2022", "url": "#", "icon": "Settings" },
                  { "title": "MacBook Pro 2023", "url": "#", "icon": "Settings" }
                ]
              },
              {
                "title": "AirPods Protectors",
                "url": "#",
                "icon": "Review"
              }
            ]
          },
          {
            "title": "Samsung",
            "icon": "AdminEcommerce",
            "child": [
              { "title": "S Series", "url": "#", "icon": "Chat" },
              { "title": "A Series", "url": "#", "icon": "Chat" },
              { "title": "Z Series", "url": "#", "icon": "Chat" }
            ]
          },
          {
            "title": "Google",
            "icon": "ElementHub",
            "child": [
              { "title": "Pixel 7 Pro", "url": "#", "icon": "Chat" },
              { "title": "Pixel Tablet", "url": "#", "icon": "Chat" }
            ]
          }
        ]
      },
      {
        "title": "Weesee Protectors",
        "icon": "Vest",
        "child": [
          {
            "title": "Apple",
            "icon": "Dashboard",
            "child": [
              {
                "title": "iPhone Protectors",
                "url": "#",
                "icon": "Chat",
                "child": [
                  { "title": "iPhone 12", "url": "#", "icon": "Chat" },
                  { "title": "iPhone 14", "url": "#", "icon": "Chat" },
                  { "title": "iPhone 16", "url": "#", "icon": "Chat" }
                ]
              },
              {
                "title": "iPad Protectors",
                "url": "#",
                "icon": "Vest",
                "child": [
                  { "title": "Universal", "url": "#", "icon": "Settings" },
                  { "title": "iPad 13 Pro", "url": "#", "icon": "Settings" },
                  { "title": "iPad 12.9 (3rd Gen)", "url": "#", "icon": "Settings" }
                ]
              },
              {
                "title": "MacBook Protectors",
                "url": "#",
                "icon": "Ecommerce",
                "child": [
                  { "title": "Universal", "url": "#", "icon": "Settings" },
                  { "title": "MacBook Air 2022", "url": "#", "icon": "Settings" },
                  { "title": "MacBook Pro 2023", "url": "#", "icon": "Settings" }
                ]
              },
              {
                "title": "AirPods Protectors",
                "url": "#",
                "icon": "Review"
              }
            ]
          },
          {
            "title": "Samsung",
            "icon": "AdminEcommerce",
            "child": [
              { "title": "S Series", "url": "#", "icon": "Chat" },
              { "title": "A Series", "url": "#", "icon": "Chat" },
              { "title": "Z Series", "url": "#", "icon": "Chat" }
            ]
          },
          {
            "title": "Google",
            "icon": "ElementHub",
            "child": [
              { "title": "Pixel 7 Pro", "url": "#", "icon": "Chat" },
              { "title": "Pixel Tablet", "url": "#", "icon": "Chat" }
            ]
          }
        ]
      }
    ]
  },
  {
    "title": "Cases & Covers",
    "icon": "Shirt",
    "child": [
      {
        "title": "Apple",
        "icon": "Dashboard",
        "child": [
          { "title": "iPhone Cases", "url": "#", "icon": "Chat",
            "child": [
              {
                "title": "iPhone Protectors",
                "url": "#",
                "icon": "Chat",
                "child": [
                  { "title": "iPhone 12", "url": "#", "icon": "Chat" },
                  { "title": "iPhone 14", "url": "#", "icon": "Chat" },
                  { "title": "iPhone 16", "url": "#", "icon": "Chat" }
                ]
              },
            ]
           },
          { "title": "iPad Cases", "url": "#", "icon": "Chat" },
          { "title": "MacBook Cases", "url": "#", "icon": "Ecommerce" }
        ]
      },
      {
        "title": "Samsung",
        "icon": "AdminEcommerce",
        "child": [
          { "title": "Galaxy S Series Cases", "url": "#", "icon": "Chat" },
          { "title": "Galaxy Note Cases", "url": "#", "icon": "Chat" },
          { "title": "Tablet Cases", "url": "#", "icon": "Chat" }
        ]
      },
      {
        "title": "Google",
        "icon": "ElementHub",
        "child": [
          { "title": "Pixel 6 Series", "url": "#", "icon": "Chat" },
          { "title": "Pixel 7 Series", "url": "#", "icon": "Chat" }
        ]
      }
    ]
  },
  {
    "title": "Repair Parts",
    "icon": "Settings",
    "child": [
      {
        "title": "Screens & Displays",
        "icon": "SiteSetting",
        "child": [
          {
            "title": "iPhone Screens",
            "icon": "Dashboard",
            "child": [
              {
                "title": "iPhone 11 Screen",
                "url": "/parts/iphone-screens/iphone-11",
                "icon": "Chat"
              },
              {
                "title": "iPhone 12 Screen",
                "url": "/parts/iphone-screens/iphone-12",
                "icon": "Chat"
              }
            ]
          },
          {
            "title": "Samsung Displays",
            "url": "/parts/samsung-displays",
            "icon": "AdminEcommerce"
          }
        ]
      },
      {
        "title": "Batteries",
        "icon": "AccountSetting",
        "child": [
          {
            "title": "iPhone Batteries",
            "url": "/parts/iphone-batteries",
            "icon": "Dashboard"
          },
          {
            "title": "Samsung Batteries",
            "url": "/parts/samsung-batteries",
            "icon": "AdminEcommerce"
          }
        ]
      }
    ]
  },
  {
    "title": "Brands",
    "icon": "Seller",
    "child": [
      {
        "title": "Apple",
        "icon": "Dashboard",
        "child": [
          { "title": "iPhone", "url": "#", "icon": "Chat" },
          { "title": "iPad", "url": "#", "icon": "Chat" },
          { "title": "MacBook", "url": "#", "icon": "Ecommerce" }
        ]
      },
      {
        "title": "Samsung",
        "icon": "AdminEcommerce",
        "child": [
          { "title": "Galaxy S Series", "url": "#", "icon": "Chat" },
          { "title": "Galaxy Note Series", "url": "#", "icon": "Chat" }
        ]
      }
    ]
  },
  {
    "title": "Tools & Equipment",
    "icon": "ProjectChart",
    "child": [
      {
        "title": "Repair Toolkits",
        "icon": "TodoList",
        "child": [
          { "title": "Basic Kits", "url": "#", "icon": "Settings" },
          { "title": "Professional Kits", "url": "#", "icon": "Settings" }
        ]
      },
      {
        "title": "Adhesives & Tapes",
        "icon": "Invoice",
        "child": [
          { "title": "Screen Adhesives", "url": "#", "icon": "Settings" },
          { "title": "Double-Sided Tapes", "url": "#", "icon": "Settings" }
        ]
      }
    ]
  },
  {
    "title": "More",
    "icon": "DataTable",
    "child": [
      { "title": "Blog", "url": "/blog", "icon": "Pages" },
      { "title": "Gift Cards", "url": "#", "icon": "Pricing" },
      { "title": "Clearance Sale", "url": "#", "icon": "Refund" },
      { "title": "Bundle Deals", "url": "#", "icon": "Accounts" }
    ]
  }
];









export default navbarNavigation;



