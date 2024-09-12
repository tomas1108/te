import { Stack, Typography, Link, Avatar } from "@mui/material";
import VerifyForm from "../../sections/auth/VerifyForm";
import MailIcon from "../../assets/Images/mail.png"



const Verify = () => {
  return (
    <>
      <Stack spacing={2} sx={{ paddingTop: 18, position: "relative", mb: 5, alignItems: "center" }}>
         <Avatar sx={{ bgcolor: "primary.main", width: 60, height: 60 }}>
            <img src={MailIcon} alt="Mail Icon" />
            </Avatar>
        <Typography
          sx={{ textAlign: "center" }}
          color={"text.primary"}
          variant="h4"
        >
          Check Your Email
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Please enter the code we have sent to your
          <span style={{ display: "block" }}>
            email nguyendo76ngant@gmail.com.
          </span>
        </Typography>
      </Stack>
      {/* Form */}
      <VerifyForm />
    </>
  );
};
export default Verify;
