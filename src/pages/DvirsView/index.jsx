import React from "react";
import PrintIcon from "@mui/icons-material/Print";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const DvirsView = () => {
  return (
    <div className="flex flex-col mx-4">
      <div className="flex justify-between items-center bg-gray-200 p-4 shadow-md ">
        <div className="flex-grow text-xl font-bold">
          Mon, Feb 26, 2024 8:29 AM CST
        </div>
        <div className="flex">
          <button className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center">
            Delete
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center">
            <PrintIcon className="mr-2" />
            Print
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-200 p-4 shadow-md  w-full">
        <div className="w-full  mx-4 border border-black p-2 ">
          <p className="flex items-center w-full">
            <PersonIcon className="mr-2" /> Kenneth A Jr Smith{" "}
            <DirectionsBusIcon className="mx-2" /> 500{" "}
            <MyLocationIcon className="mx-2" /> 8mi NNE from Middletown, DE
          </p>
        </div>
      </div>
      <div className=" bg-gray-200 p-4 shadow-md mt-3">
        <h5 className="text-lg">Defects</h5>
        <ol className="mt-2 border border-black border-b-0 text-sm">
          <li className="flex items-center justify-between border-b border-black p-2 ">
            <span>VEHICLE</span>
            <span className="flex-grow text-center">No defects specified</span>
          </li>
          <li className="flex items-center justify-between border-b border-black p-1">
            <span>VEHICLE</span>
            <span className="flex-grow text-center">No defects specified</span>
          </li>
          <li className="flex items-center justify-between border-b border-black p-1">
            <span>VEHICLE</span>
            <span className="flex-grow text-center">No defects specified</span>
          </li>
          <li className="flex items-center justify-between border-b border-black p-1">
            <span>VEHICLE</span>
            <span className="flex-grow text-center">No defects specified</span>
          </li>
          <li className="flex items-center justify-between border-b border-black p-1">
            <span>VEHICLE</span>
            <span className="flex-grow text-center">No defects specified</span>
          </li>
        </ol>
      </div>
      <div className="bg-gray-200 p-4 shadow-md mt-3 flex flex-col">
    <div className="mx-4 flex justify-between items-center">
        <div className="flex-grow text-md font-bold">Driver Signature</div>
        <div>02/26/2024</div>
    </div>
    <p className="text-[#35c45b] mx-4 text-sm mt-4">
        <CheckCircleIcon color="#35c45b" className="mr-1"/> Vehicle Condition Satisfactory
    </p>
    <div className="mx-4 mt-4 flex justify-end">
        <img className="max-w-full h-auto" src="https://s3.amazonaws.com/hos247-user-files/user_files/Company_UDUIm5OWgd/User_6ZzNkgrl_/User_6ZzNkgrl__sig_0DWXmFRCtq" alt="Signature Image"/>
    </div>
</div>

    </div>
  );
};

export default DvirsView;
