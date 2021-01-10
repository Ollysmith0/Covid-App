import { Form, Field } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "./Copyright";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const MyForm = ({}) => {
  const classes = useStyles();
  return (
    <Form>
      <Field
        component={TextField}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
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
      />
      <br />
      <Button variant="contained" color="primary" className={classes.button}>
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
  );
};

export { MyForm };
