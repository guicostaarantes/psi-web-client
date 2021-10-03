import fetch from "cross-fetch";
import { BaseHTMLAttributes, RefObject, useEffect, useRef } from "react";
interface ImageProps extends BaseHTMLAttributes<HTMLDivElement> {
  authSrc?: string;
  circle?: boolean;
  label: string;
  reference?: RefObject<HTMLImageElement>;
  src: string;
}

const Image = ({
  authSrc = "",
  circle = false,
  label,
  reference,
  src,
  ...rest
}: ImageProps) => {
  const defaultImageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (authSrc) {
      fetch(authSrc, {
        headers: { authorization: localStorage.getItem("token") },
      })
        .then((res) => res.blob())
        .then((blob) => {
          reference?.current
            ? (reference.current.src = URL.createObjectURL(blob))
            : defaultImageRef.current
            ? (defaultImageRef.current.src = URL.createObjectURL(blob))
            : null;
        });
    }
  }, [authSrc]);

  return (
    <>
      <img
        ref={reference || defaultImageRef}
        src={src}
        alt={label}
        title={label}
        {...rest}
      />
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
