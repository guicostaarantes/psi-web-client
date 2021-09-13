import fetch from "cross-fetch";
import { BaseHTMLAttributes, useEffect, useRef } from "react";
interface ImageProps extends BaseHTMLAttributes<HTMLDivElement> {
  auth?: boolean;
  circle?: boolean;
  label: string;
  src: string;
}

const Image = ({
  auth = false,
  circle = false,
  label,
  src,
  ...rest
}: ImageProps) => {
  const imgRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (auth && src) {
      const token = localStorage.getItem("token");
      fetch(`${process.env.NEXT_PUBLIC_PSI_STATIC_URI}/${src}`, {
        headers: { authorization: token },
      })
        .then((res) => res.blob())
        .then((blob) =>
          imgRef.current
            ? (imgRef.current.src = URL.createObjectURL(blob))
            : null,
        );
    }
  }, [auth, src]);

  return (
    <>
      <img
        ref={imgRef}
        src={auth ? null : src}
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
