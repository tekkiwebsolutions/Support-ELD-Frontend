import * as Yup from "yup";



 export const EditCompanyStaffvalidationSchema = Yup.object().shape({
    full_name: Yup.string().required('Full Name is required'),
  
    

    role: Yup.string().required('Role is required'),
    staff_phonenumber:  Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
    staff_status: Yup.string().required('Staff status is required'),
  });