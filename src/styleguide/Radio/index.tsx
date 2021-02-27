import { InputHTMLAttributes, LegacyRef } from "react";
import useTheme from "@src/hooks/useTheme";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  disabled?: boolean;
  label: string;
  name: string;
  reference?: LegacyRef<HTMLInputElement>;
  value: string;
}

const Checkbox = ({
  disabled,
  label,
  name,
  reference,
  value,
  ...rest
}: CheckboxProps) => {
  const { theme } = useTheme();

  return (
    <>
      <input
        aria-label={label}
        disabled={disabled}
        id={`${name}:${value}`}
        name={name}
        ref={reference}
        type="radio"
        value={value}
        {...rest}
      />
      <label htmlFor={`${name}:${value}`}>{label}</label>
      <style jsx>{`
        input {
          -webkit-appearance: none;
          -moz-appearance: none;
          background: ${theme.primaryColorTextForeground};
          border: 0.05rem solid ${theme.defaultColor}77;
          border-radius: 50%;
          cursor: pointer;
          display: inline-block;
          height: 1.3rem;
          margin: 0;
          outline: none;
          position: relative;
          transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
          vertical-align: top;
          width: 1.3rem;
        }

        input:after {
          background: ${theme.primaryColorTextForeground};
          border-radius: 50%;
          content: "";
          display: block;
          height: 1.2rem;
          left: 0;
          opacity: 0;
          position: absolute;
          top: 0;
          transform: scale(0.45);
          width: 1.2rem;
        }

        input:checked:after {
          opacity: 1;
        }

        input:checked {
          background: ${theme.primaryColor};
          border: 0.05rem solid ${theme.primaryColor};
        }

        input:disabled {
          border: 0.05rem solid ${theme.defaultColor}99;
          cursor: not-allowed;
          opacity: 0.9;
        }

        input:disabled + label {
          color: ${theme.defaultColor}99;
          cursor: not-allowed;
        }

        input:hover:not(:disabled),
        input:focus {
          box-shadow: 0 0 0 0.1rem ${theme.primaryColorHover}77;
        }

        label {
          color: ${theme.defaultColor};
          cursor: pointer;
          display: inline-block;
          font-size: 1rem;
          line-height: 1.3rem;
          margin-left: 0.25rem;
          vertical-align: top;
        }
      `}</style>
    </>
  );
};

export default Checkbox;
