import { InputHTMLAttributes } from "react";
import useTheme from "@psi/styleguide/hooks/useTheme";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  disabled?: boolean;
  label: string;
  name: string;
}

const Checkbox = ({
  checked,
  disabled,
  label,
  name,
  ...rest
}: CheckboxProps) => {
  const { theme } = useTheme();

  return (
    <>
      <input
        aria-label={label}
        checked={checked}
        className="switch"
        disabled={disabled}
        id={name}
        name={name}
        type="checkbox"
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
      <style jsx>{`
        input {
          -webkit-appearance: none;
          -moz-appearance: none;
          background: ${theme.primaryColorTextForeground};
          border: 0.05rem solid ${theme.primaryColorTextForeground}77;
          border-radius: 0.65rem;
          cursor: pointer;
          display: inline-block;
          height: 1.3rem;
          margin: 0;
          outline: none;
          position: relative;
          vertical-align: top;
          transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
          width: 2.3rem;
        }

        input:after {
          background: ${theme.primaryColor};
          border-radius: 50%;
          content: "";
          display: block;
          height: 0.9rem;
          left: 0.15rem;
          position: absolute;
          top: 0.15rem;
          transition: background 0.3s, transform 0.3s;
          width: 0.9rem;
        }

        input:checked {
          background: ${theme.primaryColor};
        }

        input:checked:after {
          background: ${theme.primaryColorTextForeground};
          transform: translateX(1rem);
        }

        input:disabled {
          background: ${theme.disabledColor};
          border: 0.05rem solid ${theme.defaultColor}99;
          cursor: not-allowed;
          opacity: 0.9;
        }

        input:disabled:after {
          background: ${theme.defaultColor}99;
        }

        input:disabled:checked {
          background: ${theme.defaultColor}99;
        }

        input:disabled:checked:after {
          background: ${theme.disabledColor};
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
          font-size: 1rem;
          line-height: 1.3rem;
          display: inline-block;
          vertical-align: top;
          cursor: pointer;
          margin-left: 0.25rem;
        }
      `}</style>
    </>
  );
};

export default Checkbox;
