import { ReactNode } from "react";

interface MediumTitleProps {
  center?: boolean;
  children: ReactNode;
}

const MediumTitle = ({ center, children }: MediumTitleProps) => {
  return (
    <>
      <h3>{children}</h3>
      <style jsx>{`
        h3 {
          font-weight: 400;
          ${center ? "text-align: center;" : ""}
        }
      `}</style>
    </>
  );
};

export default MediumTitle;
