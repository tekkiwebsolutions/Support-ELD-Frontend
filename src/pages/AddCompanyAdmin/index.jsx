import { Container, Grid, Typography, Card } from "@mui/material";
import React from "react";
import SpinnerButton from "../../Components/Froms/SpinnerButton";
import { Field, Form, Formik } from "formik";
import InputField from "../../Components/Froms/InputField";
import { AddCompanyAdminValidationSchema } from "../../schemas/AddCompanyAdminschema";
import {
  useCreateCompanyAdminMutation,
  useFetchCompanyAdminQuery,
} from "../../Redux/CompanyAdminRtkQueryApi";
import { errorHandler, successHandler } from "../../ulits/Commonfuction";
import { useNavigate } from "react-router";
import { useDropDownDriverQuery } from "../../Redux/DriverRtkApi";

const AddCompanyAdmin = () => {
  const [CreateCompanyAdminMutation, { loading }] =
    useCreateCompanyAdminMutation();
  const { refetch } = useFetchCompanyAdminQuery();

  const navigate = useNavigate();

  const CreatePortalStaffhandle = async (values, resetForm) => {
    const CompanyAdmindata = {
      address: values?.address,
      phone_number: values?.phone_number,
      company_name: values?.company_name,

      user: {
        email: values?.email,
        password: values?.password,
        confirm_password: values?.confirm_Password,
        full_name: values?.full_name,
      },
    };
    try {
      const res = await CreateCompanyAdminMutation(CompanyAdmindata);

      if (res?.data?.user_info?.status) {
        successHandler(res, "Success Add Company Admin successfull ");
        resetForm();
        await refetch();

        navigate("/company-admin");
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
          password: "",
          confirm_Password: "",
          address: "",
          company_name: "",
          phone_number: "",
        }}
        validationSchema={AddCompanyAdminValidationSchema}
        onSubmit={(values, { resetForm }) => {
          // Handle form submission here
          if (typeof values === "object" && values !== null && !loading) {
            CreatePortalStaffhandle(values, resetForm);
          }
        }}
      >
        <Form>
          <div className="bg-[#eaf1f1] border border-4 rounded-lg shadow h-full relative ">
            <div className="flex items-center justify-center p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Create a New Company Admin</h3>
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
                    label="Company Name"
                    name="company_name"
                    className="border-gray-800"
                    placeholder="Comapany Name"
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
                    className="border-gray-800"
                    placeholder="Confirm password"
                    type="password"
                    fullWidth
                  />
                </div>
                <div className="col-span-full">
                  <InputField
                    label="Address"
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
    </Container>
  );
};

export default AddCompanyAdmin;
