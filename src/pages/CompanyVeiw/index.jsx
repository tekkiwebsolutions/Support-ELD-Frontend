import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetchSingleCompanyQuery } from "../../Redux/SingleCompanyViewRtkApi";
import { errorHandler, formatKey } from "../../ulits/Commonfuction";
import { Switch } from "@mui/material";
import PageHeader from "../../Components/PageHeader";
import SpinnerButton from "../../Components/Froms/SpinnerButton";
import { useNavigate } from "react-router";

const CompanyView = () => {
  const { user_id } = useSelector((item) => item.auth.user);
  const { data ,error} = useFetchSingleCompanyQuery({ id: user_id });
  const navigate = useNavigate();
  console.log(data, "data");
  useEffect(() => {
    if (error) {
      errorHandler(error, true);
    }
  }, [error]);
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mx-5">
        <PageHeader title="Company Details" />
        <SpinnerButton
          btntext="Edit"
          className="bg-black "
          onClick={() => navigate(`/edit-company/${user_id}`,{replace:true})}
        />
      </div>

      <div class=" flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div class="flex-shrink-0 w-full md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
          {data &&
            data?.map((item, index) => (
              <div key={index} className="w-full px-4">
                <h2 className="title-font font-medium p-2 text-white font-extrabold bg-blue-500 tracking-widest text-md">
                  {formatKey(item.header)}
                </h2>
                <nav className="list-none">
                  <ul className="flex  gap-5 text w-full">
                    <li className="w-full p-3 text-black rounded-sm cursor-pointer ">
                      <div className="flex flex-col justify-between items-start w-full">
                        {Object.keys(item).map((key) => {
                          // Exclude "Header" and "Company id"
                          if (key !== "header" && key !== "company_id" &&key !== "id" ) {
                            return (
                              <React.Fragment key={key}>
                                <div className="flex items-start w-full border-b w-full border-e-black p-2">
                                  <div className="w-1/2">{formatKey(key)}</div>
                                  <div className="w-1/2">
                                    {typeof item?.[key] === "boolean" ? (
                                      <Switch
                                        checked={item?.[key]}
                                        inputProps={{
                                          "aria-label": "controlled",
                                        }}
                                      />
                                    ) : (
                                      item?.[key]
                                    )}
                                  </div>
                                </div>
                              </React.Fragment>
                            );
                          }
                          return null; // Skip rendering "Header" and "Company id"
                        })}
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyView;
