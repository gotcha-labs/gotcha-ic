import React from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import { gridSpacing } from "../../../store/constant";
import MainCard from "../../../ui-component/cards/MainCard";
import SecretKey from "./SecretKey";
import GenerateApi from "./GenerateApi";

// ==============================|| ACCOUNT SETTINGS ||============================== //

const AccountSettings = () => {
  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} lg={12} md={12}>
          <Grid container spacing={gridSpacing}>
            <SecretKey />
            <GenerateApi />
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default AccountSettings;
