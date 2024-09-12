import { useRef } from "react";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Stack, TextField } from "@mui/material";

export default function RHFCodes({ keyName = "", inputs = [], ...other }) {
  const codesRef = useRef(null);

  const { control } = useFormContext();

  const handleKeyDown = (event, handleChange) => {
    const { value, name } = event.target;
    const fieldIndex = name.replace(keyName, "");
    const fieldIntIndex = Number(fieldIndex);

    const prevField = document.querySelector(
      `input[name=${keyName}${fieldIntIndex - 1}]`
    );

    if (event.key === "Backspace" && value === "" && prevField !== null) {
      prevField.value = "";
      prevField.focus();
      handleChange({ target: prevField });
      event.preventDefault();
    }
  };

  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = name.replace(keyName, "");

    const fieldIntIndex = Number(fieldIndex);

    const nextField = document.querySelector(
      `input[name=${keyName}${fieldIntIndex + 1}]`
    );

    if (value.length > maxLength) {
      event.target.value = value.slice(0, maxLength);
    }

    if (value.length >= maxLength && fieldIntIndex < inputs.length && nextField !== null) {
      nextField.focus();
    }

    handleChange(event);
  };

  const handlePaste = (event, handleChange) => {
    const paste = event.clipboardData.getData("text");
    const { name } = event.target;
    const fieldIndex = name.replace(keyName, "");
    const fieldIntIndex = Number(fieldIndex);

    const pastedValues = paste.split("");
    pastedValues.forEach((char, index) => {
      const field = document.querySelector(
        `input[name=${keyName}${fieldIntIndex + index}]`
      );
      if (field) {
        field.value = char;
        handleChange({ target: field });
      }
    });

    const nextField = document.querySelector(
      `input[name=${keyName}${fieldIntIndex + pastedValues.length}]`
    );

    if (nextField) {
      nextField.focus();
    }

    event.preventDefault();
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center" ref={codesRef}>
      {inputs.map((name, index) => (
        <Controller
          key={name}
          name={`${keyName}${index + 1}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              autoFocus={index === 0}
              placeholder="-"
              onChange={(event) => {
                handleChangeWithNextField(event, field.onChange);
              }}
              onKeyDown={(event) => handleKeyDown(event, field.onChange)}
              onPaste={(event) => handlePaste(event, field.onChange)}
              onFocus={(event) => event.currentTarget.select()}
              InputProps={{
                sx: {
                  width: { xs: 36, sm: 56 },
                  height: { xs: 36, sm: 56 },
                  "& input": { p: 0, textAlign: "center" },
                },
              }}
              inputProps={{
                maxLength: 1,
                type: "number",
              }}
              {...other}
            />
          )}
        />
      ))}
    </Stack>
  );
}
