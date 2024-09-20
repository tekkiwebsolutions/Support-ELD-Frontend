import { Card, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import InputField from "../../Components/Froms/InputField";
import {
  useFetchCompanyAdminQuery,
  useSingleCompanyAdminQuery,
  useUpdateCompanyAdminMutation,
} from "../../Redux/CompanyAdminRtkQueryApi";
import SpinnerButton from "../../Components/Froms/SpinnerButton";
import { useNavigate, useParams } from "react-router";
import { EditCompanyAdminValidationSchema } from "../../schemas/EditCompanyAdminSchema";
import SpinnerLoading from "../../Components/Spinnerloading";
import { errorHandler, successHandler } from "../../ulits/Commonfuction";

const EditCompanyAdmin = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSingleCompanyAdminQuery({ id: id });

  const [updateCompanyAdmin, { isLoading: loading }] =
    useUpdateCompanyAdminMutation();
  const navigate = useNavigate();

  const EditPortalStaffhandle = async (values, resetForm) => {
    const updateCompanyAdmindata = {
      designation: values?.designation,
      phone_Number: values?.phone_Number,
      address: values?.address,

      user: {
        email: values?.email,
        full_name: values?.full_name,
      },
    };
    try {
      const res = await updateCompanyAdmin({
        id: id,
        updatedData: updateCompanyAdmindata,
      });
      if (res?.data?.success) {
        successHandler(res, "Update company admin successfully");

        navigate("/company-admin", { replace: true });
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
        full_name: data?.result?.full_name ?? "",
        company_name: data?.result?.company_name ?? "",

        phone_number: data?.result?.phone_number ?? "",
        address: data?.result?.address ?? "",
      }}
      validationSchema={EditCompanyAdminValidationSchema}
      onSubmit={(values, { resetForm }) => {
        // Handle form submission here
        if (typeof values === "object" && values !== null && !loading) {
          EditPortalStaffhandle(values, resetForm);
        }
      }}
    >
      {({ values }) => (
        <Form>
          <div className="bg-white border border-4 rounded-lg shadow h-full relative ">
            <div className="flex items-center justify-center p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Edit Company Admin</h3>
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
                    label="Company Name"
                    name="company_name"
                    className="border-gray-800"
                    placeholder="Compant Name"
                    value={values.company_name}
                    fullWidth
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
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
                    label="Address"
                    name="address"
                    className="border-gray-800"
                    value={values.address}
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
      )}
    </Formik>
  );
};

export default EditCompanyAdmin;
