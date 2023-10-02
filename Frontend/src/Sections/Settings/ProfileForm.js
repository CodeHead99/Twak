import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as RouterLink } from "react-router-dom";
import FormProvider from "../../components/hook-form/FormProvider";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { RhfTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";

const ProfileForm = () => {
  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatarUrl: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = { name: "", about: "" };
  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      //submit data to backend
      console.log(data);
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  const values = watch();
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue("avatarUrl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <RhfTextField
            name="name"
            label="Name"
            helperText={"This name is visible to your contacts"}
          />
          <RhfTextField
            name="about"
            label="About"
            multiline
            rows={4}
            maxRows={5}
          />
        </Stack>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button color="primary" size="large" type="submit" variant="outlined">
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
