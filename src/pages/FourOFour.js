import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

const FourOFour = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item lg={12} xs={12}>
        <Typography variant="h1" component="h2">
          404 not found
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FourOFour;
