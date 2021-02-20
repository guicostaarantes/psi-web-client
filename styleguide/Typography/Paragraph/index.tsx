import { ReactNode } from "react";

interface ParagraphProps {
  center?: boolean;
  children: ReactNode;
}

const Paragraph = ({ center, children }: ParagraphProps) => {
  return (
    <>
      <p>{children}</p>
      <style jsx>{`
        p {
          font-weight: 400;
          ${center ? "text-align: center;" : ""}
        }
      `}</style>
    </>
  );
};

export default Paragraph;
