import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

// project imports
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import useAuth from "../../../../hooks/useAuth";
import useScriptRef from "../../../../hooks/useScriptRef";
import SliderCaptcha from "../../../../ui-component/slider-captcha";

// ===============================|| JWT LOGIN ||=============================== //

const BlockChainLogin = ({ loginProp, ...others }) => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const scriptedRef = useScriptRef();

  const handleLognInSubmit = async () => {
    try {
      await login();
      if (scriptedRef.current) {
        console.log("Login Success");
        navigate(
          `/dashboard/?canisterId=${process.env.GOTCHA2_FRONTEND_CANISTER_ID}`
        );
      }
    } catch (err) {
      console.error(err);
      if (scriptedRef.current) {
        console.log("Login Error: ", err.message);
      }
    }
  };

  const [captchaToken, setCaptchaToken] = useState(false);

  const verifiedCallback = (token) => {
    console.log("Slider Captcha Token: " + token);
    if (token) {
      setCaptchaToken(true);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <SliderCaptcha
        create="/api/v1/captcha/create"
        verify="/api/v1/captcha/verify"
        callback={verifiedCallback}
      />

      <AnimateButton>
        <Button
          sx={{ mt: 2 }}
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={() => handleLognInSubmit()}
        >
          Sign In
        </Button>
      </AnimateButton>
    </Box>
  );
};

BlockChainLogin.propTypes = {
  loginProp: PropTypes.number,
};

export default BlockChainLogin;
