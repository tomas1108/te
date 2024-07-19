import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import EmailIcon from "@mui/icons-material/Email";
import { Eye, EyeSlash } from "phosphor-react";
import { LoginUser } from "../../redux/slices/auth";
import { useScreenDetector } from "../../hooks/useScreenDectector";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { isMobile } = useScreenDetector();

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      dispatch(LoginUser(data));
      console.log(data);
    } catch (error) {
      console.log(error);
      // Handle error states or feedback here
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Email address"
          type="email"
          {...register("email")}
          required
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <EmailIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ width: "100%" }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          required
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ width: "100%" }}
        />
      </Stack>
      <Stack spacing={2} sx={{ mt: 2, alignItems: "center" }}>
        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Sign In
        </LoadingButton>
      </Stack>
      <Grid container spacing={2} sx={{ my: 2, mx: 0.1 }}>
        <Grid sm={6} xs={12}>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">
              {" "}
              Don’t have an account? 
            </Typography>

            <Link
              to={"/auth/register"}
              component={RouterLink}
              variant="subtitle2"
            >
              Sign Up
            </Link>
          </Stack>
        </Grid>
        <Grid sm={6} xs={12}>
          <Stack alignItems={isMobile ? "center" : "flex-end"}>
            <Link
              component={RouterLink}
              to="/auth/reset-password"
              variant="body2"
              color="inherit"
              underline="always"
            >
              Forgot Password ?
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
