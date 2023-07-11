// third-party
import { FormattedMessage } from "react-intl";

// assets
import { IconDashboard, IconDeviceAnalytics } from "@tabler/icons";
import UploadIcon from "@mui/icons-material/Upload";	
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"

// constant
const icons = {
  IconDashboard,
  IconDeviceAnalytics,
  UploadIcon,	
  FormatListBulletedIcon,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  title: <FormattedMessage id="dashboard" />,
  type: "group",
  children: [
    {
      id: "dashboard",
      title: <FormattedMessage id="dashboard" />,
      type: "item",
      url: `/dashboard/?canisterId=${process.env.GOTCHA2_FRONTEND_CANISTER_ID}`,
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "analytics",
      title: <FormattedMessage id="analytics" />,
      type: "item",
      url: `/dashboard/analytics/?canisterId=${process.env.GOTCHA2_FRONTEND_CANISTER_ID}`,
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false,
    },
    {
      id: "upload",
      title: <FormattedMessage id="upload" />,
      type: "item",
      url: `/dashboard/upload/?canisterId=${process.env.GOTCHA2_FRONTEND_CANISTER_ID}`,
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false,
    },
    {	
      id: "captcha-images",	
      title: <FormattedMessage id="captcha-images" />,	
      type: "item",	
      url: `/dashboard/images/?canisterId=${process.env.GOTCHA2_FRONTEND_CANISTER_ID}`,	
      icon: icons.FormatListBulletedIcon,	
      breadcrumbs: false,	
    },
  ],
};

export default dashboard;
