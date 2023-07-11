import { lazy } from "react";

// project imports
import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

// login option 3 routing
const AuthLogin = Loadable(
  lazy(() => import("../views/pages/authentication/authentication/Login"))
);

// maintenance routing
const MaintenanceError = Loadable(
  lazy(() => import("../views/pages/maintenance/Error"))
);
const MaintenanceUnderConstruction = Loadable(
  lazy(() => import("../views/pages/maintenance/UnderConstruction"))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <AuthLogin />,
    },
    {
      path: "/error",
      element: <MaintenanceError />,
    },
    {
      path: "/under-construction",
      element: <MaintenanceUnderConstruction />,
    },
  ],
};

export default AuthenticationRoutes;
