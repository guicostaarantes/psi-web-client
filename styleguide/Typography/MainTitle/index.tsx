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
        h1 {
          font-weight: 400;
          ${center ? "text-align: center;" : ""}
        }
      `}</style>
    </>
  );
};

export default MainTitle;
