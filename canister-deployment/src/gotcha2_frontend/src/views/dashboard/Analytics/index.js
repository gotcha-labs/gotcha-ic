// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, useMediaQuery } from "@mui/material";

// project imports
import MarketShareAreaChartCard from "./MarketShareAreaChartCard";
import MainCard from "../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../store/constant";

// assets
import {
  IconShare,
  IconAccessPoint,
  IconCircles,
  IconCreditCard,
} from "@tabler/icons";

// ==============================|| ANALYTICS DASHBOARD ||============================== //

const Analytics = () => {
  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down("sm"));

  const blockSX = {
    p: 2.5,
    borderLeft: "1px solid ",
    borderBottom: "1px solid ",
    borderLeftColor:
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.grey[200],
    borderBottomColor:
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.grey[200],
  };

  return (
    <Grid container spacing={gridSpacing}>

      <Grid item xs={12} lg={8} md={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MarketShareAreaChartCard />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={4} md={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard
              content={false}
              sx={{
                "& svg": {
                  width: 50,
                  height: 50,
                  color: theme.palette.secondary.main,
                  borderRadius: "14px",
                  p: 1.25,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.background.default
                      : "primary.light",
                },
              }}
            >
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={matchDownXs ? "space-between" : "center"}
                  >
                    <Grid item>
                      <IconShare stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        1000
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        SHARES
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={matchDownXs ? "space-between" : "center"}
                  >
                    <Grid item>
                      <IconAccessPoint stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        600
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        NETWORK
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={matchDownXs ? "space-between" : "center"}
                  >
                    <Grid item>
                      <IconCircles stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        3550
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        RETURNS
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={matchDownXs ? "space-between" : "center"}
                  >
                    <Grid item>
                      <IconCreditCard stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        100%
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        ORDER
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

        </Grid>
      </Grid>

    </Grid>
  );
};

export default Analytics;
