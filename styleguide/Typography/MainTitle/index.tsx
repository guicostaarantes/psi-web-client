import { ReactNode } from "react";
import useTheme from "styleguide/Theme";

interface MainTitleProps {
  center?: boolean;
  children: ReactNode;
}

const MainTitle = ({ center, children }: MainTitleProps) => {
  const { theme } = useTheme();
  return (
    <>
      <h1>{children}</h1>
      <style jsx>{`
        h1 {
          color: ${theme.backgroundColorTextForeground};
          font-weight: 400;
          ${center ? "text-align: center;" : ""}
        }
      `}</style>
    </>
  );
};

export default MainTitle;
