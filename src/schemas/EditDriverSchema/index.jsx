import * as Yup from "yup";

export const EditDriverValidationSchema = Yup.object({
  full_name: Yup.string().required("Username is required"),

  driver_phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  driver_address: Yup.string().required("Address is required"),

  driver_status:Yup.string().required("Driver Status is required"),
  driver_license_number: Yup.string()
    .matches(
      /^[A-Za-z0-9]{6,12}$/,
      "Driver license number must be alphanumeric and between 6 to 12 characters"
    )
    .required("Driver license number is required"),
});
