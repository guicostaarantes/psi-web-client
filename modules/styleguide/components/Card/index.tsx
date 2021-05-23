import { BaseHTMLAttributes } from "react";

import useTheme from "@psi/styleguide/hooks/useTheme";

interface CardProps extends BaseHTMLAttributes<HTMLDivElement> {
  floating?: boolean;
}

const Card = ({ children, floating, ...rest }: CardProps) => {
  const { theme } = useTheme();

  return (
    <>
      <div {...rest}>{children}</div>
      <style jsx>{`
        div {
          background-color: ${theme.focusBackgroundColor};
          border-radius: 0.5rem;
          ${floating ? "box-shadow: 0 2px 8px -4px;" : ""}
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
