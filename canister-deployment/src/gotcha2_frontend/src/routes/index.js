import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import Loadable from "../ui-component/Loadable";

const PagesLanding = Loadable(lazy(() => import("../views/pages/landingPage")));
const ErrorPage = Loadable(
  lazy(() => import("../views/pages/maintenance/Error"))
);
const ComingSoon = Loadable(
  lazy(() => import("../views/pages/maintenance/UnderConstruction"))
);

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    { path: "/", element: <PagesLanding /> },
    { path: "/coming-soon", element: <ComingSoon /> },
    { path: "*", element: <ErrorPage /> },
    AuthenticationRoutes,
    MainRoutes,
  ]);
}
