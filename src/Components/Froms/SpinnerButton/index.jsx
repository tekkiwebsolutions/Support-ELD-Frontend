import React from "react";
import { Button } from "@mui/material";
import SpinnerLoading from "../../Spinnerloading";

const SpinnerButton = ({ btntext, loading, className, onClick, ...rest }) => {
  return (
    // <div className="relative">
      <Button
        // variant="contained"
        // color="secondary"
        startIcon={loading && <SpinnerLoading size={25} className="mr-4" />}
        className={`w-full bg-blue  ${className}`} // Ensure there's a space before className
        disabled={loading} // Disable the button when loading
        {...rest}
        onClick={onClick}
      >
        {btntext}
      </Button>
    // </div>
  );
};

export default SpinnerButton;
