import * as Yup from "yup";



 export const AddCompanyStaffvalidationSchema = Yup.object().shape({
    full_name: Yup.string().required('Full Name is required'),
    email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email address must be valid"
    ),
    
  password: Yup.string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
    "Password must contain at least one lowercase, one uppercase, one number, and one symbol character"
  )
  .min(8, "Password must be at least 8 characters")
  .required("Password is required"),
  confirm_Password: Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Confirm Password is required"),
    role: Yup.string().required('Role is required'),
    staff_phonenumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
    staff_status: Yup.string().required('Staff status is required'),
  });