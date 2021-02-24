import { ReactNode } from "react";
import useTheme from "@src/hooks/useTheme";

interface SmallTitleProps {
  center?: boolean;
  children: ReactNode;
}

const SmallTitle = ({ center, children }: SmallTitleProps) => {
  const { theme } = useTheme();
  return (
    <>
      <h4>{children}</h4>
      <style jsx>{`
        h4 {
          color: ${theme.backgroundColorTextForeground};
          font-weight: 400;
          ${center ? "text-align: center;" : ""}
        }
      `}</style>
    </>
  );
};

export default SmallTitle;
