import { BaseHTMLAttributes } from "react";
import useTheme from "@src/hooks/useTheme";

interface CardProps extends BaseHTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

const Card = ({ children, ...rest }: CardProps) => {
  const { theme } = useTheme();

  const cardBackgroundColor = theme.focusBackgroundColor;

  const cardBorderColor = theme.defaultColor;

  return (
    <>
      <div {...rest}>{children}</div>
      <style jsx>{`
        div {
          background-color: ${cardBackgroundColor};
          border: 1px solid ${cardBorderColor};
          margin: 1rem;
          padding: 1rem;
        }
      `}</style>
    </>
  );
};

export default Card;
