import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

// material-ui
import {
  Button,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";

// third-party
import { CopyToClipboard } from "react-copy-to-clipboard";

// project imports
import { SNACKBAR_OPEN } from "../../../store/actions";

// assets
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import AuthContext from "../../../contexts/AuthContext";

// const siteKeys = [
//   { id: 1, key: "0x2b60DcB541a6Bd6873249fjei34283943fofe" },
//   { id: 2, key: "0x7b60DcB541a6Bd1276820fjei34283943fwfz" },
//   { id: 3, key: "0x0b60DcB541a6Bd1476870fjei34283943fwtz" },
// ];

// const setSiteKeys = async () => {
//   const context = useContext(AuthContext);

//   var result = await context.customerActor.getSiteKeys(localStorage.cutomer);
//   var siteKeys = result.ok;
//   if (siteKeys) {
//     siteKeys.map((k) => {
//       k.captchaFailed = Number(k.captchaFailed);
//       k.captchaVerified = Number(k.captchaVerified);
//       k.captchaServed = Number(k.captchaServed);
//     });
//     localStorage.setItem("siteKeys", JSON.stringify(siteKeys));
//   }
// };

const GenerateApi = () => {
  const context = useContext(AuthContext);
  const dispatch = useDispatch();
  const [keys, setKeys] = useState(
    JSON.parse(localStorage.getItem("siteKeys"))
  );
  console.log("GenerateApi key", keys);

  const generateKey = async () => {
    // let data = JSON.stringify({
    //  token: context.token,
    // });
    console.log("Lets Generate", context.token);

    axios
      .post(
        "http://192.168.3.51:3001/api/v1/addKey",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${context.token}`,
          },
        }
      )
      .then(async (response) => {
        // Handle the response
        console.log(response.data.data.siteKey);
        await context.customerActor.addSiteKeys(
          context.user,
          response.data.data.siteKey
        );
        var arr = JSON.parse(localStorage.getItem("siteKeys"));
        arr.push({
          key: response.data.data.siteKey,
          captchaVerified: 0,
          captchaServed: 0,
          captchaFailed: 0,
        });
        localStorage.setItem("siteKeys",JSON.stringify(arr));
        setKeys(arr);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });

    // try {
    //   const response = await axios.request(config);
    //   console.log("Node response", response.data.data.data);
    //   siteId = response.data.data.siteId;
    // } catch (error) {
    //   toast.error("Error generating key. Try again.", {
    //     position: "top-right",
    //     autoClose: 8000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    //   console.log("Key generation Error: ", error);
    // }
  };
  return (
    <Grid item xs={12}>
      <Grid item zeroMinWidth sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h3" align="left">
          Site key &nbsp;
        </Typography>
        <Typography variant="subtitle1" align="left">
          - Use this for site management, like adding more sitekeys to your
          account.
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        {keys.map((k, index) => {
          console.log("secretkey:", k);
          return (
            // <h2>{k.key}</h2>
            <Grid item xs={12} mt={2} key={index}>
              <TextField
                disabled
                fullWidth
                label="Website1 Key"
                type="text"
                value={k.key}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CopyToClipboard
                        text={k.key}
                        onCopy={() =>
                          dispatch({
                            type: SNACKBAR_OPEN,
                            anchorOrigin: {
                              vertical: "top",
                              horizontal: "right",
                            },
                            transition: "SlideLeft",
                            open: true,
                            message: "Text Copied",
                            variant: "alert",
                            alertSeverity: "success",
                            close: false,
                          })
                        }
                      >
                        <Tooltip title="Copy">
                          <IconButton
                            aria-label="Copy from another element"
                            edge="end"
                            size="large"
                          >
                            <ContentCopyTwoToneIcon
                              sx={{ fontSize: "1.1rem" }}
                            />
                          </IconButton>
                        </Tooltip>
                      </CopyToClipboard>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      {/* <Grid item xs={12} mt={2}>
        <Grid item xs={12} mt={2}>
          <TextField
            disabled
            fullWidth
            label="Website1 Key"
            type="text"
            value={"site-f8f545d5-69c9-429d-bfb0-2702c4a428eb-key"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CopyToClipboard
                    text={"site-f8f545d5-69c9-429d-bfb0-2702c4a428eb-key"}
                    onCopy={() =>
                      dispatch({
                        type: SNACKBAR_OPEN,
                        anchorOrigin: {
                          vertical: "top",
                          horizontal: "right",
                        },
                        transition: "SlideLeft",
                        open: true,
                        message: "Text Copied",
                        variant: "alert",
                        alertSeverity: "success",
                        close: false,
                      })
                    }
                  >
                    <Tooltip title="Copy">
                      <IconButton
                        aria-label="Copy from another element"
                        edge="end"
                        size="large"
                      >
                        <ContentCopyTwoToneIcon sx={{ fontSize: "1.1rem" }} />
                      </IconButton>
                    </Tooltip>
                  </CopyToClipboard>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid> */}
      <Button
        size="small"
        variant="contained"
        color="primary"
        sx={{ my: 2 }}
        onClick={generateKey}
      >
        Get New API Key
      </Button>
    </Grid>
  );
};

export default GenerateApi;
