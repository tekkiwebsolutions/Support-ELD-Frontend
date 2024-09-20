import React from "react";
import InputField from "../../../Components/Froms/InputField";
import SpinnerButton from "../../../Components/Froms/SpinnerButton";
import { Link,   } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { LoginValidationSchema } from "../../../schemas/LoginValidationSchema";
import { setLoading } from "../../../Redux/Slices/Auth";
import { useLoginMutation } from "../../../Redux/AuthRtkQueryApi";
import { errorHandler, successHandler } from "../../../ulits/Commonfuction";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [loginMutation] = useLoginMutation();
  
  const loginAsUser = async (values) => {
    try {
      dispatch(setLoading(true));
      const res = await loginMutation(values);
      if (res?.data?.status) {
        successHandler(res, "Success login was successful ");
       
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
        email: "",
        password: "",
      }}
      validationSchema={LoginValidationSchema}
      onSubmit={(values) => {
        // Handle form submission here
        if (typeof values === "object" && values !== null) {
          loginAsUser(values);
        }
      }}
    >
      <div className=" w-full">
        <div className="h-screen flex  w-full ">
          <div className="w-full max-w-md m-auto text-white    shadow-lg  py-10 px-16">
            <h1 className="text-3xl text-[#9333ea] font-medium text-primary mt-4 mb-5 text-center">
              SUPPORT EID
            </h1>
            <section className="text-center text-black m-3">
              Log to your account
            </section>
            <Form className="flex justify-center  flex-col w-full">
              <div className="mt-6 mb-6  ">
                <InputField
                  label="Email"
                  name="email"
                   className="w-full"
                  placeholder="Username"
                  ErrorMessage="Enter the Username"
                />
              </div>
              <div className=" mb-6 ">
                <InputField
                  label="Password"
                  type="password"
                  className="w-full"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <Stack
                direction="row"
                alignItems="end"
                variant="subtitle2"
                className="text-[#1565c0]   underline"
                justifyContent="flex-end"
                sx={{ my: 3 }}
              >
                <Link to="/reset-password">Forgot password?</Link>
              </Stack>
              <div className="mt-6 ">
                <SpinnerButton
                  btntext="Login"
                  type="submit"
                  loading={loading}
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default AdminLogin;
