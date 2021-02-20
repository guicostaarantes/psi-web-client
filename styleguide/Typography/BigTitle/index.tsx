import { ReactNode } from "react";
import useTheme from "styleguide/Theme";

interface BigTitleProps {
  center?: boolean;
  children: ReactNode;
}

const BigTitle = ({ center, children }: BigTitleProps) => {
  const { theme } = useTheme();

  return (
    <>
      <h2>{children}</h2>
      <style jsx>{`
        h2 {
          color: ${theme.backgroundColorTextForeground};
          font-weight: 400;
          ${center ? "text-align: center;" : ""}
        }
      `}</style>
    </>
  );
};

export default BigTitle;
