import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import PopularCard from "./PopularCard";
import { gridSpacing } from "../../../store/constant";
import LineChart from "./LineChart";
import IntroDialog from "../../../ui-component/UIDialog/IntroDialog";
import FilterTable from "./FilterTable";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <IntroDialog />
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* <Grid item lg={8} md={12} sm={12} xs={12}>
            <LineChart />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <PopularCard isLoading={isLoading} />
          </Grid> */}
          <Grid item xs={12} md={12} lg={10}>
            <FilterTable />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
