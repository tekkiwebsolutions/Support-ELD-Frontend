import React, { useEffect } from "react";
import { Card, Grid, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  useSingleDriverQuery,
  useUpdateDriverMutation,
} from "../../Redux/DriverRtkApi";
import { EditDriverValidationSchema } from "../../schemas/EditDriverSchema";
import CustomAutocomplete from "../../Components/DropDown";
import InputField from "../../Components/Froms/InputField";
import SpinnerButton from "../../Components/Froms/SpinnerButton";
import SpinnerLoading from "../../Components/Spinnerloading";
import {
  errorHandler,
  options,
  successHandler,
} from "../../ulits/Commonfuction";

const EditDriver = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSingleDriverQuery({ id: id });
  const navigate = useNavigate();
  const [updateDriver, { isLoading: loading }] = useUpdateDriverMutation();

  const editDriverHandle = async (values, resetForm) => {
    try {
      const res = await updateDriver({
        id: id,
        updatedData: {
          driver_address: values?.driver_address,
          driver_phone_number: values?.driver_phone_number,
          driver_license_number: values?.driver_license_number,
          driver_status: values?.driver_status?.toLowerCase(),
          user: {
            full_name: values?.full_name,
          },
        },
      });

      if (res?.data?.success) {
        successHandler(res, res?.data?.success);

        navigate("/driver");
      } else {
        errorHandler(res, true);
      }
    } catch (err) {
      console.error("Error occurred during driver update:", err);
      // Handle error
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
    <Formik
      initialValues={{
        full_name: data?.user_info?.full_name ?? "",
        driver_license_number: data?.driver_license_number ?? "",
        driver_phone_number: data?.driver_phone_number ?? "",
        driver_address: data?.driver_address ?? "",
        driver_status: data?.driver_status?.toLowerCase() ?? "",
      }}
      validationSchema={EditDriverValidationSchema}
      onSubmit={(values, { resetForm }) => {
        if (typeof values === "object" && values !== null) {
          editDriverHandle(values, resetForm);
        }
      }}
    >
      {({ values }) => (
        <Form>
          <div className="bg-white border border-4 rounded-lg shadow h-full relative ">
            <div className="flex items-center justify-center p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Edit Add Driver</h3>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6 pb-5">
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Full Name"
                    name="full_name"
                    placeholder="Username"
                    value={values.full_name}
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <InputField
                    label="Driver License Number"
                    name="driver_license_number"
                    type="text"
                    value={values.driver_license_number}
                    placeholder="Driver License Number"
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Phone Number"
                    name="driver_phone_number"
                    value={values.driver_phone_number}
                    placeholder="Phone Number"
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Field name="selectedOption">
                    {({ field }) => (
                      <CustomAutocomplete
                        label="Status"
                        name="driver_status"
                        className="border-gray-800"
                        options={options}
                        value={values?.driver_status}
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Driver Address"
                    name="driver_address"
                    value={values.driver_address}
                    placeholder="Driver Address"
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
      )}
    </Formik>
  );
};

export default EditDriver;
