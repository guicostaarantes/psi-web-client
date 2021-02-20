import { BaseHTMLAttributes } from "react";

interface CoverProps extends BaseHTMLAttributes<HTMLDivElement> {
  src: string;
}

const Cover = ({ src, ...rest }: CoverProps) => {
  return (
    <>
      <div {...rest}></div>
      <style jsx>{`
        div {
          background-image: url(${src});
          background-size: cover;
          height: 100%;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Cover;
