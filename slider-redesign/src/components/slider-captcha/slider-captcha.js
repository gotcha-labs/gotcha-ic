import React, { useState } from "react";
import PropTypes from "prop-types";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Anchor from "./anchor";
import Theme from "./theme";

var captchaStatus;
var createCaptcha;
var rand;
var accessToken;

const SliderCaptcha = ({
  sitekey,
  callback,
  create,
  verify,
  variant,
  text,
}) => {
  const [verified, setVerified] = useState(false);
  const [userKey, setUserKey] = useState(sitekey);

  // ==========================================================================

  const fetchCaptcha = (create) => () =>
    create instanceof Function
      ? create() // Use provided promise for getting background and slider
      : fetch(create, {
          // Use create as API URL for fetch
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify({ siteKey: sitekey }),
        })
          .then(async (res) => {
            if (res.status >= 400) {
              if (res.status == 500) {
                toast.error("Internal Server Error!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }

              toast.error("Please try again later!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });

              setTimeout(() => {
                throw new Error("Server responds with error!");
              }, 2500);
            }

            const responseData = await res.json();

            console.log("Captcha Response: ", responseData);

            captchaStatus = responseData.success;
            createCaptcha = responseData.data.create.data;
            rand = responseData.data.rand;
            accessToken = responseData.data.token;

            console.log("captchaStatus===>", captchaStatus);
            console.log("Captcha Create: ", createCaptcha);
            console.log("Random ID: ", rand);
            console.log("Access Token: ", accessToken);
            if (captchaStatus) {
              return createCaptcha;
            } else {
              toast.warn("Please try again later!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          })
          .catch((error) => {
            // TypeError: Failed to fetch
            console.log(error);
            toast.error(`There was an error!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });

  const fetchVerification = (verify) => (response, trail) =>
    verify instanceof Function
      ? verify(response, trail) // Use provided promise for verifying captcha
      : fetch(verify, {
          // Verification API URL provided instead
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            Authorization: `Bearer ${accessToken}`,
          },
          // credentials: "include",
          body: JSON.stringify({
            response,
            trail,
            rand,
          }),
        })
          .then(async (message) => {
            const responseData = await message.json();
            console.log("Verification-req: ", responseData);
            return responseData;
          })
          .catch((error) => {
            // TypeError: Failed to fetch
            console.log(error);
            toast.error(`There was an error!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
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
      <ToastContainer />
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
  sitekey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
  sitekey: "",
  create: "captcha/create",
  verify: "captcha/verify",
  variant: "light",
  // variant: "dark",
  text: {
    anchor: "Click to verify",
    challenge: "Slide to finish the puzzle",
  },
};

export default SliderCaptcha;
