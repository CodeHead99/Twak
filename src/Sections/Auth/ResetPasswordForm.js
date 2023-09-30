import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// components
import FormProvider, { RhfTextField } from "../../components/hook-form";
import { Button } from "@mui/material";
// import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function AuthResetPasswordForm() {
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: "demo@tawk.com" },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      //   Send API Request
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RhfTextField name="email" label="Email address" />

      <Button
        // loading={isLoading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
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
        Send Request
      </Button>
    </FormProvider>
  );
}
