import { ReactNode } from "react";

import useTheme from "@psi/styleguide/hooks/useTheme";

interface ParagraphProps {
  center?: boolean;
  children: ReactNode;
  noMarginBottom?: boolean;
  noMarginTop?: boolean;
}

const Paragraph = ({
  center,
  children,
  noMarginBottom,
  noMarginTop,
}: ParagraphProps) => {
  const { theme } = useTheme();
  return (
    <>
      <p>{children}</p>
      <style jsx>{`
        p {
          color: ${theme.backgroundColorTextForeground};
          font-weight: 400;
          white-space: pre-wrap;
          ${center ? "text-align: center;" : ""}
          ${noMarginBottom ? "margin-bottom: 0;" : ""}
          ${noMarginTop ? "margin-top: 0;" : ""}
        }
      `}</style>
    </>
  );
};

export default Paragraph;
