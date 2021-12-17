import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Grid, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  cryptoName: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  tableContainer: {
    borderRadius: 15,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
}));

export default function Portfolio() {
  function createData(name, path, quantity, value) {
    return { name, path, quantity, value };
  }

  const rows = [
    createData("BTC", "/BTC.png", 0, 0),
    createData("USDT", "/USDT.png", 0.45278037, 0.452935085052429),
    createData("MER", "/MER.png", 0, 0),
    createData("FTT", "/FTT.png", 0.00166014, 0.06160281498),
    createData("ETH", "/ETH.png", 0.07998507, 295.05564169076376),
    createData("USD", "/USD.png", -3.76433502, -3.7643350111328515),
  ];

  const [balanceData, setBalanceData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    setLoading(true);
    fetch("/get_balance_info")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setBalanceData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <p>Data is loading...</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div>
        <Typography variant="h6" component="h2" color="primary">
          Portfolio
        </Typography>
      </div>
      <div>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>Crypto</TableCell>
                <TableCell className={classes.tableHeaderCell} align="right">
                  Quantity
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="right">
                  $ USD value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {balanceData && balanceData.length > 0? (
                balanceData.balance_all_info.map((item) => (
                  <TableRow key={item.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Grid container>
                        <Grid item lg={3}>
                          <Avatar src="/ETH.png" />
                        </Grid>
                        <Grid item lg={9}>
                          <Typography className={classes.cryptoName}>{item.coin}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">{item.total}</TableCell>
                    <TableCell align="right">{item.usdValue}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell>{balanceData.total_balance}</TableCell>
              )} */}
              {rows.map((item) => (
                <TableRow key={item.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Grid container>
                      <Grid item lg={4}>
                        <Avatar src={item.path} />
                      </Grid>
                      <Grid item lg={8}>
                        <Typography className={classes.cryptoName}>{item.name}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="right">
                    {item.name === "USD" ? balanceData.total_balance - 295.5701795 : item.quantity}
                  </TableCell>
                  <TableCell align="right">
                    {item.name === "USD" ? balanceData.total_balance - 295.5701795 : item.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
}
