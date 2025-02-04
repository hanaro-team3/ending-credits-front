import { RouteObject } from "react-router-dom";
import AssetPage from "../pages/AssetPage/AssetPage";
import AssetRegisterPage from "../pages/AssetPage/AssetRegisterPage/AssetRegisterPage";
import AssetCalculatePage from "../pages/AssetPage/AssetCalculatePage/AssetCalculatePage";
import AssetDetailPage from "../pages/AssetPage/AssetDetailPage/AssetDetailPage";
import AssetListPage from "../pages/AssetPage/AssetListPage/AssetListPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProductComparePage from "../pages/ProductPage/ProductComparePage/ProductComparePage";
import ProductSearch from "../pages/ProductPage/ProductSearch/ProductSearch";
import ProductDetail from "../pages/ProductPage/ProductDetail/ProductDetail";
import ProductSearchForCompare from "../pages/ProductPage/ProductSearch/ProductSearchForCompare";
import AssetModifyPage from "../pages/AssetPage/AssetModifyPage/AssetModifyPage";

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
  {
    path: "/asset/modify/:label",
    element: <AssetModifyPage />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/product/compare",
    element: <ProductComparePage />,
  },
  {
    path: "/product/search",
    element: <ProductSearch />,
  },
  {
    path: "/product/detail/:id",
    element: <ProductDetail />,
  },
  {
    path: "/product/search/compare",
    element: <ProductSearchForCompare />
  }
];

export default AssetRoutes; 