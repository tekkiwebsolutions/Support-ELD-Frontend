import React, { useState } from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const InputField = ({ label, name, defaultValue, value, className,type = 'text', ...rest }) => {
  const [field, meta] = useField({ name, defaultValue });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    // Check if the input value has at least one character
    if (field.value.length > 0) {
      setShowPassword(!showPassword);
    }
  };

  return (
    <div>
      <TextField
        {...field}
        {...rest}
        label={label}
        className={className}
        defaultValue={defaultValue}
        value={value}
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        error={meta.touched && meta.error ? true : false}
        helperText={meta.touched && meta.error ? meta.error : ""}
        InputProps={type === 'password' && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
               className="mr-2"
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default InputField;
