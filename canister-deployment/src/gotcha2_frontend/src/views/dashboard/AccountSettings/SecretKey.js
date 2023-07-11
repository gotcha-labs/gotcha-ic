import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

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

const SecretKey = () => {
  const dispatch = useDispatch();

  const [text1, setText1] = useState("0x4b60DcB541a6Bd6873249fjei34283943rvfz");

  useEffect(() => {
    const Skey = localStorage.getItem("customer");
    console.log("Skey: ", Skey);
    if (Skey) {
      setText1(`${Skey}`);
    }
  }, []);

  return (
    <Grid item xs={12} mt={2}>
      <Grid item zeroMinWidth sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h3" align="left">
          Principle &nbsp;
        </Typography>
        <Typography variant="subtitle1" align="left">
          - Use this as the secret to check user tokens.
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        <TextField
          disabled
          fullWidth
          label="Your Secret Key"
          type="text"
          value={text1}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CopyToClipboard
                  text={text1}
                  onCopy={() =>
                    dispatch({
                      type: SNACKBAR_OPEN,
                      anchorOrigin: { vertical: "top", horizontal: "right" },
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
    </Grid>
  );
};

export default SecretKey;
