import { Stack, Typography, Button } from "@mui/material";
import React from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import { LoginFom } from"../../sections/auth/Login.tsx";

import LoginForm from "../../sections/auth/LoginForm";
const Login = () => {
  return (
    <>
      <Stack spacing={4} sx={{ paddingTop:20, position: "relative" }}>
      
        <Typography variant="h4" sx={{ color: "text.primary" }}>Sign In To ZChat</Typography>

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
