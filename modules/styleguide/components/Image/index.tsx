import fetch from "cross-fetch";
import { BaseHTMLAttributes, useEffect, useRef } from "react";
interface ImageProps extends BaseHTMLAttributes<HTMLDivElement> {
  authSrc?: string;
  circle?: boolean;
  label: string;
  src: string;
}

const Image = ({
  authSrc = "",
  circle = false,
  label,
  src,
  ...rest
}: ImageProps) => {
  const imgRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (authSrc) {
      fetch(authSrc, {
        headers: { authorization: localStorage.getItem("token") },
      })
        .then((res) => res.blob())
        .then((blob) =>
          imgRef.current
            ? (imgRef.current.src = URL.createObjectURL(blob))
            : null,
        );
    }
  }, [authSrc]);

  return (
    <>
      <img ref={imgRef} src={src} alt={label} title={label} {...rest} />
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
