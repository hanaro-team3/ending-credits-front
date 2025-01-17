import { RouteObject } from "react-router-dom";
import InheritancePage from "../pages/InheritancePage/InheritanceStartPage";
import UploadPhotoPage from "../pages/InheritancePage/UploadPhotoPage/UploadPhotoPage";
import RecordPage from "../pages/InheritancePage/RecordPage/RecordPage";

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
    }
  ];
  
  export default InheritanceRoutes;