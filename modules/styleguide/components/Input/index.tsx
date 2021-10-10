import { ChangeEvent, InputHTMLAttributes, LegacyRef } from "react";
import InputMask from "react-input-mask";

import useTheme from "@psi/styleguide/hooks/useTheme";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label: string;
  maskProps?: {
    formatChars?: { [key: string]: string };
    mask: string | Array<string | RegExp>;
    maskChar?: string | null | undefined;
    value?: string;
    onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
  };
  name: string;
  reference?: LegacyRef<HTMLInputElement>;
  type?: string;
}

const Input = ({
  label,
  maskProps,
  name,
  reference,
  type,
  ...rest
}: InputProps) => {
  const { theme } = useTheme();

  return (
    <>
      <div>
        {maskProps ? (
          <InputMask ref={reference} {...maskProps}>
            {() => (
              <input
                aria-label={label}
                id={name}
                name={name}
                placeholder={label}
                type={type || "text"}
                {...rest}
              />
            )}
          </InputMask>
        ) : (
          <input
            aria-label={label}
            id={name}
            name={name}
            placeholder={label}
            ref={reference}
            type={type || "text"}
            {...rest}
          />
        )}
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
          padding: 0.4rem;
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

export default Input;
