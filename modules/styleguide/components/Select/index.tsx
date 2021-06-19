import { LegacyRef, SelectHTMLAttributes } from "react";

import useTheme from "@psi/styleguide/hooks/useTheme";

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "placeholder"> {
  name: string;
  label: string;
  options: {
    value: string | number;
    label: string;
  }[];
  reference?: LegacyRef<HTMLSelectElement>;
}

const Select = ({ label, name, options, reference, ...rest }: SelectProps) => {
  const { theme } = useTheme();

  return (
    <>
      <div>
        <select
          aria-label={label}
          id={name}
          name={name}
          placeholder={label}
          ref={reference}
          {...rest}
        >
          {options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
        <label htmlFor={name}>{label}</label>
      </div>
      <style jsx>{`
        div {
          margin: 0.4rem 0;
          padding: 1rem 0 0;
          position: relative;
          width: 100%;
        }

        select {
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

        select::placeholder {
          color: transparent;
        }

        select:placeholder-shown ~ label {
          color: ${theme.defaultColor};
          cursor: text;
          font-size: 1rem;
          padding-left: 0.4rem;
          top: 1.3rem;
        }

        select:focus {
          border-color: ${theme.primaryColor};
        }

        select:focus ~ label {
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

export default Select;
