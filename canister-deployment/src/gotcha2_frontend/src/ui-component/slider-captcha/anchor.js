import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "./card";
import { SuccessIcon } from "./icons";
import axios from "axios";

const Anchor = ({ text, fetchCaptcha, submitResponse, verified }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState([]);
  const [tempCreateRes, setTempCreateRes] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleKey = (e) => {
    if (e.code === "Enter" || e.code === "Space") {
      setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // const handleImgSubmit = async () => {
  //   let Data = new FormData();
  //   {
  //     Data.append("profileImg", Image ? Image : null);
  //   }
  //   try {
  //     await api.post("/posts", Data);
  //   } catch (err) {
  //     console.log(`Error: ${err.message}`);
  //   }
  // };

  // const onImgSubmit = async (e) => {
  //   e.preventDefault();
  //   let data = new FormData();
  //   console.log(image + " " + "this is image pathname");
  //   data.append("image", image);
  //   console.log("data: ", data);

  //   const config = {
  //     headers: {
  //       "Content-Length": data.length,
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };

  //   axios
  //     .post("/api/v1/captcha/create", data, config)
  //     .then((res) => {
  //       console.log(res.data + "this is data after api call");
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleFileUpload = (event) => {
    // get the selected file from the input
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("image", file);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    axios
      .post("/api/v1/captcha/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Length": formData.length,
        },
      })
      .then((response) => {
        // handle the response
        console.log(response);
        handleKey(event);
        setTempCreateRes(response.data);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  return (
    <div>
      {/* ======================================================================== */}
      {/* <form className="create-post-form">
        <br />
        <input type="file" onChange={handleFileUpload} />
      </form>
      <hr /> */}

      {/* ======================================================================== */}

      <div
        className="scaptcha-anchor-container scaptcha-anchor-element"
        onClick={handleOpen}
      >
        <button
          suppressHydrationWarning
          type="button"
          className={`scaptcha-anchor-checkbox ${
            !verified && "scaptcha-anchor-checkbox-default"
          } scaptcha-anchor-element`}
          onKeyUp={handleKey}
        >
          {verified && <SuccessIcon />}
        </button>
        <div className="scaptcha-anchor-label scaptcha-anchor-element">
          {text.anchor}
        </div>
      </div>
      {!verified && open && (
        <div>
          <div className="scaptcha-hidden" onClick={handleClose} />
          <Card
            // tempCreateRes={tempCreateRes}
            fetchCaptcha={fetchCaptcha}
            submitResponse={submitResponse}
            text={text}
          />
        </div>
      )}
    </div>
  );
};

Anchor.propTypes = {
  fetchCaptcha: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }).isRequired,
  verified: PropTypes.bool.isRequired,
};

export default Anchor;
