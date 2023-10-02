import propTypes from "prop-types";
//form
import { useFormContext, Controller } from "react-hook-form";
//@mui
import { TextField } from "@mui/material";

RhfTextField.propTypes = {
  name: propTypes.string,
  label: propTypes.string,
  helperText: propTypes.node,
};
export default function RhfTextField({ name, helperText, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            fullWidth
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            error={!!error}
            helperText={error ? error.message : helperText}
            {...other}
          />
        );
      }}
    />
  );
}
