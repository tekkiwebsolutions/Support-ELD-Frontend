import React from "react";
import { Button, Typography } from "@mui/material";

const TextIconButton = ({ btntext, Icon, variant="contained",onClick, className,classNametext,color="inherit", ...rest }) => {
  return (
    <Button variant={variant} color={color} {...rest} className={`  !${className}`} onClick={onClick}>
       {Icon &&   <Icon  className="mr-2"/>}
     {btntext}
      </Button>
  );
};

export default TextIconButton;
