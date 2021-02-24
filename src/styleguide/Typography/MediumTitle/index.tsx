import { ReactNode } from "react";
import useTheme from "@src/hooks/useTheme";

interface MediumTitleProps {
  center?: boolean;
  children: ReactNode;
}

const MediumTitle = ({ center, children }: MediumTitleProps) => {
  const { theme } = useTheme();
  return (
    <>
      <h3>{children}</h3>
      <style jsx>{`
        h3 {
          color: ${theme.backgroundColorTextForeground};
          font-weight: 400;
          ${center ? "text-align: center;" : ""}
        }
      `}</style>
    </>
  );
};

export default MediumTitle;
