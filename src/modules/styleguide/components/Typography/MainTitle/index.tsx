import { ReactNode } from "react";
import useTheme from "@src/modules/styleguide/hooks/useTheme";

interface MainTitleProps {
  center?: boolean;
  noMarginBottom?: boolean;
  noMarginTop?: boolean;
  children: ReactNode;
}

const MainTitle = ({
  center,
  children,
  noMarginBottom,
  noMarginTop,
}: MainTitleProps) => {
  const { theme } = useTheme();
  return (
    <>
      <h1>{children}</h1>
      <style jsx>{`
        h1 {
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

export default MainTitle;
