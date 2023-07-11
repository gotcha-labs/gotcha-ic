import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import { strengthColor, strengthIndicator } from "../../../utils/password-strength";

// ===============================|| UI DIALOG - FORMS ||=============================== //

export default function ChangePasswordDialog() {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // const [oldPassword, setOldPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  //   const [accountPassword, setAccountPassword] = useState({
  //     password: "",
  //     confirmPassword: "",
  //   });

  //   const handleChange = (e) => {
  //     e.preventDefault();
  //   };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Change password
      </Button>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Change Account Password
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object().shape({
              oldPassword: Yup.string().max(255),
              newPassword: Yup.string()
                .min(6)
                .required("Please enter your password"),
              confirmPassword: Yup.string()
                .required()
                .oneOf([Yup.ref("newPassword"), null], "Password must match"),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting, resetForm }
            ) => {
              try {
                console.log("Password Change Form Submitted: ", values);
                resetForm();
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              handleReset,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.oldPassword && errors.oldPassword)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-old-password">
                    Old Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-old-password"
                    type={showPassword1 ? "text" : "password"}
                    value={values.oldPassword}
                    name="oldPassword"
                    label="Old Password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword1(!showPassword1)}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword1 ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{}}
                  />
                  {touched.oldPassword && errors.oldPassword && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-register"
                    >
                      {errors.oldPassword}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  error={Boolean(touched.newPassword && errors.newPassword)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-new-password">
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-new-password"
                    type={showPassword2 ? "text" : "password"}
                    value={values.newPassword}
                    name="newPassword"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword2(!showPassword2)}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword2 ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{}}
                  />
                  {touched.newPassword && errors.newPassword && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-register"
                    >
                      {errors.newPassword}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  fullWidth
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-confirm-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    type={showPassword3 ? "text" : "password"}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword3(!showPassword3)}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword3 ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{}}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-register"
                    >
                      {errors.confirmPassword}
                    </FormHelperText>
                  )}
                </FormControl>

                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}

                <DialogActions sx={{ pr: 2.5 }}>
                  <Button
                    sx={{ color: theme.palette.error.dark }}
                    onClick={handleClose}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleClose}
                  >
                    Save
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
