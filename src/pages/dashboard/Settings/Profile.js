import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../../../sections/Dashboard/settings/ProfileForm";
import { useDispatch } from "react-redux";
import BackGround from "../../../assets/Images/65.jpg"

const Profile = () => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        backgroundColor: (theme) =>
          // theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
        theme.palette.mode === "light" ? "#FFF" : theme.palette.background.background,
   
        
      }}
      
      
    >
      {/* //<Typography variant="h4">Profile</Typography> */}
      <Box
        sx={{
          width: "40%",
          height: "90%",
          backgroundColor: (theme) =>
           // theme.palette.mode === "light" ? "#FFF" : theme.palette.background.paper,
          theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          borderRadius: 2, // Optional: Add rounded corners
          // backgroundImage: `url(${BackGround})`,
        }}
      >
        <Stack p={4} spacing={1}>
          {/* Header */}
          {/* <Stack direction="row" alignItems={"center"} spacing={3}>
            <IconButton>
              <CaretLeft size={24} color={"#4B4B4B"} />
            </IconButton>

            <Typography variant="h5">Profile</Typography>
          </Stack> */}

          {/* Profile Edit Form */}
        <ProfileForm />
        </Stack>
      </Box>
    </Box>
  );
};

export default Profile;
