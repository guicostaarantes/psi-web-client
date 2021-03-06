import { ChangeEvent, InputHTMLAttributes, LegacyRef, useEffect } from "react";
import InputMask from "react-input-mask";
import { useState } from "@hookstate/core";
import { DATE_FORMATS } from "@psi/styleguide/constants/locale";
import useTheme from "@psi/styleguide/hooks/useTheme";

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
  const { theme } = useTheme();

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
    <>
      <div>
        <InputMask
          mask={format.replace(/[YMD]/g, "9")}
          value={dateInput.value}
          onChange={changeDateInput}
        >
          {() => (
            <input
              aria-label={label}
              id={name}
              name={name}
              placeholder={label}
              ref={reference}
              type="text"
              {...rest}
            />
          )}
        </InputMask>
        <label htmlFor={name}>{label}</label>
      </div>
      <style jsx>{`
        div {
          margin: 0.4rem 0;
          padding: 1rem 0 0;
          position: relative;
          width: 100%;
        }

        input {
          background: transparent;
          border: 0;
          border-bottom: 2px solid ${theme.defaultColor};
          color: ${theme.backgroundColorTextForeground};
          font-family: inherit;
          font-size: 1rem;
          outline: 0;
          padding: 0.4rem 0;
          transition: border-color 0.2s;
          width: 100%;
        }

        input::placeholder {
          color: transparent;
        }

        input:placeholder-shown ~ label {
          color: ${theme.defaultColor};
          cursor: text;
          font-size: 1rem;
          top: 1.3rem;
        }

        input:focus {
          border-color: ${theme.primaryColor};
        }

        input:focus ~ label {
          color: ${theme.primaryColor};
          cursor: text;
          font-size: 0.75rem;
          top: 0;
        }

        label {
          color: ${theme.defaultColor};
          display: block;
          font-size: 0.75rem;
          position: absolute;
          top: 0;
          transition: 0.25s;
          user-select: none;
        }
      `}</style>
    </>
  );
};

export default DateInput;
