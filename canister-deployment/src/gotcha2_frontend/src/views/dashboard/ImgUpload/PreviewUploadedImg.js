import React, { useState } from "react";
import "./img-styles.css";

const PreviewUploadedImg = ({ file }) => {
  const [imgPreview, setImgPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setImgPreview(reader.result);
  };

  return (
    <div className="img-container">
      {imgPreview ? (
        <img src={imgPreview} alt="preview-img" className="img-preview" />
      ) : (
        "Uploading Img..."
      )}
    </div>
  );
};

export default PreviewUploadedImg;
