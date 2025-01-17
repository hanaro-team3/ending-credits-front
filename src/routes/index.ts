import { RouteObject } from "react-router-dom";
import AssetRoutes from "./AssetRoutes";
import AuthRoutes from "./AuthRoutes";
import InheritanceRoutes from "./InheritanceRoutes";
import MainRoutes from "./MainRoutes";
import MyRoutes from "./MyRoutes";

const routes: RouteObject[] = [...AssetRoutes, ...AuthRoutes, ...InheritanceRoutes, ...MainRoutes, ...MyRoutes];

export default routes;