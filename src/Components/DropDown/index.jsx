import React, { useState, useEffect } from "react";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { useField } from "formik";
import ClearIcon from "@mui/icons-material/Clear";

const CustomAutocomplete = ({ label, name, options, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const [selectedValue, setSelectedValue] = useState(null);
  useEffect(() => {
    setSelectedValue(
      options?.find(
        (option) =>
          option.label === field.value ||
          option.user_id === field.value ||
          option.value === field.value
      ) || null
    );
  
  
  }, [options]);

  const handleChange = (event, value) => {
    setSelectedValue(value);
    helpers.setValue(value?.user_id || value?.label || "");
  };
  const togglehandle = () => {
  
      setSelectedValue(null);
      helpers.setValue("");
  
  };
  return (
    <Autocomplete
      fullWidth
      clearIcon={false}
      options={options || []}
      inputValue={selectedValue?.label || selectedValue?.company_name || ""}
      getOptionLabel={(option) => option.label || option.company_name || ""}
      value={selectedValue}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={meta.error}
          helperText={meta.error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {selectedValue && (
                  <IconButton
                    aria-label="clear value"
                    onClick={togglehandle}
                    edge="end"
                  >
                    <ClearIcon sx={{ fontSize: "20px" }} />
                  </IconButton>
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...props}
    />
  );
};

export default CustomAutocomplete;
