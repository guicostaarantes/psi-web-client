import { InputHTMLAttributes, LegacyRef } from "react";
import useTheme from "@src/modules/styleguide/hooks/useTheme";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  disabled?: boolean;
  label: string;
  name: string;
  reference?: LegacyRef<HTMLInputElement>;
}

const Checkbox = ({
  checked,
  disabled,
  label,
  name,
  reference,
  ...rest
}: CheckboxProps) => {
  const { theme } = useTheme();

  return (
    <>
      <input
        aria-label={label}
        checked={checked}
        disabled={disabled}
        id={name}
        name={name}
        ref={reference}
        type="checkbox"
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
      <style jsx>{`
        input {
          -webkit-appearance: none;
          -moz-appearance: none;
          background: ${theme.primaryColorTextForeground};
          border: 0.05rem solid ${theme.defaultColor}77;
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
          border: 0.15rem solid ${theme.primaryColorTextForeground};
          border-top: 0;
          border-left: 0;
          content: "";
          display: block;
          left: 0.38rem;
          height: 0.65rem;
          position: absolute;
          top: 0.1rem;
          transform: rotate(43deg);
          transition: transform 0.3s ease, opacity 0.2s;
          width: 0.3rem;
        }

        input:checked {
          background: ${theme.primaryColor};
          border: 0.05rem solid ${theme.primaryColor};
        }

        input:disabled:checked {
          background: ${theme.defaultColor}99;
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
          color: ${theme.backgroundColorTextForeground};
          font-size: 1rem;
          line-height: 1.3rem;
          display: inline-block;
          vertical-align: top;
          cursor: pointer;
          margin-left: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default Checkbox;
