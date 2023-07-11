import React, { useState } from "react";
import axios from "axios";
import SliderCaptcha from "./components/slider-captcha/index";

function App() {
  const [captchaTokenVerify, setCaptchaTokenVerify] = useState(false);

  const verifiedCallback = (token) => {
    console.log("Slider Captcha Token: " + token);
    if (token) {
      setCaptchaTokenVerify(true);
    }
  };

  // ======================================================================

  const handleAPI = async (path) => {
    axios
      .get(`http://localhost:5000${path}`, { withCredentials: true })
      .then(async (res) => {
        const responseData = await res.json();
        console.log("Test Response: ", responseData);
      });
  };

  return (
    <div className="App">



      <SliderCaptcha
        sitekey="site-260c1aad-5aa6-432c-ab1b-fb33935b2080-key"
        create="http://192.168.3.51:3001/api/v1/captcha/create"
        verify="http://192.168.3.51:3001/api/v1/captcha/verify"
        callback={verifiedCallback}
      />







      {/* ================================================================ */}
      <br />
      {/* <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => handleAPI("/")}>API</button>
        <button onClick={() => handleAPI("/test")}>API-Check</button>
      </div> */}
    </div>
  );
}

export default App;
