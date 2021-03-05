import { BaseHTMLAttributes } from "react";

interface ViewportHighProps extends BaseHTMLAttributes<HTMLDivElement> {
  center?: boolean;
}

const ViewportHigh = ({ center, children }: ViewportHighProps) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          height: 100vh;
          display: flex;
          ${center
            ? "flex-direction: column; align-items: center; justify-content: center;"
            : ""}
        }
      `}</style>
    </>
  );
};

export default ViewportHigh;
