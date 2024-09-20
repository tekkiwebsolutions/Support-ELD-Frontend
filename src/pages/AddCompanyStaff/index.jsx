import React from "react";
import SpinnerButton from "../../Components/Froms/SpinnerButton";
import InputField from "../../Components/Froms/InputField";
import { Field, Form, Formik } from "formik";
import { Container } from "@mui/material"; // Assuming you're using Material-UI Container
import CustomAutocomplete from "../../Components/DropDown";
import {
  errorHandler,
  options,
  successHandler,
} from "../../ulits/Commonfuction";
import { AddCompanyStaffvalidationSchema } from "../../schemas/AddCompanyStaff";
import { useCreateCompanyStaffMutation } from "../../Redux/CompanyStaffRtkApi";
import { useNavigate } from "react-router";

const AddCompanyStaff = () => {
  const [CreateCompanyStaffMutation] = useCreateCompanyStaffMutation();
const navigate=useNavigate()
  const CreatePortalStaffhandle = async (values, resetForm) => {
    const CompanyStaffdata = {
      role: values?.role,
      staff_status: values?.staff_status,
      staff_phonenumber: values?.staff_phonenumber,
      permissions:{
        can_add_driver:values?.can_add_driver || false,
        can_edit_driver:values?.can_edit_driver || false,
        can_delete_driver:values?.can_delete_driver || false,
        can_view_driver:values?.can_view_driver || false,
        can_add_vehicle :values?.can_add_vehicle ||false,
        can_edit_vehicle:values?.can_edit_vehicle  || false,
        can_delete_vehicle:values?.can_delete_vehicle  || false,
        can_view_vehicle:values?.can_view_vehicle  ||false
      },

      user: {
        email: values?.email,
      full_name: values?.full_name,
      confirm_password:values?.confirm_Password,
      password:values?.password
      },
    };
    try {
      const res = await CreateCompanyStaffMutation(CompanyStaffdata);

      if (res?.data?.user_info?.status) {
        successHandler(res, "Success Add Company Admin successfull ");

        // await refetch();

        navigate("/company-staff");
      } else {
        errorHandler(res, true);
      }
    } catch (err) {
      console.error("Error occurred during login:", err);
      errorHandler(err, true);
    } finally {
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{
          full_name: "",
          email: "",
          role: "",
          staff_phonenumber: "",
          staff_status: "",
          confirm_Password:"",
          password:"",
          can_add_driver:"",
          can_edit_driver:"",
          can_delete_driver:"",
          can_view_driver:"",
          can_add_vehicle:"",
          can_edit_vehicle:"",
          can_delete_vehicle:"",
          can_view_vehicle:"",
        }}
        validationSchema={AddCompanyStaffvalidationSchema}
        onSubmit={(values, { resetForm }) => {
          // Handle form submission here
          if (typeof values === "object" && values !== null) {
            // Call your function to handle form submission
            CreatePortalStaffhandle(values); // Reset the form after successful submission
          }
        }}
      >
        <Form>
          <div className="bg-white border border-4 rounded-lg shadow h-full relative ">
            <div className="flex items-center justify-center p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">
                Create a New Company Staff
              </h3>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6 pb-5">
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Full Name"
                    name="full_name"
                    className="border-gray-800"
                    placeholder="Username"
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Email"
                    name="email"
                    className="border-gray-800"
                    placeholder="xyz@gmail.com"
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    className="border-gray-800"
                    placeholder="Username"
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Confirm Password"
                    name="confirm_Password"
                    type="password"
                    className="border-gray-800"
                    placeholder="xyz@gmail.com"
                    fullWidth
                  />
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Role "
                    name="role"
                    className="border-gray-800"
                    placeholder="xyz@gmail.com"
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Staff Phone Number "
                    name="staff_phonenumber"
                    className="border-gray-800"
                    placeholder="xyz@gmail.com"
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Field name="selectedOption">
                    {({ field }) => (
                      <CustomAutocomplete
                        label="Status"
                        name="staff_status"
                        className="border-gray-800"
                        options={options}
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
                <div className="col-span-6 sm:col-span-3">
               
                <label>
                      <Field
                        type="checkbox"
                        name="can_add_driver"
                        className="mr-3"
                      />
                     Can Add Driver
                    </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
               
               <label>
                     <Field
                       type="checkbox"
                       name="can_edit_driver"
                       className="mr-3"
                     />
                     Can Edit Driver
                   </label>
               </div>
               <div className="col-span-6 sm:col-span-3">
               
               <label>
                     <Field
                       type="checkbox"
                       name="can_delete_driver"
                       className="mr-3"
                     />
                     Can Add Driver
                   </label>
               </div>
               <div className="col-span-6 sm:col-span-3">
               
               <label>
                     <Field
                       type="checkbox"
                       name="can_view_driver"
                       className="mr-3"
                     />
                     Can Edit  Driver
                   </label>
               </div>
               <div className="col-span-6 sm:col-span-3">
               
               <label>
                     <Field
                       type="checkbox"
                       name="can_add_vehicle"
                       className="mr-3"
                     />
                    Can Add Vehicle
                   </label>
               </div>
               <div className="col-span-6 sm:col-span-3">
               
               <label>
                     <Field
                       type="checkbox"
                       name="can_edit_vehicle"
                       className="mr-3"
                     />
                    Can Edit Vehicle
                   </label>
               </div>
               <div className="col-span-6 sm:col-span-3">
               
               <label>
                     <Field
                       type="checkbox"
                       name="can_delete_vehicle"
                       className="mr-3"
                     />
                    Can Delete Vehicle
                   </label>
               </div>
               <div className="col-span-6 sm:col-span-3">
               
               <label>
                     <Field
                       type="checkbox"
                       name="can_view_vehicle"
                       className="mr-3"
                     />
                    Can view Vehicle
                   </label>
               </div>
                {/* Add more InputField components for other form fields */}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 rounded-b">
              <SpinnerButton
                btntext="Submit"
                type="submit"
                variant="contained"
                color="secondary"
                // Add loading prop when loading state is available
              />
            </div>
          </div>
        </Form>
      </Formik>
    </Container>
  );
};

export default AddCompanyStaff;
