import { RouteObject } from "react-router-dom";
import OnboardingPage from "../pages/OnboardingPage/OnboardingPage";
import MainPage from "../pages/MainPage/MainPage";
import GuidePage from "../pages/GuidePage/GuidePage";

const MainRoutes: RouteObject[] = [
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/guide",
    element: <GuidePage />,
  }
];

export default MainRoutes;
