import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse";
import { MainConfig } from "../main/mainConfigs";

const routeConfigs = [...MainConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    component: () => <Redirect to="/login" />
  }
];

export default routes;
