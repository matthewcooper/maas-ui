import { Input } from "@canonical/react-components";
import { useField } from "formik";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import nanoid from "nanoid";

const FormikField = ({
  component: Component = Input,
  name,
  type = "text",
  value,
  ...props
}) => {
  const id = useRef(nanoid());
  const [field, meta] = useField({ name, type, value });
  return (
    <Component
      error={meta.touched ? meta.error : null}
      id={id.current}
      type={type}
      {...field}
      {...props}
    />
  );
};

FormikField.propTypes = {
  component: PropTypes.func,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string
};

export default FormikField;
