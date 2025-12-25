import duotone from "icons/duotone";

export const salespersonNavigation = [{
  type: "label",
  label: "Sales Person Portal"
}, {
  name: "Dashboard",
  icon: duotone.Dashboard,
  path: "/admin/dashboard"
}, {
  name: "Customers",
  icon: duotone.Customers,
  path: "/admin/customers"
}, {
  name: "Orders",
  icon: duotone.Order,
  children: [{
    name: "Order List",
    path: "/admin/orders"
  }]
}, {
  name: "Requests",
  icon: duotone.Refund,
  children: [{
    name: "Request List",
    path: "/admin/refund-request"
  }]
}, {
  name: "Logout",
  icon: duotone.Session,
  path: "/"
}];
