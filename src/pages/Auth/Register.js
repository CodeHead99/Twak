import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import RegisterForm from "../../Sections/Auth/RegisterForm";
import AuthSocial from "../../Sections/Auth/AuthSocial";

const Register = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Get Started with Tawk</Typography>
        <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
          <Typography variant="body2">Already have an account?</Typography>
          <Link component={RouterLink} to={"/auth/login"} variant="subtitle2">
            Sign In
          </Link>
        </Stack>
        <RegisterForm />
        <Typography
          component={"div"}
          sx={{
            color: "text.secondary",
            mt: 3,
            typography: "caption",
            textAlign: "center",
          }}
        >
          {"By signing up, I agree to "}
          <Link underline="always" color={"text.primary"}>
            Terms of service
          </Link>
          {" and "}
          <Link underline="always" color={"text.primary"}>
            Privacy Police
          </Link>
        </Typography>
        <AuthSocial />
      </Stack>
    </>
  );
};

export default Register;
