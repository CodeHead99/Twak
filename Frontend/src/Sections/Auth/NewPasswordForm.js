import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormProvider from "../../components/hook-form/FormProvider";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { RhfTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";

const NewPasswordForm = () => {
  const [showPass, setShowPass] = useState(false);
  const NewPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, "Password must be atleast 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Password must be same as new Password"
      ),
  });

  const defaultValues = { newPassword: "", confirmPassword: "" };
  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      //submit data to backend
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RhfTextField
          name="newPassword"
          label="New Password"
          type={showPass ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPass((prev) => !prev);
                  }}
                >
                  {showPass ? <Eye /> : <EyeSlash></EyeSlash>}
                </IconButton>{" "}
              </InputAdornment>
            ),
          }}
        />
        <RhfTextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPass ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPass((prev) => !prev);
                  }}
                >
                  {showPass ? <Eye /> : <EyeSlash></EyeSlash>}
                </IconButton>{" "}
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Submit
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default NewPasswordForm;
