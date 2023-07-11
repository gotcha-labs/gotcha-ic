import { useState, useRef, forwardRef, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
} from "@mui/material";

import MuiTypography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import SVG from "react-inlinesvg";

import Logo from "../../assets/images/GotCHA_Logo.svg";
import "./introStyles.css";

// animation
const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

// ===============================|| UI DIALOG - SCROLLABLE ||=============================== //

const keyData = [
  {
    id: 1,
    siteKey: "x0fsadsanxjzxncmbzo023213asj",
    secretKey: "xdfsadsanxjzxncmbzo023213as",
  },
];

export default function IntroDialog() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [scroll, setScroll] = useState("paper");

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement?.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Introduction</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <Grid
            container
            spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Item>
                <SVG src={Logo} />
                <MuiTypography variant="h1" sx={{ pt: 4 }} gutterBottom>
                  Welcome! Let get started
                </MuiTypography>
                <MuiTypography variant="subtitle1" gutterBottom>
                  To use Gotcha you will need a SiteKey and your Account Secret
                  Key
                </MuiTypography>
              </Item>
            </Grid>

            <Grid item xs={10}>
              <Item sx={{ pt: 2, pb: 4 }}>
                <div className="demo-point">
                  <p>1</p>
                  <MuiTypography variant="h2" gutterBottom>
                    SiteKey
                  </MuiTypography>
                </div>
                <MuiTypography variant="subtitle1" sx={{ pt: 2 }}>
                  SiteKeys are used to uniquely identify your site(s). We've
                  already generated your first one:{" "}
                  <Button variant="text">{`${keyData.map(
                    (key) => key.siteKey
                  )}`}</Button>
                </MuiTypography>
                <MuiTypography variant="subtitle1" sx={{ pt: 2 }}>
                  You can specify captcha related settings per sitekey, such as
                  challenge difficulty and preferred content based on site
                  topics.
                </MuiTypography>
              </Item>

              <Item sx={{ pt: 2, pb: 4 }}>
                <div className="demo-point">
                  <p>2</p>
                  <MuiTypography variant="h2" gutterBottom>
                    Secret Key
                  </MuiTypography>
                </div>
                <MuiTypography variant="subtitle1" sx={{ pt: 2 }}>
                  A principle is used to verify your Gotcha account:{" "}
                  <Button variant="text">{`${keyData.map(
                    (key) => key.secretKey
                  )}`}</Button>
                </MuiTypography>
              </Item>

              <Item sx={{ pt: 2, pb: 4 }}>
                <div className="demo-point">
                  <p>3</p>
                  <MuiTypography variant="h2" gutterBottom>
                    Installation
                  </MuiTypography>
                </div>
                <MuiTypography variant="subtitle1" sx={{ pt: 2 }}>
                  Use one of our pre-made plugins or guides for easy setup:
                  WordPress, Drupal, PHP, Android, NodeJS, ReactJS and many
                  more.
                </MuiTypography>
                <MuiTypography variant="subtitle1" sx={{ pt: 2 }}>
                  If you'd like to implement your own solution, see this
                  Quickstart code example(show Quickstart code) or for more info
                  visit the developer docs.
                </MuiTypography>
              </Item>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pr: 2.5, pt: 2.5 }}>
          <Button variant="contained" size="small" onClick={handleClose}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
