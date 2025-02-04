import { RouteObject } from "react-router-dom";
import InheritancePage from "../pages/InheritancePage/InheritanceStartPage";
import UploadPhotoPage from "../pages/InheritancePage/UploadPhotoPage/UploadPhotoPage";
import RecordPage from "../pages/InheritancePage/RecordPage/RecordPage";
import ClickPage from "../pages/InheritancePage/ClickPage/ClickPage";
import BlockChainPage from "../pages/InheritancePage/pages/BlockChainPage";

const InheritanceRoutes: RouteObject[] = [
	{
		path: "/inheritance",
		element: <InheritancePage />,
	},
	{
		path: "/inheritance/photo",
		element: <UploadPhotoPage />,
	},
	{
		path: "/inheritance/record",
		element: <RecordPage />,
	},
	{
		path: "/inheritance/click",
		element: <ClickPage />,
	},
	{
		path: "/inheritance/blockchain",
		element: <BlockChainPage />,
	},
];

export default InheritanceRoutes;
