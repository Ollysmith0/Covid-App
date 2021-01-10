import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Copyright from "../components/common/Copyright";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Formik } from "formik";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Alert from "@material-ui/lab/Alert";
import * as Yup from "yup";
import { Button } from "@material-ui/core";

const userInfo = {
  userName: "a",
  password: "a",
};

const value = {
  name: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("User Name is required"),
  password: Yup.string().required("Password is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://phonakvietnam.com/sites/default/files/2020-03/Coronavirus-COVID-19.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.default,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: "1rem",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  forgot: {
    display: "inline-block",
    marginTop: "1rem",
  },
  signup: {
    display: "inline-block",
    marginTop: "1rem",
  },
}));

export default function Login() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);

  const submitCredentials = async (credentials) => {
    const pass =
      credentials.name === userInfo.userName &&
      credentials.password === userInfo.password;
    try {
      if (pass) {
        authContext.setAuthState(credentials);
        setLoginSuccess("Login Success");
        setLoginError(null);
        setTimeout(() => {
          setRedirectOnLogin(true);
        }, 700);
      } else {
        setLoginError("Wrong User Name or Password");
        setLoginSuccess(null);
        setTimeout(() => {
          setRedirectOnLogin(false);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {redirectOnLogin && <Redirect to="/dashboard" />}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            {/* <Form /> */}
            {loginSuccess && <Alert severity="success">'{loginSuccess}'</Alert>}
            {loginError && <Alert severity="error">{loginError}</Alert>}
            <Formik
              initialValues={value}
              validationSchema={LoginSchema}
              onSubmit={(values) => submitCredentials(values)}
            >
              {() => (
                <Form>
                  <Field
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="User Name"
                    name="name"
                    autoComplete="name"
                  />
                  <br />
                  <Field
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="password"
                    type="password"
                  />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Grid container>
                    <Grid item xs={12} lg={12}>
                      <Link className={classes.forgot} href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link className={classes.signup} href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </Form>
              )}
            </Formik>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
