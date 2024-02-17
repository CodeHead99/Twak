import { propTypes } from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

RhfTextField.propTypes = {
  name: propTypes.string,
  helperText: propTypes.node,
};
export default function RhfTextField({ name, helperText, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...other}
          fullWidth
          error={!!error}
          helperText={error ? error.message : helperText}
        />
      )}
    />
  );
}
