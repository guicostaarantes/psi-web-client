import { BaseHTMLAttributes } from "react";

interface ImageProps extends BaseHTMLAttributes<HTMLDivElement> {
  circle?: boolean;
  label: string;
  src: string;
}

const Image = ({ circle = false, label, src, ...rest }: ImageProps) => {
  return (
    <>
      <img src={src} alt={label} title={label} {...rest} />
      <style jsx>{`
        img {
          ${circle ? "border-radius: 50%;" : ""}
          height: 100%;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Image;
