import React, { useEffect } from "react";
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
import {
  useSingleCompanyStaffQuery,
  useUpdateCompanyStaffMutation,
} from "../../Redux/CompanyStaffRtkApi";
import { useNavigate, useParams } from "react-router";
import SpinnerLoading from "../../Components/Spinnerloading";
import { EditCompanyStaffvalidationSchema } from "../../schemas/EditCompanyStaff";

const EditCompanyStaff = () => {
  const [updateCompanyStaff] = useUpdateCompanyStaffMutation();
  const { id } = useParams();
  const { data, error, isLoading } = useSingleCompanyStaffQuery({ id: id });
  const navigate = useNavigate();
  const EditStaffhandle = async (values, resetForm) => {
    const EditStaffdata = {
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
        full_name: values?.full_name,
      },
    };
    try {
      const res = await updateCompanyStaff({
        id: id,
        updatedData: EditStaffdata,
      });
      if (res?.data?.success) {
        successHandler(res, res?.data?.success);

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
  useEffect(() => {
    if (error) {
      errorHandler(error, true);
    }
  }, [error]);
  if (isLoading) {
    return <SpinnerLoading />;
  }
  return (
    <Container>
      <Formik
        initialValues={{
          full_name: data?.result?.full_name ?? "",
          role: data?.result?.role ?? "",
          staff_phonenumber: data?.result?.staff_phonenumber ?? "",
          staff_status: data?.result?.staff_status ?? "",
          can_add_driver:data?.result?.can_add_driver ?? "",
          can_edit_driver:data?.result?.can_edit_driver ?? "",
          can_delete_driver:data?.result?.can_delete_driver ?? "",
          can_view_driver:data?.result?.can_view_driver ?? "",
          can_add_vehicle:data?.result?.can_add_vehicle ?? "",
          can_edit_vehicle:data?.result?.can_edit_vehicle ?? "",
          can_delete_vehicle:data?.result?.can_delete_vehicle ?? "",
          can_view_vehicle:data?.result?.can_view_vehicle ?? "",
        }}
        validationSchema={EditCompanyStaffvalidationSchema}
        onSubmit={(values, { resetForm }) => {
          // Handle form submission here
          if (typeof values === "object" && values !== null) {
            // Call your function to handle form submission
            EditStaffhandle(values); // Reset the form after successful submission
          }
        }}
      >
        {({ values }) => (
          <Form>
            <div className="bg-white border border-4 rounded-lg shadow h-full relative ">
              <div className="flex items-center justify-center p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">Edit Company Staff</h3>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-6 gap-6 pb-5">
                  <div className="col-span-6 sm:col-span-3">
                    <InputField
                      label="Full Name"
                      name="full_name"
                      className="border-gray-800"
                      placeholder="Username"
                      value={values?.full_name}
                      fullWidth
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputField
                      label="Role "
                      name="role"
                      className="border-gray-800"
                      placeholder="Enter role"
                      value={values?.role}
                      fullWidth
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <InputField
                      label="Staff Phone Number "
                      name="staff_phonenumber"
                      className="border-gray-800"
                      placeholder="xyz@gmail.com"
                      value={values?.staff_phonenumber}
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
                          value={values?.staff_status}
                          fullWidth
                        />
                      )}
                    </Field>
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
        )}
      </Formik>
    </Container>
  );
};

export default EditCompanyStaff;
