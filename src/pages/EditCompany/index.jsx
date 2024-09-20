import React, { useEffect, useState } from "react";
import InputField from "../../Components/Froms/InputField";
import { Field, FieldArray, Form, Formik } from "formik";
import SpinnerButton from "../../Components/Froms/SpinnerButton";
import {
  useFetchSingleCompanyQuery,
  useUpdateCompanyMutation,
} from "../../Redux/SingleCompanyViewRtkApi";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import CustomAutocomplete from "../../Components/DropDown";
import CloseIcon from "@mui/icons-material/Close";
import {
  CountryOptions,
  HosOption,
  StateOptions,
  TimeZoneOptions,
  reset,
  resetbreak,
} from "../../ulits/CommonData";
import EditCompanyvalidationSchema from "../../schemas/EditCompany";
import SpinnerLoading from "../../Components/Spinnerloading";
import { errorHandler, successHandler } from "../../ulits/Commonfuction";

const EditCompany = () => {
  const { id } = useParams();
  const { user_id } = useSelector((item) => item.auth.user);
  const { data, isLoading,error } = useFetchSingleCompanyQuery({ id: user_id });
  const [updatedCompany,{isLoading :Loading}] = useUpdateCompanyMutation();
  const Terminal = data?.filter((item) => item.header === "Terminal");
  const navigate = useNavigate();
  const mergedObject = data?.reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {});

  const EditCompanyhandle = async (values) => {
    console.log(values);
    const updateCompanydata = {
      dot_number: values?.dot_number,
      time_zone: values?.time_zone,
      address: values?.address,
      country: values?.country,
      state: values?.state,
      zipcode: values?.zipcode,
      compliance_mode: mergedObject?.compliance_mode,
      terminals: values?.terminals,
      driver_log: {
        id: mergedObject?.id,
        hos_rule: values?.hos_rule,
        cargo_type: values?.cargo_type,
        restart: values?.restart,
        rest_break: values?.rest_break,
        short_haul_exception: values?.short_haul_exception,
        allow_personal_use: values?.allow_personal_use,
        allow_yard_moves: values?.allow_yard_moves,
        unlimited_trailers: values?.unlimited_trailers,
        unlimited_shipping_documents: values?.unlimited_shipping_documents,
      },
    };
    try {
      const res = await updatedCompany({
        id: id,
        updatedData: updateCompanydata,
      });
      if (res?.data?.success) {
        successHandler(res, "Update company  successfully");

        navigate("/company-view", { replace: true });
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
  console.log(mergedObject);
  return (
    <Formik
      initialValues={{
        dot_number: mergedObject?.dot_number ?? "",
        full_name: mergedObject?.full_name ?? "",
        state: mergedObject?.state ?? "",
        zipcode: mergedObject?.zipcode ?? "",
        address: mergedObject?.address ?? "",
        country: mergedObject?.country,
        hos_rule: mergedObject?.hos_rule ?? "",
        time_zone: mergedObject?.time_zone,
        cargo_type: mergedObject?.cargo_type ?? "",
        restart: mergedObject?.restart ?? "",
        rest_break: mergedObject?.rest_break ?? "",
        allow_yard_moves: mergedObject?.allow_yard_moves,
        allow_personal_use: mergedObject?.allow_personal_use,
        short_haul_exception: mergedObject?.short_haul_exception,
        terminals: Terminal || [],
      }}
      validationSchema={EditCompanyvalidationSchema}
      onSubmit={(values) => {
        // Handle form submission here

        if (typeof values === "object" && values !== null && !Loading) {
          EditCompanyhandle(values);
        }
      }}
    >
      {({ values }) => (
        <Form action="#">
          <div class="bg-white border border-4 rounded-lg shadow relative m-10">
            <div class="flex items-start justify-between p-5 border-b  border-black rounded-t">
              <h3 class="text-xl font-semibold">Edit Company</h3>
              <div className="flex items-center ">
                <div className="mr-5">
                  <SpinnerButton
                    btntext="Cancel"
                    className="bg-white rounded-none mr-4"
                    style={{
                      borderColor: "gray",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      color: "black",
                    }}
                    onClick={() => navigate("/company-view", { replace: true })}
                  />
                </div>
                <SpinnerButton
                  btntext="Save"
                  isLoading={Loading}
                  type="submit"
                  className="bg-[#47ad32]"
                />
              </div>
            </div>

            <div class="p-6 space-y-6 border-b mb-10  border-black">
              <div class="grid grid-cols-1 sm:grid-cols-6 gap-6">
                <h3 class="text-xl font-semibold">General Settings</h3>
                {/* <div class="col-span-full">
                  <InputField
                    label="Name"
                    name="full_name"
                    className="border-gray-800"
                    value={values.full_name}
                    placeholder="Enter the Name"
                    fullWidth
                  />
                </div> */}
                <div class="col-span-full">
                  <InputField
                    label="Dot Number"
                    name="dot_number"
                    className="border-gray-800"
                    value={values.dot_number}
                    placeholder="Enter the Dot number"
                    fullWidth
                  />
                </div>
                <div class="col-span-full">
                  <Field name="selectedOption">
                    {({ field }) => (
                      <CustomAutocomplete
                        label="Time Zone"
                        name="time_zone"
                        className="border-gray-800"
                        value={field.value}
                        options={TimeZoneOptions}
                        placeholder="Enter the time Zone"
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
                <div class="col-span-full">
                  <InputField
                    label="Address"
                    name="address"
                    className="border-gray-800"
                    value={values.address}
                    placeholder="Address"
                    fullWidth
                  />
                </div>
                <div class="col-span-4 sm:col-span-3">
                  <Field name="selectedOption">
                    {({ field }) => (
                      <CustomAutocomplete
                        label="State"
                        name="state"
                        className="border-gray-800"
                        value={field.value}
                        options={StateOptions}
                        placeholder="State"
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
                <div class="col-span-4 sm:col-span-3">
                  <Field name="selectedOption">
                    {({ field }) => (
                      <CustomAutocomplete
                        label="country"
                        name="country"
                        options={CountryOptions}
                        className="border-gray-800"
                        value={field.value}
                        placeholder="country"
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
                <div class="col-span-4 sm:col-span-3">
                  <InputField
                    label="Zip/Postal Code"
                    name="zipcode"
                    className="border-gray-800"
                    value={values.zipcode}
                    placeholder="zipcode"
                    fullWidth
                  />
                </div>
              </div>
            </div>

            <FieldArray name="terminals">
              {({ push, remove }) => (
                <>
                  {values?.terminals?.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-6 space-y-6 border-b mb-10 border-black w-full"
                    >
                      {item?.icon && (
                        <div className="col-span-full flex justify-end w-full">
                          <CloseIcon onClick={() => remove(index)} />
                        </div>
                      )}
                      <h3 className="text-xl font-semibold relative bottom-9">
                        {item?.header + " " + (index + 1)}
                      </h3>
                      <div className="grid grid-cols-full sm:grid-cols-full gap-6 w-full">
                        <div className="col-span-full">
                          <Field name={`terminals[${index}].country`}>
                            {({ field }) => (
                              <CustomAutocomplete
                                label="Country"
                                name={`terminals[${index}].country`}
                                options={CountryOptions}
                                className="border-gray-800"
                                value={field.value} // Use field.value here
                                placeholder="Country"
                                fullWidth
                              />
                            )}
                          </Field>
                        </div>
                        <div className="col-span-full">
                          <Field name={`terminals[${index}].time_zone`}>
                            {({ field }) => (
                              <CustomAutocomplete
                                label="Time Zone"
                                name={`terminals[${index}].time_zone`}
                                className="border-gray-800"
                                value={field.value} // Use field.value here
                                options={TimeZoneOptions}
                                placeholder="Enter the time Zone"
                                fullWidth
                              />
                            )}
                          </Field>
                        </div>
                        <div className="col-span-full">
                          <Field name={`terminals[${index}].terminal_address`}>
                            {({ field }) => (
                              <InputField
                                label="Address"
                                name={`terminals[${index}].terminal_address`}
                                className="border-gray-800"
                                value={field.value}
                                placeholder="Address"
                                fullWidth
                              />
                            )}
                          </Field>
                        </div>
                        <div className="col-span-4 sm:col-span-3">
                          <Field name={`terminals[${index}].state`}>
                            {({ field }) => (
                              <CustomAutocomplete
                                label="State"
                                name={`terminals[${index}].state`}
                                className="border-gray-800"
                                value={field.value} // Use field.value here
                                options={StateOptions}
                                placeholder="State"
                                fullWidth
                              />
                            )}
                          </Field>
                        </div>
                        <div className="col-span-4 sm:col-span-3">
                          <Field name={`terminals[${index}].country`}>
                            {({ field }) => (
                              <CustomAutocomplete
                                label="Country"
                                name={`terminals[${index}].country`}
                                options={CountryOptions}
                                className="border-gray-800"
                                value={field.value} // Use field.value here
                                placeholder="Country"
                                fullWidth
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Button to add a new terminal */}

                  <SpinnerButton
                    btntext="Add Terminal"
                    onClick={() =>
                      push({
                        country: "",
                        header: "Terminals",
                        state: "",
                        terminal_address: "",
                        time_zone: "",
                        icon: true,
                      })
                    }
                    className="my-10"
                  />
                </>
              )}
            </FieldArray>

            <div class="bg-white rounded-lg shadow relative m-3">
              <h3 class="text-xl font-semibold">Compliance Settings</h3>
            </div>
            <div class="col-span-6 sm:col-span-3 border-b  border-black  py-5 flex flex-col sm:flex-row ">
              <label
                for="product-name"
                class="text-sm font-medium text-gray-900 block mb-2 sm:w-1/3 mx-4"
              >
                Compliance Mode
              </label>
              {data && mergedObject?.compliance_mode}
            </div>
            <div class="p-6 space-y-6 border-b  border-black">
              <div class="grid grid-cols-full sm:grid-cols-full gap-6">
                <h3 class="text-xl font-semibold ">
                  Default Driver Log Settings Exempt Driver
                </h3>
              
                <div class="col-span-full">
                  <Field name="selectedOption">
                    {({ field }) => (
                      <CustomAutocomplete
                        label="HOS Rules"
                        name="hos_rule"
                        className="border-gray-800"
                        value={field.value}
                        options={HosOption}
                        placeholder="Enter the HOS Rules"
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
                <div class="col-span-full">
                  <InputField
                    label="Cargo Type"
                    name="cargo_type"
                    className="border-gray-800"
                    value={values.cargo_type}
                    placeholder="Enter the Dot number"
                    fullWidth
                  />
                </div>
                <div class="col-span-full">
                  <Field name="selectedOption">
                    {({ field }) => (
                      <CustomAutocomplete
                        label="Restart"
                        name="restart"
                        className="border-gray-800"
                        value={field.value}
                        options={reset}
                        placeholder="Enter the time Zone"
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
                <div class="col-span-full">
                  <Field name="selectedOption">
                    {({ field }) => (
                      <CustomAutocomplete
                        label="Rest Break"
                        name="rest_break"
                        className="border-gray-800"
                        value={values.rest_break}
                        options={resetbreak}
                        placeholder="Enter the break"
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
              

                <div class="col-span-4 sm:col-span-3 flex items-center py-5">
                  <label
                    class="text-sm font-medium text-gray-900 mr-3"
                    for="short-haul-exception"
                  >
                    Allow Yard Moves
                  </label>
                  <Field
                    type="checkbox"
                    id="allow_yard_moves"
                    name="allow_yard_moves"
                    className="mr-3"
                  />
                </div>
                <div class="col-span-4 sm:col-span-3 flex items-center py-5">
                  <label
                    class="text-sm font-medium text-gray-900 mr-3"
                    for="short-haul-exception"
                  >
                    Short-Haul Exception
                  </label>
                  <Field
                    type="checkbox"
                    id="short-haul-exception"
                    name="short_haul_exception"
                    className="mr-3"
                  />
                </div>
                <div class="col-span-4 sm:col-span-3 flex items-center py-5">
                  <label
                    class="text-sm font-medium text-gray-900 mr-3"
                    for="short-haul-exception"
                  >
                    Allow Personal Use
                  </label>
                  <Field
                    type="checkbox"
                    id="allow_personal_use"
                    name="allow_personal_use"
                    className="mr-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditCompany;
