import React, { useEffect } from "react";
import { Card, Grid, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import InputField from "../../Components/Froms/InputField";
import SpinnerButton from "../../Components/Froms/SpinnerButton";

import {
  useCreateDriverMutation,
  useDropDownDriverQuery,
  useFetchDriverQuery,
} from "../../Redux/DriverRtkApi";
import { AddDriverValidationSchema } from "../../schemas/CreateDriverSchema";
import {
  errorHandler,
  options,
  successHandler,
} from "../../ulits/Commonfuction";
import { useNavigate } from "react-router";
import SpinnerLoading from "../../Components/Spinnerloading";
import CustomAutocomplete from "../../Components/DropDown";

const AddDrivers = () => {
  const { data, isLoading } = useDropDownDriverQuery();
  const [CreateDriver, { isLoading: loading }] = useCreateDriverMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <SpinnerLoading />;
  }
  const Createdriverhandle = async (values, resetForm) => {
    console.log(values);
    const Driverdata = {
      driver_address: values?.address,
      driver_phone_number: values?.phone_number,
      company_user_id: values?.Company_user_id,
      driver_license_number: values?.driver_license_number,
      driver_status: values?.driver_status?.toLowerCase(),
      user: {
        email: values?.email,
        password: values?.password,
        confirm_password: values?.confirm_Password,
        full_name: values?.full_name,
      },
    };
    try {
      const res = await CreateDriver(Driverdata);

      if (res?.data?.user_info?.status) {
        successHandler(res, "Success Add Driver  successfull ");

        navigate("/driver");
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
    <Formik
      initialValues={{
        full_name: "",
        email: "",
        password: "",
        confirm_Password: "",
        address: "",
        phone_number: "",
        Company_user_id: "",
        driver_license_number: "",
        driver_status: "",
        // Added for the dropdown selection
      }}
      validationSchema={AddDriverValidationSchema}
      onSubmit={(values, { resetForm }) => {
        // Handle form submission here
        Createdriverhandle(values);
      }}
    >
      <Form>
        <div className="bg-white border border-4 rounded-lg shadow h-full relative ">
          <div className="flex items-center justify-center p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold">Create a New Add Driver</h3>
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
              <div className="col-span-6 sm:col-span-3 ">
                <InputField
                  label="Email"
                  name="email"
                  className="border-gray-800"
                  placeholder="Email Address"
                  fullWidth
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  className="border-gray-800"
                  placeholder="Password"
                  fullWidth
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputField
                  label="Confirm Password"
                  name="confirm_Password"
                  type="password"
                  className="border-gray-800"
                  placeholder="Confirm Password"
                  fullWidth
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputField
                  label="Driver License Number"
                  name="driver_license_number"
                  type="text"
                  className="border-gray-800"
                  placeholder="Confirm Password"
                  fullWidth
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Field name="selectedOption">
                  {({ field }) => (
                    <CustomAutocomplete
                      label="Select a Company Name "
                      name="Company_user_id"
                      className="border-gray-800"
                      options={data}
                      value={field.value}
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
                      name="driver_status"
                      className="border-gray-800"
                      options={options}
                      value={field.value}
                      fullWidth
                    />
                  )}
                </Field>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputField
                  label="Phone Number"
                  name="phone_number"
                  className="border-gray-800"
                  placeholder="Phone Number"
                  fullWidth
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputField
                  label="Driver Address"
                  name="address"
                  className="border-gray-800"
                  placeholder="Address"
                  fullWidth
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 rounded-b">
            <SpinnerButton
              btntext="Submit"
              type="submit"
              variant="contained"
              color="secondary"
              loading={loading}
            />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default AddDrivers;
