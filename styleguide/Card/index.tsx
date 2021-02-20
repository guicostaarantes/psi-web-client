import { BaseHTMLAttributes } from "react";
import themeState from "styleguide/Theme";
import { useState } from "@hookstate/core";

interface CardProps extends BaseHTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

const Card = ({ children, loading, ...rest }: CardProps) => {
  const theme = useState(themeState);

  const cardBackgroundColor = theme.get().backgroundColor;

  const cardBorderColor = theme.get().defaultColor;

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
