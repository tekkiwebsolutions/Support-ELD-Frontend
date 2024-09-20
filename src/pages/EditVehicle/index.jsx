import React, { useEffect } from "react";
import SpinnerButton from "../../Components/Froms/SpinnerButton";
import { Card, Grid, Typography } from "@mui/material";
import InputField from "../../Components/Froms/InputField";
import CustomAutocomplete from "../../Components/DropDown";
import { Field, Form, Formik } from "formik";
import {
  useDropDownVehicleQuery,
  useFetchVehicleQuery,
  useSingleVehicleQuery,
  useUpdateVehicleMutation,
} from "../../Redux/VehicleRtkApi";
import { useNavigate, useParams } from "react-router";
import { EldConnection, FuelTypes } from "../../ulits/CommonData";
import {
  errorHandler,
  options,
  successHandler,
  transformArray,
} from "../../ulits/Commonfuction";
import SpinnerLoading from "../../Components/Spinnerloading";
import EditVehiclevalidationSchema from "../../schemas/EditVehcileSchema";

const EditVehicle = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSingleVehicleQuery({ id: id });
  const { data: driverOptions } = useDropDownVehicleQuery();
  const navigate = useNavigate();
  const [updateVehicle, { isLoading: loading }] = useUpdateVehicleMutation();

  const AlldriverOptions = transformArray(
    driverOptions,
    "user_id",
    "full_name"
  );

  const EditVehilehandle = async (values) => {
    try {
      const res = await updateVehicle({
        id: id,
        updatedData: values,
      });
      if (res?.data?.status) {
        successHandler(res, "Success Update portal staff successfully ");

        navigate("/vehicle", { replace: true });
      } else {
        errorHandler(res, true);
      }
    } catch (err) {
      console.error("Error occurred during login:", err);
    } finally {
      // Reset loading state
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
        Eld_connection_interface: data?.Eld_connection_interface ?? "",
        Vehicle_identification_number:
          data?.Vehicle_identification_number ?? "",
        Vehicle_status: data?.Vehicle_status ?? "",
        Vehicle_unit: data?.Vehicle_unit ?? "",
        fuel: data?.fuel ?? "",
        model: data?.model ?? "",
        plate_number: data?.plate_number ?? "",
        driver_user_id: data?.driver_user_id ?? "",

        // Added for the dropdown selection
      }}
      validationSchema={EditVehiclevalidationSchema}
      onSubmit={(values, { resetForm }) => {
        // Handle form submission here
        if (values && values !== null) {
          EditVehilehandle(values);
        }
      }}
    >
      {({ values }) => (
        <Form>
          <div className="bg-white border border-4 rounded-lg shadow h-full relative ">
            <div className="flex items-center justify-center p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Edit Vehicle</h3>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6 pb-5">
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Vehicle Identification Number "
                    name="Vehicle_identification_number"
                    value={values?.Vehicle_identification_number}
                    className="border-gray-800"
                    placeholder="Vehicle Identification Number"
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <Field name="selectedOption">
                    {({ field }) => (
                      <CustomAutocomplete
                        label="Eld Connection Interface"
                        name="Eld_connection_interface"
                        className="border-gray-800"
                        options={EldConnection}
                        value={field?.value}
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Field name="selectedOption">
                    {({ field }) => (
                      <CustomAutocomplete
                        label="Fuel"
                        name="fuel"
                        className="border-gray-800"
                        options={FuelTypes}
                        value={field?.value}
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Vehicle Unit"
                    name="Vehicle_unit"
                    className="border-gray-800"
                    value={values?.Vehicle_unit}
                    placeholder="Vehicle unit"
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Field name="selectedOption">
                    {({ field }) => (
                      <CustomAutocomplete
                        label="Status"
                        name="Vehicle_status"
                        className="border-gray-800"
                        options={options}
                        value={field?.value}
                        fullWidth
                      />
                    )}
                  </Field>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <Field name="Driver">
                    {({ field }) => (
                      <CustomAutocomplete
                        label="Driver"
                        name="driver_user_id"
                        className="border-gray-800"
                        options={AlldriverOptions}
                        value={field?.value}
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Plate Number"
                    name="plate_number"
                    value={values?.plate_number}
                    className="border-gray-800"
                    placeholder="plate Number"
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Model"
                    name="model"
                    value={values?.model}
                    className="border-gray-800"
                    placeholder="Model"
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

export default EditVehicle;
