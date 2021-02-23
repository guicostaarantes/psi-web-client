import { ReactNode } from "react";
import useTheme from "@src/styleguide/Theme";

interface ParagraphProps {
  center?: boolean;
  children: ReactNode;
}

const Paragraph = ({ center, children }: ParagraphProps) => {
  const { theme } = useTheme();
  return (
    <>
      <p>{children}</p>
      <style jsx>{`
        p {
          color: ${theme.backgroundColorTextForeground};
          font-weight: 400;
          ${center ? "text-align: center;" : ""}
        }
      `}</style>
    </>
  );
};

export default Paragraph;
