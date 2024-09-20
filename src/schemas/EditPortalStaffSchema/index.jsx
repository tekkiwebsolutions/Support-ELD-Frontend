import * as Yup from "yup";

export const EditPostalStaffValidationSchema = Yup.object({
  full_name: Yup.string().required("Username is required"),

  designation: Yup.string().required("Designation is required"),
  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});
