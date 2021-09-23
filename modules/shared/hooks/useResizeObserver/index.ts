import { useEffect, useRef, useState } from "react";

interface Size {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const useResizeObserver = (target: HTMLElement) => {
  const [contentRect, setContentRect] = useState<Size>({
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const resizeObserver = useRef(null);

  useEffect(() => {
    if ("ResizeObserver" in window) {
      observe(ResizeObserver);
    } else {
      import("resize-observer-polyfill").then(observe);
    }

    function observe(ResizeObserver) {
      resizeObserver.current = new ResizeObserver((entries) => {
        const {
          width,
          height,
          top,
          right,
          bottom,
          left,
        } = entries[0].contentRect;
        setContentRect({ width, height, top, right, bottom, left });
      });
      if (target) {
        resizeObserver.current.observe(target);
      }
    }

    return disconnect;
  }, [target]);

  function disconnect() {
    if (resizeObserver.current) {
      resizeObserver.current.disconnect();
    }
  }

  return contentRect;
};

export default useResizeObserver;
