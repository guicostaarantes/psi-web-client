import { BaseHTMLAttributes } from "react";

interface CoverProps extends BaseHTMLAttributes<HTMLDivElement> {
  label: string;
  src: string;
}

const Cover = ({ label, src, ...rest }: CoverProps) => {
  return (
    <>
      <div aria-label={label} {...rest}></div>
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
