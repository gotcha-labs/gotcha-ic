import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import AuthGuard from "../utils/route-guard/AuthGuard";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("../views/dashboard/Default"))
);
const DashboardCaptchaImgList = Loadable(	
  lazy(() => import("../views/dashboard/CaptchaImgList/CaptchaImgList"))	
);
const DashboardAnalytics = Loadable(
  lazy(() => import("../views/dashboard/Analytics"))
);
const AccountSettings = Loadable(
  lazy(() => import("../views/dashboard/AccountSettings"))
);
const DashboardImgUpload = Loadable(
  lazy(() => import("../views/dashboard/ImgUpload/ImgUpload"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "/dashboard",
      element: <DashboardDefault />,
    },
    {
      path: "/dashboard/analytics",
      element: <DashboardAnalytics />,
    },
    {
      path: "/dashboard/user/account-profile",
      element: <AccountSettings />,
    },
    {	
      path: "/dashboard/images",	
      element: <DashboardCaptchaImgList />,	
    },
    {
      path: "/dashboard/upload",
      element: <DashboardImgUpload />,
    },
  ],
};

export default MainRoutes;
