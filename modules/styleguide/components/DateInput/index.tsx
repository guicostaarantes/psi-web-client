import { useState } from "@hookstate/core";
import { ChangeEvent, InputHTMLAttributes, LegacyRef, useEffect } from "react";

import Input from "@psi/styleguide/components/Input";
import { DATE_FORMATS } from "@psi/styleguide/constants/locale";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  format: DATE_FORMATS;
  forwardedValue?: string;
  label: string;
  name: string;
  reference?: LegacyRef<HTMLInputElement>;
}

const DateInput = ({
  format,
  forwardedValue = "",
  label,
  name,
  reference,
  ...rest
}: InputProps) => {
  const dateInput = useState("");

  const changeDateInput = (event: ChangeEvent<HTMLInputElement>) => {
    dateInput.set(event.target.value);
  };

  // This components controls its value in a state internally but allows overwriting from parent
  // Ideal solution would be to access and change the value by reference (see component Input)
  // However, when using react-input-mask, using ref.current.value = "31/12/1999" does not set the input as expected
  useEffect(() => {
    dateInput.set(forwardedValue);
  }, [forwardedValue]);

  return (
    <Input
      maskProps={{
        mask: format.replace(/[yMdHhm]/g, "9"),
        value: dateInput.value,
        onChange: changeDateInput,
      }}
      label={label}
      name={name}
      reference={reference}
      {...rest}
    />
  );
};

export default DateInput;
