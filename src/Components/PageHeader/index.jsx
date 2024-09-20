import React from "react";
import TextIconButton from "../../Components/Froms/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const PageHeader = ({ addOnClick, title, btntext, permission }) => {
  const { user_type } = useSelector((state) => state.auth.user);
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <Stack
        direction={isMobile ? "column" : "row"}
        alignItems={isMobile ? "flex-start" : "center"}
        justifyContent="space-between"
        mb={5}
       
      >
        <Typography variant="h4"  >{title}</Typography>

        {user_type === "portal_admin"  ? (
          
          <TextIconButton btntext={btntext} Icon={AddIcon} onClick={addOnClick} />
        ) : (
          permission && (
            <TextIconButton btntext={btntext}  Icon={AddIcon} onClick={addOnClick} />
          )
        )}
      </Stack>
    </div>
  );
};

export default PageHeader;
