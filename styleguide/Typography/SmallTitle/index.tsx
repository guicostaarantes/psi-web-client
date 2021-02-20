import { ReactNode } from "react";

interface SmallTitleProps {
  center?: boolean;
  children: ReactNode;
}

const SmallTitle = ({ center, children }: SmallTitleProps) => {
  return (
    <>
      <h4>{children}</h4>
      <style jsx>{`
        h4 {
          font-weight: 400;
          ${center ? "text-align: center;" : ""}
        }
      `}</style>
    </>
  );
};

export default SmallTitle;
