import { ButtonHTMLAttributes } from "react";
import Spinner from "styleguide/Spinner/index";
import themeState from "styleguide/Theme";
import { useState } from "@hookstate/core";

interface ButtonSpinnerProps {
  loading: boolean;
  size: string;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  color?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "large";
}

const ButtonSpinner = ({ loading, size }: ButtonSpinnerProps) => {
  return (
    <>
      <div>
        <Spinner size={size} />
      </div>
      <style jsx>{`
        div {
          display: ${loading ? "block" : "none"};
          left: calc(50% - calc(1rem / 2));
          position: absolute;
        }
      `}</style>
    </>
  );
};

const Button = ({
  block,
  children,
  color,
  disabled,
  loading,
  size,
  ...rest
}: ButtonProps) => {
  const theme = useState(themeState);

  const buttonBackgroundColor =
    color === "primary"
      ? theme.get().primaryColor
      : color === "secondary"
      ? theme.get().secondaryColor
      : color === "danger"
      ? theme.get().dangerColor
      : theme.get().defaultColor;

  const buttonBackgroundColorHover =
    color === "primary"
      ? theme.get().primaryColorHover
      : color === "secondary"
      ? theme.get().secondaryColorHover
      : color === "danger"
      ? theme.get().dangerColorHover
      : theme.get().defaultColorHover;

  const buttonColor =
    color === "primary"
      ? theme.get().primaryColorTextForeground
      : color === "secondary"
      ? theme.get().secondaryColorTextForeground
      : color === "danger"
      ? theme.get().dangerColorTextForeground
      : theme.get().defaultColorTextForeground;

  const padding =
    size === "small"
      ? "0.25rem 0.5rem"
      : size === "large"
      ? "0.75rem 1.5rem"
      : "0.5rem 1rem";

  const textSize =
    size === "small" ? "0.8rem" : size === "large" ? "1.25rem" : "1rem";

  return (
    <>
      <button disabled={disabled} role="button" {...rest}>
        <ButtonSpinner loading={loading} size={textSize} />
        <div>{children}</div>
      </button>
      <style jsx>{`
        button {
          background-color: ${buttonBackgroundColor};
          color: ${buttonColor};
          border: none;
          cursor: pointer;
          display: block;
          font-size: ${textSize};
          line-height: 1;
          margin: 0.4rem 0;
          padding: ${padding};
          position: relative;
          text-align: center;
          text-decoration: none;
          transition: background-color 200ms ease-in-out, transform 100ms ease;
          ${block ? "width: 100%;" : ""}
          -moz-appearance: none;
          -webkit-appearance: none;
        }

        button:disabled {
          cursor: initial;
        }

        button:hover:not(:disabled),
        button:focus:not(:disabled) {
          background-color: ${buttonBackgroundColorHover};
        }

        button:focus:not(:disabled) {
          outline: 1px solid;
          outline-color: ${buttonColor};
          outline-offset: -0.2rem;
        }

        button:active:not(:disabled) {
          transform: scale(0.98);
        }

        button div {
          ${loading ? "color: transparent !important;" : ""}
        }
      `}</style>
    </>
  );
};

export default Button;
