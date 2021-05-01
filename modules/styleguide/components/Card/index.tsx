import { BaseHTMLAttributes } from "react";
import useTheme from "@psi/styleguide/hooks/useTheme";

interface CardProps extends BaseHTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

const Card = ({ children, ...rest }: CardProps) => {
  const { theme } = useTheme();

  const cardBackgroundColor = theme.focusBackgroundColor;

  return (
    <>
      <div {...rest}>{children}</div>
      <style jsx>{`
        div {
          background-color: ${theme.focusBackgroundColor};
          border-radius: 0.5rem;
          margin: 1rem;
          padding: 1rem;
          position: relative;
          z-index: 1;
        }
      `}</style>
    </>
  );
};

export default Card;
