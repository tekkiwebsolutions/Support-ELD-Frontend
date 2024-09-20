import * as Yup from "yup";

// Function to generate validation schema for each terminal
export const generateTerminalValidationSchema = () => {
  return Yup.object().shape({
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    terminal_address: Yup.string().required("Terminal address is required"),
    time_zone: Yup.string().required("Time zone is required"),
  });
};

// Validation schema for terminals array
const terminalValidationSchema = Yup.array()
  .of(generateTerminalValidationSchema())
  .required("At least one terminal is required");

// Combined validation schema for the entire form
const EditCompanyvalidationSchema = Yup.object().shape({
  country: Yup.string().required("Country is required"),
  dot_number: Yup.string().required("DOT number is required"),

  state: Yup.string().required("State is required"),
  time_zone: Yup.string().required("Time zone is required"),
  zipcode: Yup.string()
    .matches(/^\d{5,7}$/, "Zip code must be between 5 and 7 digits")
    .required("Zip code is required"),
  address: Yup.string().required("Address is required"),
  hos_rule: Yup.string().required("HOS rule is required"),
  cargo_type: Yup.string().required("Cargo type is required"),
  restart: Yup.string().required("Restart is required"),
  rest_break: Yup.string().required("Rest break is required"),
  terminals: terminalValidationSchema, // Include terminal validation schema
});

export default EditCompanyvalidationSchema;
