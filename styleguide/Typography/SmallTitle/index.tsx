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
        ${center ? "text-align: center;" : ""}
      `}</style>
    </>
  );
};

export default SmallTitle;
