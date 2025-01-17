import { RouteObject } from "react-router-dom";
import AssetPage from "../pages/AssetPage/AssetPage";

const AssetRoutes: RouteObject[] = [
  {
    path: "/asset",
    element: <AssetPage />,
  },
];

export default AssetRoutes; 