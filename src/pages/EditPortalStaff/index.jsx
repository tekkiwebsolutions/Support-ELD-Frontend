import { Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import SpinnerButton from "../../Components/Froms/SpinnerButton";
import InputField from "../../Components/Froms/InputField";
import { Field, Form, Formik } from "formik";

import {
  useFetchStaffQuery,
  useSinglefetchStaffQuery,
  useUpdateStaffMutation,
} from "../../Redux/PortalStaffRtkQueryApi";
import { errorHandler, successHandler } from "../../ulits/Commonfuction";
import { useNavigate, useParams } from "react-router";
import { EditPostalStaffValidationSchema } from "../../schemas/EditPortalStaffSchema";
import SpinnerLoading from "../../Components/Spinnerloading";

const EditPostalStaff = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updatePostalStaff, { isloading }] = useUpdateStaffMutation();
  const {
    data,
    isLoading: loading,
    error,
  } = useSinglefetchStaffQuery({ id: id });

  const EditPortalStaffhandle = async (values, resetForm) => {
    const portaldata = {
      designation: values?.designation,
      phone_Number: values?.phone_Number,
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
        full_name: values?.full_name,
      },
    };
    try {
      const res = await updatePostalStaff({
        id: id,
        updatedData: portaldata,
      });
      if (res?.data?.success) {
        successHandler(res, "Success Update portal staff successfully ");

        navigate("/portalstaff", { replace: true });
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
  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <Formik
      initialValues={{
        full_name: data?.result?.full_name ?? "",

        designation: data?.result?.designation ?? "",
        phone_number: data?.result?.phone_number ?? "",
        can_add_companyadmin: data?.result?.can_add_companyadmin ?? "",
        can_edit_companyadmin: data?.result?.can_edit_companyadmin ?? "",
        can_delete_companyadmin: data?.result?.can_delete_companyadmin ?? "",
        can_view_companyadmin: data?.result?.can_view_companyadmin ?? "",
        can_add_driver: data?.result?.can_add_driver ?? "",
        can_delete_driver: data?.result?.can_delete_driver ?? "",
        can_edit_driver: data?.result?.can_view_driver ?? "",
        can_view_driver: data?.result?.can_view_driver ?? "",
        can_add_vehicle: data?.result?.can_add_vehicle ?? "",
        can_delete_vehicle: data?.result?.can_delete_vehicle ?? "",
        can_edit_vehicle: data?.result?.can_edit_vehicle ?? "",
        can_view_vehicle: data?.result?.can_view_vehicle ?? "",
      }}
      validationSchema={EditPostalStaffValidationSchema}
      onSubmit={(values, { resetForm }) => {
        // Handle form submission here
        if (typeof values === "object" && values !== null) {
          EditPortalStaffhandle(values, resetForm);
        }
      }}
    >
      {({ values }) => (
        <Form>
          <div className="bg-white border border-4 rounded-lg shadow h-full relative ">
            <div className="flex items-center justify-center p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">
                Edit  Company Admin
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
                    value={values.full_name}
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <InputField
                    label="Phone Number"
                    name="phone_number"
                    className="border-gray-800"
                    value={values.phone_number}
                    placeholder="Phone Number"
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Designation"
                    name="designation"
                    className="border-gray-800"
                    value={values.designation}
                    placeholder="Designation"
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
                      Checked={values.can_add_companyadmin}
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
                      Checked={values.can_edit_companyadmin}
                    />
                    Can edit Company Admin
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label>
                    <Field
                      type="checkbox"
                      Checked={values.can_delete_companyadmin}
                      name="can_delete_companyadmin"
                      className="mr-3"
                    />
                    Can delect Company Admin
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label>
                    <Field
                      type="checkbox"
                      name="can_view_companyadmin"
                      Checked={values?.can_view_companyadmin}
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
                      Checked={values.can_add_driver}
                    />
                    Can add Driver
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label>
                    <Field
                      type="checkbox"
                      name="can_edit_driver"
                      Checked={values.can_edit_driver}
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
                      Checked={values.can_delete_driver}
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
                      Checked={values.can_view_driver}
                      className="mr-3"
                    />
                    Can view Driver
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label>
                    <Field
                      type="checkbox"
                      name="can_add_vehical"
                      Checked={values.can_add_vehicle}
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
                      Checked={values.can_edit_vehicle}
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
                      Checked={values.can_delete_vehicle}
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
                      Checked={values.can_view_vehicle}
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
      )}
    </Formik>
  );
};

export default EditPostalStaff;
