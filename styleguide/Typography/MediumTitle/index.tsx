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
        ${center ? "text-align: center;" : ""}
      `}</style>
    </>
  );
};

export default MediumTitle;
