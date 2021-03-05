import { ReactNode } from "react";
import useTheme from "@psi/styleguide/hooks/useTheme";

interface BigTitleProps {
  center?: boolean;
  noMarginBottom?: boolean;
  noMarginTop?: boolean;
  children: ReactNode;
}

const BigTitle = ({
  center,
  children,
  noMarginBottom,
  noMarginTop,
}: BigTitleProps) => {
  const { theme } = useTheme();

  return (
    <>
      <h2>{children}</h2>
      <style jsx>{`
        h2 {
          color: ${theme.backgroundColorTextForeground};
          font-weight: 400;
          ${center ? "text-align: center;" : ""}
          ${noMarginBottom ? "margin-bottom: 0;" : ""}
          ${noMarginTop ? "margin-top: 0;" : ""}
        }
      `}</style>
    </>
  );
};

export default BigTitle;
