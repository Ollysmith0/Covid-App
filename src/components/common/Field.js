import React from "react";
import { TextField } from "formik-material-ui";

const Field = ({ variant, inputName, label, autoComplete, margin, id }) => {
  return (
    <Field
      component={TextField}
      variant={variant}
      margin={margin}
      required
      fullWidth
      id={id}
      label={label}
      name={inputName}
      autoComplete={autoComplete}
    />
  );
};

export default Field;
