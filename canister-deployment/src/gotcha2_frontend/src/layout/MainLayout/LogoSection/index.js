import { Link } from "react-router-dom";
import SVG from 'react-inlinesvg';

// material-ui
import { ButtonBase } from "@mui/material";

// project imports
import config from "../../../config";
import Logo from "../../../assets/images/GotCHA_Logo.svg";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <ButtonBase disableRipple component={Link} to={config.defaultPath}>
    <SVG src={Logo} alt="logo" style={{ width: "15rem" }} />
  </ButtonBase>
);

export default LogoSection;
