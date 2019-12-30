import React from "react";
import { Redirect } from "react-router-dom";

export const VesselAppConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false
        }
      }
    }
  },
  routes: [
    {
      path: "/vessel/products/:productId/:productHandle?",
      component: React.lazy(() => import("./product/Product"))
    },
    {
      path: "/vessel/products",
      component: React.lazy(() => import("./products/Products"))
    },
    {
      path: "/vessel/orders/:orderId",
      component: React.lazy(() => import("./order/Order"))
    },
    {
      path: "/vessel/orders",
      component: React.lazy(() => import("./orders/Orders"))
    },
    {
      path: "/vessel",
      component: () => <Redirect to="/vessel/products" />
    }
  ]
};
