import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Chart from "../component/utils/Chart";
import Deposits from "../component/utils/Deposits";
import Portfolio from "../component/utils/Portfolio";
import { Paper, Grid, Typography, Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 300,
              }}
            >
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 300,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
          {/* portfolio */}
          <Grid item xs={9}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Portfolio />
            </Paper>
          </Grid>
          {/* Pie Chart */}
          <Grid item xs={3}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Typography>pie chart</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
