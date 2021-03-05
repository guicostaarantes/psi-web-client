import { ReactNode } from "react";
import useTheme from "@src/hooks/useTheme";

interface SmallTitleProps {
  center?: boolean;
  children: ReactNode;
  noMarginBottom?: boolean;
  noMarginTop?: boolean;
}

const SmallTitle = ({
  center,
  children,
  noMarginBottom,
  noMarginTop,
}: SmallTitleProps) => {
  const { theme } = useTheme();
  return (
    <>
      <h4>{children}</h4>
      <style jsx>{`
        h4 {
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

export default SmallTitle;
