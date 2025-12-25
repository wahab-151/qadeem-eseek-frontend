import { useFormContext, Controller } from "react-hook-form";
import { TextField as MuiTextField } from "@mui/material";

export default function TextField({
  name,
  helperText,
  type,
  ...other
}) {
  const methods = useFormContext();

  if (!methods?.control) {
    console.warn(`RHF TextField "${name}" used outside of <FormProvider>.`);
    return null; // or fallback UI
  }

  const { control } = methods;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTextField
          {...field}
          type={type}
          value={field.value}
          onChange={field.onChange}
          error={Boolean(error)}
          helperText={error?.message || helperText}
          {...other}
        />
      )}
    />
  );
}