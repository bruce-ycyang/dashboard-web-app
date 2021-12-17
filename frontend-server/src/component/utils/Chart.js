import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from "recharts";
import Title from "./Title";
import { Typography } from "@mui/material";

export default function Chart() {
  const dayItems = [
    {
      text: "7 days",
      value: 7,
    },
    {
      text: "30 days",
      value: 30,
    },
    {
      text: "180 days",
      value: 180,
    },
  ];
  const theme = useTheme();
  const [netPortfolio, setNetPortfolio] = React.useState([]);
  const [currentDay, setCurrentDay] = React.useState(180);

  const hadleDaysChange = (day) => {
    setCurrentDay(day);
  };

  React.useEffect(() => {
    fetch(`/get_portfolios/${currentDay}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setNetPortfolio(data);
      });
  }, [currentDay]);

  return (
    <React.Fragment>
      <Title>
        <Stack spacing={2} direction="row">
          <Typography variant="h5">History</Typography>
          {dayItems.map((item) => (
            <Button
              key={item.text}
              variant={item.value === currentDay ? "contained" : "outlined"}
              onClick={() => hadleDaysChange(item.value)}
            >
              {item.text}
            </Button>
          ))}
          {/* <Button variant="contained">7 days</Button>
          <Button variant="outlined">30 days</Button>
          <Button variant="outlined">180 days</Button> */}
        </Stack>
      </Title>
      <ResponsiveContainer>
        <LineChart
          data={netPortfolio}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} style={theme.typography.body2} />
          <YAxis stroke={theme.palette.text.secondary} style={theme.typography.body2}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Balance ($)
            </Label>
          </YAxis>
          <Line isAnimationActive={false} type="monotone" dataKey="sum" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
