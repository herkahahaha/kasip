// import { MaterialUIComponentsNavigation } from "app/main/documentation/material-ui-components/MaterialUIComponentsNavigation";
import { authRoles } from "app/auth";

const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    type: "group",
    icon: "apps",
    children: [
      // {
      //   id: "login",
      //   title: "",
      //   type: "item",
      //   url: "/login",
      //   auth: authRoles.onlyGuest,
      //   icon: "lock"
      // },
      // {
      //   id: "register",
      //   title: "Register",
      //   type: "item",
      //   url: "/register",
      //   icon: "lock"
      // },
      {
        id: "vessel",
        title: "Vessel",
        type: "collapse",
        icon: "shopping_cart",
        url: "/vessel",
        children: [
          {
            id: "vessel-products",
            title: "Products",
            type: "item",
            url: "/vessel/products",
            exact: true
          },
          {
            id: "vessel-product-detail",
            title: "Product Detail",
            type: "item",
            url: "/vessel/products/1/a-walk-amongst-friends-canvas-print",
            exact: true
          },
          {
            id: "vessel-new-product",
            title: "New Product",
            type: "item",
            url: "/vessel/products/new",
            exact: true
          },
          {
            id: "vessel-orders",
            title: "Orders",
            type: "item",
            url: "/vessel/orders",
            exact: true
          },
          {
            id: "vessel-order-detail",
            title: "Order Detail",
            type: "item",
            url: "/vessel/orders/1",
            exact: true
          }
        ]
      }
    ]
  }
];

export default navigationConfig;
