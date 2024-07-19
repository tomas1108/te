import { Stack, Typography, Link } from "@mui/material";
import React from "react";
import VerifyForm from "../../sections/auth/VerifyForm";
import {Link as RouterLink} from 'react-router-dom';
import { CaretLeft } from "phosphor-react";

const Verify = () => {

    return(
        <>
         <Stack spacing={2} sx={{ paddingTop:20, position: "relative" , mb:5 }}>
        <Typography sx={{ textAlign:"center"}} variant="h4"> Verify OTP</Typography>
        {/* <Typography variant="body2">
            Sent to user_email
          </Typography> */}
    
      </Stack>
      {/* Form */}
      <VerifyForm />
        </>
    )
}
export default Verify;