import * as Yup from "yup";

export const EditCompanyAdminValidationSchema = Yup.object({
  full_name: Yup.string().required("Username is required"),

  company_name: Yup.string().required("Company Name is required"),

  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});
