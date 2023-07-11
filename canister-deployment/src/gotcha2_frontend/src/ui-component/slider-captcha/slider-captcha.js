import React, { useState } from "react";
import PropTypes from "prop-types";
import Anchor from "./anchor";
import Theme from "./theme";

import { SNACKBAR_OPEN } from "../../store/actions";
import { useDispatch } from "react-redux";

var captchaStatus;
var createCaptcha;
var captchaSol;

const SliderCaptcha = ({ callback, create, verify, variant, text }) => {
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();

  // ==========================================================================

  const fetchCaptcha = (create) => () =>
    create instanceof Function
      ? create() // Use provided promise for getting background and slider
      : fetch(create, {
          // Use create as API URL for fetch
          method: "GET",
          credentials: "include",
        }).then(async (res) => {
          if (res.status >= 400) {
            if (res.status == 500) {
              dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: "Internal Server Error",
                variant: "alert",
                alertSeverity: "warning",
              });
            }

            setTimeout(() => {
              dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: "Please try again later!",
                variant: "alert",
                alertSeverity: "error",
              });

              throw new Error("Server responds with error!");
            }, 2500);
          }

          const data = await res.json();

          console.log("Captcha Response: ", data);

          captchaStatus = data.success;
          createCaptcha = data.data.create.data;
          captchaSol = data.data.create.solution;

          if (captchaStatus) {
            return createCaptcha;
          } else {
            alert(
              `${data.message}! Captcha Sever Issue! \nPlease try again later.`
            );
          }
        });

  const fetchVerification = (verify) => (response, trail) =>
    verify instanceof Function
      ? verify(response, trail) // Use provided promise for verifying captcha
      : fetch(verify, {
          // Verification API URL provided instead
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            response,
            trail,
          }),
        }).then(async (message) => {
          const responseData = await message.json();
          console.log("Verification-req: ", responseData);
          return responseData;
        });

  // ==========================================================================

  const submitResponse = (response, trail) =>
    new Promise((resolve) => {
      fetchVerification(verify)(response, trail).then((verification) => {
        console.log("submitResponse: ", verification);
        if (
          !verification.result ||
          verification.result !== "success" ||
          !verification.token
        ) {
          resolve(false);
        } else {
          setTimeout(() => {
            callback(verification.token);
            setVerified(true);
          }, 500);
          resolve(true);
        }
      });
    });

  return (
    <div className="scaptcha-container">
      <Theme variant={variant} />
      <Anchor
        text={text}
        fetchCaptcha={fetchCaptcha(create)}
        submitResponse={submitResponse}
        verified={verified}
      />
    </div>
  );
};

SliderCaptcha.propTypes = {
  callback: PropTypes.func,
  create: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  verify: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  variant: PropTypes.string,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }),
};

SliderCaptcha.defaultProps = {
  callback: (token) => console.log(token), // eslint-disable-line no-console
  create: "captcha/create",
  verify: "captcha/verify",
  variant: "light",
  // variant: "dark",
  text: {
    anchor: "Verify you're not Robot",
    challenge: "Slide to finish the puzzle",
  },
};

export default SliderCaptcha;
