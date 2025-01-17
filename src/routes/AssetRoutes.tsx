import { RouteObject } from "react-router-dom";
import AssetPage from "../pages/AssetPage/AssetPage";
import CalculatePage from "../pages/AssetPage/CalculatePage";

const AssetRoutes: RouteObject[] = [
  {
    path: "/asset",
    element: <AssetPage />,
  },
  {
    path: "/asset/calculate",
    element: <CalculatePage />,
  },
];

export default AssetRoutes; 