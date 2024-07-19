import { Stack, Typography, Button } from "@mui/material";
import React from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import { LoginFom } from"../../sections/auth/Login.tsx";

import LoginForm from "../../sections/auth/LoginForm";
const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ paddingTop:20, position: "relative" }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Start for free
        </Typography>

        <Typography variant="h4">Sign In to Zchat</Typography>

        {/* Login Form */}
        {/* <LoginForm /> */}

        <LoginFom />  

        {/* Auth Social */}
        {/* <AuthSocial /> */}
      </Stack>
    </>
  );
};
export default Login;
