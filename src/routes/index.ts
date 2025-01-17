import { RouteObject } from "react-router-dom";
import AssetRoutes from "./AssetRoutes";
import AuthRoutes from "./AuthRoutes";
import InheritanceRoutes from "./InheritanceRoutes";
import MainRoutes from "./MainRoutes";
import ProfileRoutes from "./ProfileRoutes";

const routes: RouteObject[] = [...AssetRoutes, ...AuthRoutes, ...InheritanceRoutes, ...MainRoutes, ...ProfileRoutes];

export default routes;