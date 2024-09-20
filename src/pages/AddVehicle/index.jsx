import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import InputField from "../../Components/Froms/InputField";
import SpinnerButton from "../../Components/Froms/SpinnerButton";
import { Field, Form, Formik } from "formik";
import CustomAutocomplete from "../../Components/DropDown";
import AddVehiclevalidationSchema from "../../schemas/AddVehicleSchema";
import {
  errorHandler,
  options,
  successHandler,
  transformArray,
} from "../../ulits/Commonfuction";
import {
  useCreateVehicleMutation,
  useDropDownVehicleQuery,
  useFetchVehicleQuery,
} from "../../Redux/VehicleRtkApi";
import { useNavigate } from "react-router";
import { EldConnection, FuelTypes } from "../../ulits/CommonData";

const AddVehicle = () => {
  const [CreateVehicle, { isLoading }] = useCreateVehicleMutation();
  const { data: driverOptions } = useDropDownVehicleQuery();

  const navigate = useNavigate();
  const CreateVehiclehandle = async (values, resetForm) => {
    try {
      const res = await CreateVehicle(values);

      if (res?.data?.status) {
        successHandler(res, "status Add vehicle  successfully");

        navigate("/vehicle");
      } else {
        errorHandler(res, true);
      }
    } catch (err) {
      console.error("Error occurred during login:", err);
      errorHandler(err, true);
    } finally {
    }
  };

  const AlldriverOptions = transformArray(
    driverOptions,
    "user_id",
    "full_name"
  );
  return (
    <Formik
      initialValues={{
        Eld_connection_interface: "",
        Vehicle_identification_number: "",
        Vehicle_status: "",
        Vehicle_unit: "",
        fuel: "",
        model: "",
        plate_number: "",
        driver_user_id: "",

        // Added for the dropdown selection
      }}
      validationSchema={AddVehiclevalidationSchema}
      onSubmit={(values, { resetForm }) => {
        // Handle form submission here
        CreateVehiclehandle(values);
      }}
    >
      <Form>
        <div className="bg-white border border-4 rounded-lg shadow h-full relative ">
          <div className="flex items-center justify-center p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold">Create a New Add Vehicle</h3>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6 pb-5">
              <div className="col-span-6 sm:col-span-3">
                <InputField
                  label="Vehicle Unit"
                  name="Vehicle_unit"
                  className="border-gray-800"
                  placeholder="Vehicle unit"
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
                <InputField
                  label="Vehicle Identification Number "
                  name="Vehicle_identification_number"
                  className="border-gray-800"
                  placeholder="Vehicle Identification Number"
                  fullWidth
                />
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
                  className="border-gray-800"
                  placeholder="plate Number"
                  fullWidth
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputField
                  label="Model"
                  name="model"
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
              loading={isLoading}
            />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default AddVehicle;
