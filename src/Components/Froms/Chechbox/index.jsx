import React from 'react';
import { Checkbox } from '@mui/material';
import { useField } from 'formik';

const CheckboxComponent = ({ field: fieldProps, label, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <div>
      <Checkbox
        {...field}
        {...props}
        color="primary"
        checked={field.value}
      />
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CheckboxComponent;
