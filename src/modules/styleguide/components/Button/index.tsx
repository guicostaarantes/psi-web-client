import { ButtonHTMLAttributes } from "react";
import Spinner from "@psi/styleguide/components/Spinner/index";
import useTheme from "@psi/styleguide/hooks/useTheme";

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
  const { theme } = useTheme();

  const buttonBackgroundColor =
    color === "primary"
      ? theme.primaryColor
      : color === "secondary"
      ? theme.secondaryColor
      : color === "danger"
      ? theme.dangerColor
      : theme.defaultColor;

  const buttonBackgroundColorHover =
    color === "primary"
      ? theme.primaryColorHover
      : color === "secondary"
      ? theme.secondaryColorHover
      : color === "danger"
      ? theme.dangerColorHover
      : theme.defaultColorHover;

  const buttonColor =
    color === "primary"
      ? theme.primaryColorTextForeground
      : color === "secondary"
      ? theme.secondaryColorTextForeground
      : color === "danger"
      ? theme.dangerColorTextForeground
      : theme.defaultColorTextForeground;

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
      <button disabled={loading || disabled} role="button" {...rest}>
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
