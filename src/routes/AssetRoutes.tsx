import { RouteObject } from "react-router-dom";
import AssetPage from "../pages/AssetPage/AssetPage";
import AssetRegisterPage from "../pages/AssetPage/AssetRegisterPage/AssetRegisterPage";
import AssetCalculatePage from "../pages/AssetPage/AssetCalculatePage/AssetCalculatePage";
import AssetDetailPage from "../pages/AssetPage/AssetDetailPage/AssetDetailPage";
import AssetListPage from "../pages/AssetPage/AssetListPage/AssetListPage";

const AssetRoutes: RouteObject[] = [
  {
    path: "/asset",
    element: <AssetPage />,
  },
  {
    path: "/asset/register",
    element: <AssetRegisterPage />,
  },  {
    path: "/asset/calculate",
    element: <AssetCalculatePage />,
  },
  {
    path: "/asset/list",
    element: <AssetListPage />,
  },
  {
    path: "/asset/detail/:label",
    element: <AssetDetailPage />,
  },
];

export default AssetRoutes; 