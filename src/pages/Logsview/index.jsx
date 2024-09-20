import React from "react";
import TextIconButton from "../../Components/Froms/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckIcon from "@mui/icons-material/Check";

const LogsView = () => {
  return (
    <div>
      <div className="flex xs:flex-row  justify-between items-center bg-gray-100 pb-3 shadow-md p-2 w-full">
        <div className="flex-grow text-xl font-normal  bolder mb-2 md:mb-0 md:mr-2 w-full !md:text-center">
          Fri Mar 15, 2024
        </div>
        <div className="flex  gap-2 ">
          <TextIconButton
            btntext="Refresh"
            className="text-white px-4 bg-black py-2 rounded-none flex items-center mb-2 md:mb-0 md:mr-2"
          />

          <TextIconButton
            btntext="Edit"
            className="text-white px-4 py-2 bg-black rounded-none flex items-center"
          />
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-2 shadow-md  w-full">
        <div className="w-full border border-gray-300 p-2 mb-10">
          <div className="flex flex-col md:flex-row md:items-center ">
            <p className="mb-2 md:mb-0 flex items-center mr-2">
              <span className="inline-block mr-2">
                <PersonIcon className="w-4 h-4" />
              </span>
              <span className="text-sm">Charnjit NNG</span>
            </p>
            <p className="mb-2 md:mb-0 flex items-center mr-2">
              <span className="inline-block mr-2">
                <AccessTimeOutlinedIcon className="w-4 h-4" />
              </span>
              <span className="text-sm">USA 70 hour / 8 day</span>
            </p>
            <p className="mb-2 md:mb-0 flex items-center mr-2 text-red-500">
              <span className="inline-block mr-2">
                <ErrorOutlineIcon
                  color="text-red-500"
                  fontSize="10"
                  className="w-4 h-4"
                />
              </span>
              <span className="text-sm ">No Form</span>
            </p>
            <p className="mb-2 md:mb-0 flex items-center text-green-600">
              <span className="inline-block mr-2">
                <CheckIcon
                  color="text-green-600"
                  fontSize="15"
                  className="w-4 h-4"
                />
              </span>
              <span className="text-sm">No Violations</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-2 shadow-md mt-4">
        <div className="flex-grow text-xl font-normal">Driver Log</div>
      </div>
      <div className="flex justify-between bg-[#00bdc4] mx-2 border-gray-300 p-2">
        <p className="text-white text-md">General</p>
      </div>
      <div className="flex justify-between items-center bg-gray-100 shadow-md p-2 pt-0 w-full">
        <div className="container">
          <div className="flex flex-wrap ">
            <div className="w-full">
              <div className="max-w-full">
                <nav className="list-none">
                  <ul className="flex gap-5 text w-full">
                    <li className="w-full p-3 text-black rounded-sm cursor-pointer">
                      <div className="flex flex-col justify-between overflow-x-auto items-start w-full">
                        <React.Fragment>
                          <div className="flex items-start w-full border-b border-e-black p-2">
                            <div className="w-1/2">Driver</div>
                            <div className="w-1/2">Charanjit NNG</div>
                            <div className="w-1/2">Exempt Driver Status</div>
                            <div className="w-1/2">No</div>
                          </div>
                          <div className="flex items-start w-full border-b border-e-black p-2">
                            <div className="w-1/2">Driver ID</div>
                            <div className="w-1/2">charanjit@kei.com</div>
                            <div className="w-1/2">Co-Driver</div>
                            <div className="w-1/2"></div>
                          </div>
                          <div className="flex items-start w-full border-b border-e-black p-2">
                            <div className="w-1/2">Driver License</div>
                            <div className="w-1/2">907751386</div>
                            <div className="w-1/2">Co-Driver ID</div>
                            <div className="w-1/2"></div>
                          </div>
                          <div className="flex items-start w-full border-b border-e-black p-2">
                            <div className="w-1/2">Driver License State</div>
                            <div className="w-1/2">NY</div>
                            <div className="w-1/2">Exceptions</div>
                            <div className="w-1/2"></div>
                          </div>
                        </React.Fragment>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-2 pb-0">
        <div className="flex justify-between bg-[#00bdc4]  border-gray-300 p-2">
          <p className="text-white text-md">Common</p>
        </div>
      </div>
      <div className="flex flex-col bg-gray-100 p-2 pt-0 shadow-md w-full">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-collapse">
            <thead>
              <tr className="bg-primary text-center border border-gray-300">
                <th className="sm:min-w-[200px] md:min-w-[150px] lg:min-w-[100px] xl:min-w-[50px] text-md font-normal text-gray-600 text-start p-2 border-l border-r border-gray-300">
                  Vehicle
                </th>
                <th className="sm:min-w-[200px] md:min-w-[150px] lg:min-w-[100px] xl:min-w-[50px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Vin
                </th>
                <th className="sm:min-w-[50px] md:min-w-[40px] lg:min-w-[30px] xl:min-w-[20px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Odometer(MI)
                </th>
                <th className="sm:min-w-[50px] md:min-w-[40px] lg:min-w-[30px] xl:min-w-[20px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Distance(MI)
                </th>
                <th className="sm:min-w-[50px] md:min-w-[40px] lg:min-w-[30px] xl:min-w-[20px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Engine Hours
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border border-gray-300">
                <td className="p-2 text-gray-600 text-sm text-start font-medium border-r border-gray-300 sm:w-1/5">
                  61
                </td>
                <td className="p-2 text-gray-600 text-sm text-start font-medium bg-white border-r border-gray-300 sm:w-1/5">
                  1FUJGLDR5HLHL6545
                </td>
                <td className="p-2 text-gray-600 text-sm text-start font-medium bg-white border-r border-gray-300 sm:w-1/5">
                  862919
                </td>
                <td className="p-2 text-gray-600 text-sm text-start font-medium bg-white border-r border-gray-300 sm:w-1/5"></td>
                <td className="p-2 text-gray-600 text-sm text-start font-medium bg-white border-r border-gray-300 sm:w-1/5">
                  26720.7
                </td>
              </tr>
              <tr className="bg-primary text-center border border-gray-300">
                <th colspan="3" className="min-w-[500px] sm:min-w-[200px] text-md font-normal text-gray-600 text-start p-2 border-l border-r border-gray-300">
                  Trailer
                </th>
                <th colspan="2" className="min-w-[500px] sm:min-w-[200px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Shipping Docs
                </th>
              </tr>
              <tr className="border border-gray-300">
                <td colspan="5" className="p-2 text-gray-600 text-sm text-start font-medium border-r border-gray-300"></td>
               </tr>
              <tr className="bg-primary text-center border border-gray-300">
                <th className="min-w-[500px] sm:min-w-[200px] text-md font-normal text-gray-600 text-start p-2 border-l border-r border-gray-300">
                  Carrier
                </th>
                <th className="min-w-[500px] sm:min-w-[200px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Main Office
                </th>
                <th className="min-w-[70px] sm:min-w-[50px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Home Terminal
                </th>
                <th colspan="2" className="min-w-[70px] sm:min-w-[50px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Dot Number
                </th>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 text-gray-600 text-sm text-start font-medium border-r border-gray-300">
                  Kaushal Express Inc
                </td>
                <td className="p-2 text-gray-600 text-sm text-start font-medium bg-white border-r border-gray-300">
                  990 E 126TH TER, OLATHE, KS, 66061
                </td>
                <td className="p-2 text-gray-600 text-sm text-start font-medium bg-white border-r border-gray-300">
                  990 E 126TH TER, OLATHE, KS, 66061
                </td>
                <td colspan="2" className="p-2 text-gray-600 text-sm text-start font-medium bg-white border-r border-gray-300">
                  2343528
                </td>
              </tr>
              <tr className="bg-primary text-center border border-gray-300">
                <th colspan="3" className="min-w-[500px] sm:min-w-[200px] text-md font-normal text-gray-600 text-start p-2 border-l border-r border-gray-300">
                  SN(MAC)
                </th>
               
                <th colspan="2" className="min-w-[500px] sm:min-w-[200px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Provider
                </th>
              </tr>
              <tr className="border border-gray-300">
                <td colspan="3" className="p-2 text-gray-600 text-sm text-start font-medium border-r border-gray-300">
                  3B4000161575 (CE:DB:7B:12:2C:0B)
                </td>
                <td colspan="2" className="p-2 text-gray-600 text-sm text-start font-medium border-r border-gray-300">
                  SUPPORT ELD
                </td>
              </tr>
              <tr className="bg-primary text-center border border-gray-300">
                <th colspan="3" className="min-w-[500px] sm:min-w-[200px] text-md font-normal text-gray-600 text-start p-2 border-l border-r border-gray-300">
                  Diagnostic Indicator
                </th>
                <th colspan="2" className="min-w-[500px] sm:min-w-[200px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Malfunction Indicator
                </th>
              </tr>
               <tr className="border border-gray-300">
                <td colspan="3" className="p-2 text-gray-600 text-sm text-start font-medium border-r border-gray-300">
                  No
                </td>
                <td colspan="2" className="p-2 text-gray-600 text-sm text-start font-medium border-r border-gray-300">
                  No
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default LogsView;
