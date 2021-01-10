import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import logo from "../assets/images/logo.png";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { AuthContext } from "./../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#44A6FF",
    height: "100vh",
  },
  header: {
    marginRight: "2rem",
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "no-repeat",
    maxWidth: "932px",
    maxHeight: "410px",
    width: "100%",
    height: "100%",
  },
  button: {
    borderColor: theme.palette.third.main,
    color: theme.palette.third.main,
    marginRight: "1rem",
  },
  getstarted: {
    borderColor: theme.palette.third.main,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.third.main,
    padding: "1rem 2rem",
  },
  link: {
    color: theme.palette.third.main,
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.third.main,
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  return (
    <Grid
      className={classes.container}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid
        container
        direction="row"
        justify="flex-end"
        className={classes.header}
      >
        <Button variant="outlined" className={classes.button}>
          <Link
            href={authState.isAuthenticated ? "/dashboard" : "/login"}
            className={classes.link}
          >
            login
          </Link>
        </Button>
        <Button variant="outlined" className={classes.button}>
          <Link href="/signup" className={classes.link}>
            signup
          </Link>
        </Button>
      </Grid>
      <div className={classes.logo}></div>
      <Grid
        container
        direction="row"
        justify="center"
        className={classes.header}
      >
        <Button variant="outlined" className={classes.getstarted}>
          <Link
            href={authState.isAuthenticated ? "/dashboard" : "/login"}
            className={classes.link}
          >
            getstarted
          </Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
