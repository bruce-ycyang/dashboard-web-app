import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [totalValue, setTotalValue] = React.useState(0);
  React.useEffect(() => {
    fetch("/get_balance")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setTotalValue(data));
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Balance</Title>
      <Typography component="p" variant="h4">
        ${totalValue.total_balance}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        total net USD
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
