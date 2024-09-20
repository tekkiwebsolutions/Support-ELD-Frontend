import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import SpinnerButton from "../../Components/Froms/SpinnerButton";
import InputField from "../../Components/Froms/InputField";
import { Field, Form, Formik } from "formik";
import { AddPostalStaffValidationSchema } from "../../schemas/AddPortalStaffSchema";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../Redux/Slices/Auth";
import {
  useCreateStaffMutation,
  useFetchStaffQuery,
} from "../../Redux/PortalStaffRtkQueryApi";
import { errorHandler, successHandler } from "../../ulits/Commonfuction";
import { useNavigate } from "react-router";

const AddPostalStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [createPortalStaff] = useCreateStaffMutation();

  const CreatePortalStaffhandle = async (values, resetForm) => {
    const portaldata = {
      designation: values?.designation,
      phone_number: values?.phone_number,
      permissions: {
        can_add_companyadmin: values?.can_add_companyadmin || false,
        can_delete_companyadmin: values?.can_delete_companyadmin || false,
        can_edit_companyadmin: values?.can_edit_companyadmin || false,
        can_view_companyadmin: values?.can_view_companyadmin || false,
        can_add_driver: values?.can_add_driver || false,
        can_delete_driver: values?.can_delete_driver || false,
        can_edit_driver: values?.can_edit_driver || false,
        can_view_driver: values?.can_view_driver || false,
        can_add_vehicle: values?.can_add_vehicle || false,
        can_delete_vehicle: values?.can_delete_vehicle || false,
        can_edit_vehicle: values?.can_edit_vehicle || false,
        can_view_vehicle: values?.can_view_vehicle || false,
      },
      user: {
        email: values?.email,
        password: values?.password,
        confirm_password: values?.confirm_Password,
        full_name: values?.full_name,
      },
    };
    try {
      dispatch(setLoading(true));
      const res = await createPortalStaff(portaldata);
      console.log(res, "res879");
      if (res?.data?.user_info?.status) {
        successHandler(res, "Success Add PortalStaff successfull ");
        resetForm();

        navigate("/portalstaff");
      } else {
        errorHandler(res, true);
      }
    } catch (err) {
      console.error("Error occurred during login:", err);
      errorHandler(err, true);
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  };

  return (
    <Formik
      initialValues={{
        full_name: "",
        email: "",
        password: "",
        confirm_Password: "",
        designation: "",
        phone_number: "",
        can_add_companyadmin: "",
        can_edit_companyadmin: "",
        can_delecte_companyadmin: "",
        can_view_companyadmin: "",
        can_add_vehicle: "",
        can_delete_vehicle: "",
        can_edit_vehicle: "",
        can_view_vehicle: "",
        can_add_driver: "",
        can_edit_driver: "",
        can_delete_driver: "",
        can_view_driver: "",
      }}
      validationSchema={AddPostalStaffValidationSchema}
      onSubmit={(values, { resetForm }) => {
        // Handle form submission here

        if (typeof values === "object" && values !== null) {
          CreatePortalStaffhandle(values, resetForm);
        }
      }}
    >
      <Form>
        <div className="bg-white border border-4 rounded-lg shadow h-full relative ">
          <div className="flex items-center justify-center p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold">Create a New Portal Staff</h3>
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
                  placeholder="Confirm password"
                  fullWidth
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputField
                  label="Designation"
                  name="designation"
                  className="border-gray-800"
                  placeholder="Designation"
                  fullWidth
                />
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
              <div className="col-span-full">
                <Typography
                  variant="subtitle1"
                  color="textSecondary bold"
                  className="mt-5"
                >
                  User Permissions
                </Typography>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label>
                  <Field
                    type="checkbox"
                    name="can_add_companyadmin"
                    className="mr-3"
                  />
                  Can add Company Admin
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label>
                  <Field
                    type="checkbox"
                    name="can_edit_companyadmin"
                    className="mr-3"
                  />
                  Can edit Company Admin
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label>
                  <Field
                    type="checkbox"
                    name="can_delete_companyadmin"
                    className="mr-3"
                  />
                  Can delete Company Admin
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label>
                  <Field
                    type="checkbox"
                    name="can_view_companyadmin"
                    className="mr-3"
                  />
                  Can view Company Admin
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label>
                  <Field
                    type="checkbox"
                    name="can_add_driver"
                    className="mr-3"
                  />
                  Can add Driver
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label>
                  <Field
                    type="checkbox"
                    name="can_edit_driver"
                    className="mr-3"
                  />
                  Can edit Driver
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label>
                  <Field
                    type="checkbox"
                    name="can_delete_driver"
                    className="mr-3"
                  />
                  Can delete Driver
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label>
                  <Field
                    type="checkbox"
                    name="can_view_driver"
                    className="mr-3"
                  />
                  Can view Driver
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label>
                  <Field
                    type="checkbox"
                    name="can_add_vehicle"
                    className="mr-3"
                  />
                  Can add Vehicle
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label>
                  <Field
                    type="checkbox"
                    name="can_edit_vehicle"
                    className="mr-3"
                  />
                  Can edit Vehicle
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label>
                  <Field
                    type="checkbox"
                    name="can_delete_vehicle"
                    className="mr-3"
                  />
                  Can delete Vehicle
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

export default AddPostalStaff;
