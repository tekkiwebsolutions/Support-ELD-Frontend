// IMPORTS
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import SpinnerButton from "../../Components/Froms/SpinnerButton";
import { useFetchProfileAccountQuery } from "../../Redux/ProfileAccountRtkApi";
import { useParams } from "react-router";
import { errorHandler, formatKey } from "../../ulits/Commonfuction";
import { useEffect } from "react";
import SpinnerLoading from "../../Components/Spinnerloading";

// STYLES
const styles = {
  details: {
    padding: "1rem",
    borderTop: "1px solid #e1e1e1",
  },
  value: {
    padding: "1rem 2rem",
    borderTop: "1px solid #e1e1e1",
    color: "#899499",
  },
};

//APP

const ProfileAccount = () => {
  const { id } = useParams();
  const { user_type, full_name } = useSelector((state) => state.auth.user);
  const { data, error, isLoading } = useFetchProfileAccountQuery({
    usertype: user_type,
    id: id,
  });

  useEffect(() => {
    if (error) {
      errorHandler(error, true);
    }
  }, [error]);
  const fields = [];
  for (const key in data?.result) {
    if (key !== "user_type" && key !== "user_id") {
      fields.push({ label: formatKey(key), value: data?.result[key] });
    }
  }
 
  if (isLoading) {
    return <SpinnerLoading />;
  }
  return (
    <Card variant="outlined">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* CARD HEADER START */}
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          {/* PROFILE PHOTO */}
          {/* <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <PhotoCameraIcon
                sx={{
                  border: "5px solid white",
                  backgroundColor: "#ff558f",
                  borderRadius: "50%",
                  padding: ".2rem",
                  width: 35,
                  height: 35,
                }}
              ></PhotoCameraIcon>
            }
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png"
            ></Avatar>
          </Badge> */}

          {/* DESCRIPTION */}
          <Typography variant="h6">{ data?.result && data?.result?.full_name }</Typography>
          <Typography color="text.secondary">
            {formatKey(data?.result?.user_type) }
          </Typography>
        </Grid>
        {/* CARD HEADER END */}

        {/* DETAILS */}
        {fields &&
          fields.map((user, index) => (
            <Grid container key={index}>
              <Grid item xs={6} style={{ fontWeight: "bold" }}>
                <Typography style={styles.details}>
                  <span style={{ fontWeight: "bold" }}>{user?.label}</span>{" "}
                  {user.email}
                </Typography>
              </Grid>
              {/* VALUES */}
              <Grid item xs={6} sx={{ textAlign: "end" }}>
                <Typography style={styles.value}>{user?.value}</Typography>
              </Grid>
            </Grid>
          ))}

        {/* BUTTON */}
        <Grid item style={styles.details} sx={{ width: "100%" }}>
          <SpinnerButton
            variant="contained"
            color="secondary"
            sx={{ width: "99%", p: 1, my: 2 }}
            btntext="Edit Profile"
          />
        </Grid>
      </Grid>
    </Card>
  );
};
export default ProfileAccount;
