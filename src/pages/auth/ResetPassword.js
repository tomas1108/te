import { Link, Stack, Tooltip, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import ResetPasswordForm from "../../sections/auth/ResetPasswordFormSent";
import { useScreenDetector } from "../../hooks/useScreenDectector";

const ResetPassword = () => {
  const { isMobile, isTablet, isDesktop } = useScreenDetector();

  const getPaddingTop = () => {
    if (isMobile) return 10;
    if (isTablet) return 15;
    return 20; // for isDesktop
  };

  return (
    <>
      <Stack
        spacing={2}
        sx={{ paddingTop: getPaddingTop(), position: "relative" }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          paragraph
          sx={{ textAlign: isMobile ? "center" : "left" }}
        >
          Forgot Your Password?
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            mb: 5,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Please enter your email and we'll send you a link to reset your
          password.
        </Typography>
        {/*  Reset Pass Form */}
        <ResetPasswordForm />

        <Link
          component={RouterLink}
          to="/auth/login"
          color="inherit"
          variant="subtitle2"
          sx={{
            mt: 3,
            mx: "auto",
            alignItems: "center",
            display: "inline-flex",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <Tooltip title="Back to login" >
          <CaretLeft />
         </Tooltip>
        </Link>
      </Stack>
    </>
  );
};
export default ResetPassword;
