import { BaseHTMLAttributes } from "react";
import useTheme from "@psi/styleguide/hooks/useTheme";

interface CardProps extends BaseHTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

const Card = ({ children, ...rest }: CardProps) => {
  const { theme } = useTheme();

  const cardBackgroundColor = theme.focusBackgroundColor + "99";

  return (
    <>
      <div {...rest}>{children}</div>
      <style jsx>{`
        div {
          border-radius: 0.5rem;
          margin: 1rem;
          padding: 1rem;
          position: relative;
          z-index: 1;
        }
        div:before {
          background-color: ${cardBackgroundColor};
          backdrop-filter: blur(25px);
          border-radius: 0.5rem;
          content: "";
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
          z-index: -1;
        }
      `}</style>
    </>
  );
};

export default Card;
