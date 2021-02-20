import { InputHTMLAttributes } from "react";
import themeState from "styleguide/Theme";
import { useState } from "@hookstate/core";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  name: string;
  label: string;
  type?: "text" | "password";
}

const Input = ({ label, name, type, ...rest }: InputProps) => {
  const theme = useState(themeState);

  return (
    <>
      <div>
        <input
          id={name}
          name={name}
          placeholder={label}
          aria-label={label}
          type={type || "text"}
          {...rest}
        />
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
          border-bottom: 2px solid ${theme.get().defaultColor};
          color: ${theme.get().backgroundColorTextForeground};
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
          color: ${theme.get().defaultColor};
          cursor: text;
          font-size: 1rem;
          top: 1.3rem;
        }

        input:focus {
          border-color: ${theme.get().primaryColor};
        }

        input:focus ~ label {
          color: ${theme.get().primaryColor};
          cursor: text;
          font-size: 0.75rem;
          top: 0;
        }

        label {
          color: ${theme.get().defaultColor};
          display: block;
          font-size: 0.75rem;
          position: absolute;
          top: 0;
          transition: 0.25s;
        }
      `}</style>
    </>
  );
};

export default Input;
