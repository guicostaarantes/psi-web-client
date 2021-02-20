import { ReactNode } from "react";

interface MainTitleProps {
  center?: boolean;
  children: ReactNode;
}

const MainTitle = ({ center, children }: MainTitleProps) => {
  return (
    <>
      <h1>{children}</h1>
      <style jsx>{`
        ${center ? "text-align: center;" : ""}
      `}</style>
    </>
  );
};

export default MainTitle;
