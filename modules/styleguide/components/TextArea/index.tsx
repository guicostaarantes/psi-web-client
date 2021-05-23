import { LegacyRef, TextareaHTMLAttributes } from "react";

import useTheme from "@psi/styleguide/hooks/useTheme";

interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "placeholder"> {
  name: string;
  label: string;
  reference?: LegacyRef<HTMLTextAreaElement>;
  rows?: number;
}

const TextArea = ({
  label,
  name,
  reference,
  rows = 5,
  ...rest
}: TextAreaProps) => {
  const { theme } = useTheme();

  return (
    <>
      <div>
        <textarea
          aria-label={label}
          id={name}
          name={name}
          placeholder={label}
          rows={rows}
          ref={reference}
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

        textarea {
          background: transparent;
          border: 0;
          border-bottom: 2px solid ${theme.defaultColor};
          color: ${theme.backgroundColorTextForeground};
          font-family: inherit;
          font-size: 1rem;
          outline: 0;
          padding: 0.4rem 0;
          resize: none;
          transition: border-color 0.2s;
          width: 100%;
        }

        textarea::placeholder {
          color: transparent;
        }

        textarea:placeholder-shown ~ label {
          color: ${theme.defaultColor};
          cursor: text;
          font-size: 1rem;
          top: 1.3rem;
        }

        textarea:focus {
          border-color: ${theme.primaryColor};
        }

        textarea:focus ~ label {
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

export default TextArea;
