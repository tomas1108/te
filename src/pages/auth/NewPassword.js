import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import NewPasswordForm from "../../sections/auth/NewPasswordForm";
import { useScreenDetector } from "../../hooks/useScreenDectector";
const NewPassword = () => {
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
                    Reset Password
                </Typography>
                <Typography sx={{ color: "tex.secondary", mb: 5 }}>
                    Please set your new password
                </Typography>
            </Stack>
            {/* New Password Form */}
            <NewPasswordForm />

            <Link component={RouterLink} to="/auth/login" color="inherit" variant="subtitle2" sx={{mt: 3, mx:"auto",alignItems:"center",display:"inline-flex"}}>
                <CaretLeft />
                Return to sign in
            </Link>




        </>
    )

}
export default NewPassword;
