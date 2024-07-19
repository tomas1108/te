import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  TextField,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Eye, EyeSlash } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const emailDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
];

export default function AuthRegisterForm() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      birthDate: "",
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfirm) {
      setError("passwordConfirm", {
        type: "manual",
        message: "Passwords must match",
      });
      return;
    }

    try {
      dispatch(RegisterUser(data, navigate));
    } catch (error) {
      reset();
      setError("afterSubmit", {
        type: "manual",
        message: error.message,
      });
    }
  };

  const today = new Date();
  const maxDate = `${today.getFullYear() - 1}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // const termsAccepted = watch("terms");

  const [emailInputValue, setEmailInputValue] = useState("");

  const validateNoNumbers = (value) => {
    return /^[^0-9]*$/.test(value);
  };

  const handleChange = (field, value) => {
    setValue(field, value);
    if (!validateNoNumbers(value)) {
      setError(field, {
        type: "manual",
        message: "Field must not contain numbers",
      });
    } else {
      setError(field, {
        type: "",
        message: "",
      });
    }
  };
  const validatePasswordLength = (value) => {
    return value.length >= 8;
  };

  const handlePasswordChange = (value) => {
    setValue("password", value);
    if (!validatePasswordLength(value)) {
      setError("password", {
        type: "manual",
        message: "Password must be at least 8 characters",
      });
    } else {
      setError("password", {
        type: "",
        message: "",
      });
    }
  };

  const handlePasswordConfirmChange = (value) => {
    setValue("passwordConfirm", value);
    if (value !== watch("password")) {
      setError("passwordConfirm", {
        type: "manual",
        message: "Passwords must match",
      });
    } else {
      setError("passwordConfirm", {
        type: "",
        message: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} mb={1}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <Stack direction={{ xs: "colum", sm: "row" }} spacing={2}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "First name required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: "Last name required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                error={!!errors.lastName}
                fullWidth
                helperText={errors.lastName?.message}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            )}
          />
        </Stack>

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Email must be a valid email address",
            },
          }}
          render={({ field }) => (
            <Autocomplete
              freeSolo
              options={emailDomains.map(
                (domain) => `${emailInputValue.split("@")[0]}@${domain}`
              )}
              inputValue={emailInputValue}
              onInputChange={(event, newInputValue) => {
                setEmailInputValue(newInputValue);
                field.onChange(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  label="Email address"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          )}
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Gender"
                fullWidth
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="birthDate"
            control={control}
            rules={{ required: "Birth date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Birth Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: maxDate,
                }}
                error={!!errors.birthDate}
                helperText={errors.birthDate?.message}
              />
            )}
          />
        </Stack>

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type={showPassword ? "text" : "password"}
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
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
          )}
        />
        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={showPassword ? "text" : "password"}
              label="Confirm Password"
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm?.message}
              onChange={(e) => handlePasswordConfirmChange(e.target.value)}
            />
          )}
        />

        {/* <Controller
          name="terms"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label={
                <Typography component="span">
                  I agree to{" "}
                  <Link underline="always" sx={{ color: "red" }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link underline="always" sx={{ color: "red" }}>
                    Privacy Policy
                  </Link>
                  .
                </Typography>
              }
            />
          )}
        /> */}
      </Stack>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
      >
        Create Account
      </LoadingButton>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          {/* <Typography variant="body2">Already have an account?</Typography>
          <Link component={RouterLink} to="/auth/login" variant="subtitle2">
            Sign In
          </Link> */}

          <div className="text-gray-500 text-center fw-semibold fs-6">
          Already have an account?{" "}
            <Link to="/auth/login" className="link-primary">
              Sign in
            </Link>
          </div>
        </Stack>
      </Box>
    </form>
  );
}
