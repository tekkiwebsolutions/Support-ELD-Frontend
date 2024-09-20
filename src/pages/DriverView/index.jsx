import React from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TextIconButton from "../../Components/Froms/IconButton";

const DriverView = () => {
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",

    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="mx-4">
      <div className="flex xs:flex-row  justify-between items-center bg-gray-100 pb-3 shadow-md p-2 w-full">
        <div className="flex-grow text-xl font-normal  bolder mb-2 md:mb-0 md:mr-2 w-full !md:text-center">
          Abinash Mitter
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
                <EmailOutlinedIcon className="w-4 h-4" />
              </span>
              <span className="text-sm">None</span>
            </p>
            <p className="mb-2 md:mb-0 mr-5 flex items-center mr-2">
              <span className="inline-block mr-2">
                <AccessTimeOutlinedIcon className="w-4 h-4" />
              </span>
              <span className="text-sm">dummy@gmail.com</span>
            </p>
            <p className="mb-2 md:mb-0 flex items-center">
              <span className="inline-block mr-2">
                <PhoneAndroidOutlinedIcon className="w-4 h-4" />
              </span>
              <span className="text-sm">72645F4D-9975-4DD4-893B-8E6AE0F4964E</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-2 shadow-md mt-4">
        <div className="flex-grow text-xl font-normal">Hours of Service</div>
      </div>
      <div className="flex justify-between items-center bg-gray-100 shadow-md p-2 w-full">
        <div className="container">
          <div className="flex flex-wrap ">
            <div className="w-full">
              <div className="max-w-full">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border border-collapse">
                    <thead>
                      <tr className="bg-primary text-center border border-gray-300">
                        <th className="w-1/6 min-w-[130px] text-md font-normal text-gray-600 border-l border-r border-gray-300">
                          Status
                        </th>
                        <th className="w-1/6 min-w-[130px] text-md font-normal text-gray-600 border-r border-gray-300">
                          Date
                        </th>
                        <th className="w-1/6 min-w-[130px] text-md font-normal text-gray-600 border-r border-gray-300">
                          Vehicle
                        </th>
                        <th className="w-1/6 min-w-[130px] text-md font-normal text-gray-600 border-r border-gray-300">
                          Location
                        </th>
                        <th className="w-1/6 min-w-[130px] text-md font-normal text-gray-600 border-r border-gray-300">
                          Break
                        </th>
                        <th className="w-1/6 min-w-[130px] text-md font-normal text-gray-600 border-r border-gray-300">
                          Drive
                        </th>
                        <th className="w-1/6 min-w-[130px] text-md font-normal text-gray-600 border-r border-gray-300">
                          Shift
                        </th>
                        <th className="w-1/6 min-w-[130px] text-md font-normal text-gray-600 border-r border-gray-300">
                          Cycle
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-gray-300">
                        <td className="p-2 text-white text-sm text-center font-medium border-r border-gray-300 bg-gray-400">
                          off duty
                        </td>
                        <td className="p-2 text-gray-600 text-sm text-center font-medium bg-white border-r border-gray-300">
                          Mar 14, 2024 12:03 PM CDT
                        </td>
                        <td className="p-2 text-gray-600 text-sm text-center font-medium bg-[#F3F6FF] border-r border-gray-300">
                          41
                        </td>
                        <td className="p-2 text-gray-600 text-sm text-center font-medium bg-white border-r border-gray-300">
                          10.0mi S from Baltimore, MD
                        </td>
                        <td className="p-2 text-gray-600 text-2xl text-center bg-[#F3F6FF] border-r border-gray-300">
                          06:49
                        </td>
                        <td className="p-2 text-gray-600 text-2xl text-center font-medium bg-white border-r border-gray-300">
                          09:49
                        </td>
                        <td className="p-2 text-gray-600 text-2xl text-center font-medium bg-white border-r border-gray-300">
                          10:52
                        </td>
                        <td className="p-2 text-gray-600 text-2xl text-center font-medium bg-white border-r border-gray-300">
                          7:45
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography sx={{ fontSize: "15px" }}>Recap</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full border border-collapse">
                          <thead>
                            <tr className="bg-primary text-center border border-gray-300">
                              <th className="min-w-[500px] sm:min-w-[200px] text-md font-normal text-gray-600 text-start p-2 border-l border-r border-gray-300">
                                Date
                              </th>
                              <th className="min-w-[500px] sm:min-w-[200px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                                Hour Droves
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border border-gray-300">
                              <td className="p-2 text-gray-600 text-sm text-start font-medium border-r border-gray-300">
                                Thursday, Mar 7
                              </td>
                              <td className="p-2 text-gray-600 text-sm text-start font-medium bg-white border-r border-gray-300">
                                01.89
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                  >
                    <Typography sx={{ fontSize: "15px" }}>Map</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                      blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-2 shadow-md mt-4">
        <div className="flex-grow text-xl font-normal">Logs</div>
      </div>
      <div className="p-2 pb-0">
        <div className="flex justify-between bg-[#00bdc4]  border-gray-300 p-2">
          <p className="text-white text-md">Last 14 Days</p>
          <p className="text-white text-md inline">
            <span className="display: inline-block; mr-1">More </span>
            <span className="display: inline-block;  margin-left: 8px;">
              <CalendarMonthIcon fontSize="20px" />
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col bg-gray-100 p-2 pt-0 shadow-md w-full">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-collapse">
            <thead>
              <tr className="bg-primary text-center border border-gray-300">
                <th className="min-w-[500px] sm:min-w-[200px] text-md font-normal text-gray-600 text-start p-2 border-l border-r border-gray-300">
                  Date
                </th>
                <th className="min-w-[500px] sm:min-w-[200px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Hour Driven
                </th>
                <th className="min-w-[70px] sm:min-w-[50px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Violation
                </th>
                <th className="min-w-[70px] sm:min-w-[50px] text-md font-normal text-gray-600 text-start p-2 border-r border-gray-300">
                  Form & Manner
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-gray-300">
                <td className="p-2 text-gray-600 text-sm text-start font-medium border-r border-gray-300">
                  Thursday, Mar 7
                </td>
                <td className="p-2 text-gray-600 text-sm text-start font-medium bg-white border-r border-gray-300">
                  01.89
                </td>
                <td className="p-2 text-gray-600 text-sm text-start font-medium bg-white border-r border-gray-300"></td>
                <td className="p-2 text-gray-600 text-sm text-start font-medium bg-white border-r border-gray-300">
                  Not Certified
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverView;
