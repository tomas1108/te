import { Link, Stack, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from "../../sections/auth/RegisterForm";
import { useScreenDetector } from "../../hooks/useScreenDectector";
const Register = () => {
  const { isPhone678, isisMobile, isTablet, isDesktop } = useScreenDetector();
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          mb: 2,
          position: "relative",
          paddingTop: 8,
          ...(isTablet && { paddingBottom: 7 }),
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Start for free
        </Typography>

        <Typography variant="h4"  sx={{color: "text.primary" }}>Sign Up To ZChat</Typography>

        {/* Register Form */}
        <RegisterForm />

      
      </Stack>
    </>
  );
};
export default Register;
