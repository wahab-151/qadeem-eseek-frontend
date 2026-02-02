import { cache } from "react";
export const MENUS = [
  {
    title: "",
    list: [
      {
        icon: "AccountCircleOutlined",
        href: "/profile",
        title: "Account",
      },
      {
        icon: "PlaceOutlined",
        href: "/address",
        title: "Address",
      },
      {
        icon: "ShoppingBagOutlined",
        href: "/orders",
        title: "Orders",
      },
      {
        icon: "LogoutOutlined",
        href: "/logout",
        title: "Log Out",
      },
    ],
  },
];
export const getNavigation = cache(async () => MENUS);
