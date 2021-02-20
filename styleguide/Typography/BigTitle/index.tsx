import { ReactNode } from "react";

interface BigTitleProps {
  center?: boolean;
  children: ReactNode;
}

const BigTitle = ({ center, children }: BigTitleProps) => {
  return (
    <>
      <h2>{children}</h2>
      <style jsx>{`
        ${center ? "text-align: center;" : ""}
      `}</style>
    </>
  );
};

export default BigTitle;
