import React, { useEffect, useContext, useState } from "react";
import { FetchContext } from "../../context/FetchContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Title from "../common/Title";
import Typography from "@material-ui/core/Typography";

const RADIAN = Math.PI / 180;

const COLORS = ["#93E361", "#F3F564", "#FC5D5D"];

export default function Chart() {
  const theme = useTheme();
  const [newCases, setNewCases] = useState([
    { newConfirmed: 0 },
    { newDeaths: 0 },
    { newRecovered: 0 },
  ]);
  const [totalCases, setTotalCases] = useState([
    { TotalConfirmed: 0 },
    { TotalDeaths: 0 },
    { TotalRecovered: 0 },
  ]);

  const fetchContext = useContext(FetchContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await fetchContext.authAxios.get("/summary");
        let newArrayCases = [...newCases];

        setTotalCases([
          Object.assign({}, totalCases, {
            TotalConfirmed: data.Global.TotalConfirmed,
            TotalDeaths: data.Global.TotalDeaths,
            TotalRecovered: data.Global.TotalRecovered,
          }),
        ]);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [fetchContext.authAxios]);
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    note: {
      marginTop: "1rem",
      marginLeft: "1rem",
    },
    note1: {
      backgroundColor: "#93E361",
      height: "10px",
      width: "50px",
    },
    note2: {
      backgroundColor: "#F3F564",
      height: "10px",
      width: "50px",
    },
    note3: {
      backgroundColor: "#FC5D5D",
      height: "10px",
      width: "50px",
    },
  });
  const classes = useStyles();

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <React.Fragment>
      <Title>Global news:</Title>
      <ResponsiveContainer>
        <PieChart width={730} height={400}>
          <Pie
            data={newCases}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={80}
            fill={theme.palette.secondary.main}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {newCases.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Grid container xs={12} lg={12} className={classes.note}>
        <Grid
          container
          item
          xs={2}
          lg={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Card className={classes.note1}>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid
          container
          item
          xs={2}
          lg={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography component="h6" variant="h6" color="inherit">
            confirmed
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={8}
          lg={8}
          direction="row"
          justify="center"
          alignItems="center"
        ></Grid>
        <Grid
          container
          item
          xs={2}
          lg={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Card className={classes.note2}>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid
          container
          item
          xs={2}
          lg={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography component="h6" variant="h6" color="inherit">
            confirmed
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={8}
          lg={8}
          direction="row"
          justify="center"
          alignItems="center"
        ></Grid>
        <Grid
          container
          item
          xs={2}
          lg={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Card className={classes.note3}>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid
          container
          item
          xs={2}
          lg={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography component="h6" variant="h6" color="inherit">
            confirmed
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={8}
          lg={8}
          direction="row"
          justify="center"
          alignItems="center"
        ></Grid>
      </Grid>
    </React.Fragment>
  );
}
