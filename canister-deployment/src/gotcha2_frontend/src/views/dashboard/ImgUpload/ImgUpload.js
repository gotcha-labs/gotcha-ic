import React, { useRef, useContext } from "react";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

// material-ui
import { Button, Grid, Typography } from "@mui/material";

// project imports
import SubCard from "../../../ui-component/cards/SubCard";
import AnimateButton from "../../../ui-component/extended/AnimateButton";

// assets
import uploadImg2 from "../../../assets/images/icons/uploadImg2.png";

import AuthContext from "../../../contexts/AuthContext";
import { Formik, Form } from "formik";
import * as yup from "yup";
import PreviewUploadedImg from "./PreviewUploadedImg";


const projectId = "2QvWQVLxXjlLLJkseljBwDdgyw6"; // <---------- your Infura Project ID
const projectSecret = "1963fff4299b5b691fc01afbaaff5787"; // <---------- your Infura Secret
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const SUPPORTED_FORMATS = ["image/png"];

const validationSchema = yup.object({
  file: yup
    .mixed()
    .nullable()
    .required("*image required")
    .test(
      "FILE_SIZE",
      "*image size should be less than equal to 1MB",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "FILE_SIZE",
      "*unsupported File Format!",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
});

const ImgUpload = () => {
  const context = useContext(AuthContext);

  const fileRef = useRef(null);

  const client = create({
    host: "ipfs.infura.io",
    // host: "ipfs2.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
  //Uploading to IPFS
  const uploadToIPFS = async (values) => {
    console.log(values);
    //console.log(event)
    let imgFile = values.file;
    if (imgFile) {
      try {
        const result = await client.add(imgFile);
        let imageLink = "https://ipfs.io/ipfs/" + result.path;
        console.log(imageLink);

        console.log("Context",context.captchaActor);
        await context.captchaActor.customerUpload(imageLink);

        toast.success("Image uploaded successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.log("ipfs image upload error: ", error);

        toast.error("IPFS image upload error!", {
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
    }
  };

  return (
    <div className="upload-img-form">
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          file: "",
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          uploadToIPFS(values);
          actions.resetForm({
            values: {
              file: "",
            },
          });
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <Grid item sm={6} md={4}>
              <SubCard title="Upload PNG" contentSX={{ textAlign: "center" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {values.file ? (
                      <PreviewUploadedImg file={values.file} />
                    ) : (
                      <img
                        src={uploadImg2}
                        alt="upload-img-icon"
                        height={"125px"}
                        width={"125px"}
                        className="upload-img-icon"
                        onClick={() => {
                          fileRef.current.click();
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {errors.file && touched.file ? (
                      <div style={{ color: "red" }}>{errors.file}</div>
                    ) : null}
                    <Typography variant="subtitle2" align="center">
                      Upload Image
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      ref={fileRef}
                      hidden
                      type="file"
                      onChange={(event) => {
                        event.preventDefault();
                        setFieldValue("file", event.target.files[0]);
                      }}
                    />
                    <AnimateButton>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          fileRef.current.click();
                        }}
                      >
                        Upload Image
                      </Button>
                    </AnimateButton>
                    <AnimateButton>
                      <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        size="small"
                        disabled={errors.file && touched.file ? true : false}
                      >
                        Submit
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ImgUpload;
