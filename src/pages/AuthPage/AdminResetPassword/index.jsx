import React from "react";
import InputField from "../../../Components/Froms/InputField";

import SpinnerButton from "../../../Components/Froms/SpinnerButton";
import { Form, Formik } from "formik";
import { ResetValidationSchema } from "../../../schemas/ResetvalidationSchema";

const AdminResetPassword = () => {
  return (
    <Formik
    initialValues={{
      email: '',
    }}
    validationSchema={ResetValidationSchema}
    onSubmit={(values) => {
      // Handle form submission here
      console.log(values);
    }}
    >

    <div className=" w-full">
      <div className="h-screen flex  w-full ">
        <div className="w-full max-w-md m-auto text-white    shadow-lg  py-10 px-16">
          <h1 className="text-3xl text-[#9333ea] font-medium text-primary mt-4 mb-5 text-center">
            SUPPORT EID
          </h1>
          <section className="text-center text-black m-3">
            Please enter your email address. You will receive a link to create a
            new password via email.
          </section>
          <Form className="flex justify-center  flex-col w-full">
            <div className="mt-6 mb-6  ">
              <InputField
                label="Email"
                placeholder="Username"
                name="email"
                ErrorMessage="Enter the Username"
                />
            </div>

            <div className="mt-6 ">
              <SpinnerButton btntext="submit" type="submit" />
            </div>
          </Form>
        </div>
      </div>
    </div>
                </Formik>
  );
};

export default AdminResetPassword;
