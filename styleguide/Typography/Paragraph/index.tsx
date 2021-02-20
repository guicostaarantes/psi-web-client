import { ReactNode } from "react";

interface ParagraphProps {
  children: ReactNode;
}

const Paragraph = ({ children }: ParagraphProps) => {
  return (
    <>
      <p>{children}</p>
    </>
  );
};

export default Paragraph;
