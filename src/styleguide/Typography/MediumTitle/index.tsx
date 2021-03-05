import { ReactNode } from "react";
import useTheme from "@src/hooks/useTheme";

interface MediumTitleProps {
  center?: boolean;
  children: ReactNode;
  noMarginBottom?: boolean;
  noMarginTop?: boolean;
}

const MediumTitle = ({
  center,
  children,
  noMarginBottom,
  noMarginTop,
}: MediumTitleProps) => {
  const { theme } = useTheme();
  return (
    <>
      <h3>{children}</h3>
      <style jsx>{`
        h3 {
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

export default MediumTitle;
