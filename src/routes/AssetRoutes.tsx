import { RouteObject } from "react-router-dom";
import AssetPage from "../pages/AssetPage/AssetPage";
import CalculatePage from "../pages/AssetPage/CalculatePage";
import AssetDetailPage from "../pages/AssetPage/AssetDetailPage";

const AssetRoutes: RouteObject[] = [
  {
    path: "/asset",
    element: <AssetPage />,
  },
  {
    path: "/asset/calculate",
    element: <CalculatePage />,
  },
  {
    path: "/asset/detail",
    element: <AssetDetailPage />,
  },
];

export default AssetRoutes; 