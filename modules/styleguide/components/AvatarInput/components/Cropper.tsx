import { useState } from "@hookstate/core";
import {
  forwardRef,
  ForwardRefRenderFunction,
  RefObject,
  useEffect,
  useImperativeHandle,
} from "react";
import { FiMaximize2, FiMove } from "react-icons/fi";

import useResizeObserver from "@psi/shared/hooks/useResizeObserver";
import valueBetween from "@psi/styleguide/utils/valueBetween";

export interface CropperRef {
  getDimensions: () => {
    centerX: number;
    centerY: number;
    diameter: number;
  };
}

interface CropperProps {
  imageRef: RefObject<HTMLImageElement>;
}

const Cropper: ForwardRefRenderFunction<CropperRef, CropperProps> = (
  { imageRef },
  ref,
) => {
  useImperativeHandle(ref, () => ({
    getDimensions: () => croppedDimensions.value,
  }));

  const imageSize = useResizeObserver(imageRef.current);

  const croppedDimensions = useState({ centerX: 0, centerY: 0, diameter: 0 });
  const ratio = useState(0);

  const handleImageLoad = () => {
    const height = imageRef.current?.naturalHeight || 0;
    const width = imageRef.current?.naturalWidth || 0;
    croppedDimensions.set({
      centerX: Math.floor(width / 2),
      centerY: Math.floor(height / 2),
      diameter: Math.floor(0.9 * Math.min(height, width)),
    });
  };

  useEffect(() => {
    ratio.set(imageSize.height / imageRef.current?.naturalHeight);
  }, [imageSize]);

  const handleDragStart = (startEvent) => {
    const initialClientX =
      startEvent.clientX ||
      startEvent.nativeEvent.changedTouches?.[0]?.clientX ||
      0;
    const initialClientY =
      startEvent.clientY ||
      startEvent.nativeEvent.changedTouches?.[0]?.clientY ||
      0;

    const {
      centerX: initialCenterX,
      centerY: initialCenterY,
    } = croppedDimensions.value;

    const height = imageRef.current?.naturalHeight || 0;
    const width = imageRef.current?.naturalWidth || 0;

    const diameter = croppedDimensions.value.diameter;
    const radius = diameter / 2;

    const moveListener = (moveEvent) => {
      const clientX =
        moveEvent.clientX || moveEvent.changedTouches?.[0]?.clientX || 0;
      const clientY =
        moveEvent.clientY || moveEvent.changedTouches?.[0]?.clientY || 0;

      croppedDimensions.set({
        centerX: valueBetween({
          value: initialCenterX + (clientX - initialClientX) / ratio.value,
          min: radius,
          max: width - radius,
        }),
        centerY: valueBetween({
          value: initialCenterY + (clientY - initialClientY) / ratio.value,
          min: radius,
          max: height - radius,
        }),
        diameter,
      });
    };

    document.addEventListener("mousemove", moveListener);
    document.addEventListener("touchmove", moveListener);

    document.addEventListener("mouseup", function mouseUp() {
      document.removeEventListener("mousemove", moveListener);
      document.removeEventListener("touchmove", moveListener);
      document.removeEventListener("mouseup", mouseUp);
    });

    document.addEventListener("touchend", function touchEnd() {
      document.removeEventListener("mousemove", moveListener);
      document.removeEventListener("touchmove", moveListener);
      document.removeEventListener("touchend", touchEnd);
    });
  };

  const handleResizeStart = () => {
    const {
      centerX: initialCenterX,
      centerY: initialCenterY,
    } = croppedDimensions.value;

    const { top, left } = imageRef.current.getBoundingClientRect();

    const height = imageRef.current?.naturalHeight || 0;
    const width = imageRef.current?.naturalWidth || 0;

    const moveListener = (moveEvent) => {
      const clientX =
        moveEvent.clientX || moveEvent.changedTouches?.[0]?.clientX || 0;
      const clientY =
        moveEvent.clientY || moveEvent.changedTouches?.[0]?.clientY || 0;

      croppedDimensions.set({
        centerX: initialCenterX,
        centerY: initialCenterY,
        diameter: valueBetween({
          value: Math.floor(
            2 *
              Math.pow(
                Math.pow((clientX - left) / ratio.value - initialCenterX, 2) +
                  Math.pow((clientY - top) / ratio.value - initialCenterY, 2),
                0.5,
              ),
          ),
          min: 40,
          max:
            2 *
            Math.min(
              initialCenterX,
              initialCenterY,
              width - initialCenterX,
              height - initialCenterY,
            ),
        }),
      });
    };

    document.addEventListener("mousemove", moveListener);
    document.addEventListener("touchmove", moveListener);

    document.addEventListener("mouseup", function mouseUp() {
      document.removeEventListener("mousemove", moveListener);
      document.removeEventListener("touchmove", moveListener);
      document.removeEventListener("mouseup", mouseUp);
    });

    document.addEventListener("touchend", function touchEnd() {
      document.removeEventListener("mousemove", moveListener);
      document.removeEventListener("touchmove", moveListener);
      document.removeEventListener("touchend", touchEnd);
    });
  };

  return (
    <>
      <div className="background"></div>
      <div className="preview">
        <img
          className="foreground"
          draggable={false}
          onLoad={handleImageLoad}
          src={imageRef.current?.src}
        />
      </div>
      <div
        className="dragger"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <FiMove size={28} />
      </div>
      <div
        className="resizer"
        onMouseDown={handleResizeStart}
        onTouchStart={handleResizeStart}
      >
        <FiMaximize2 size={28} />
      </div>
      <style jsx>{`
        .background {
          background-color: #0009;
          height: ${imageSize.height}px;
          left: 0;
          position: absolute;
          top: 0;
          user-select: none;
          width: ${imageSize.width}px;
        }
        .dragger {
          background-color: blue;
          border-radius: 50%;
          color: white;
          display: flex;
          left: ${-18 +
          (croppedDimensions.value.centerX -
            (croppedDimensions.value.diameter / 2) * 0.707) *
            ratio.value}px;
          padding: 4px;
          position: absolute;
          top: ${-18 +
          (croppedDimensions.value.centerY +
            (croppedDimensions.value.diameter / 2) * 0.707) *
            ratio.value}px;
          touch-action: none;
          user-select: none;
        }
        .foreground {
          height: ${imageSize.height}px;
          left: -${(croppedDimensions.value.centerX - croppedDimensions.value.diameter / 2) * ratio.value}px;
          position: absolute;
          top: -${(croppedDimensions.value.centerY - croppedDimensions.value.diameter / 2) * ratio.value}px;
          user-select: none;
          width: ${imageSize.width}px;
        }
        .preview {
          border: dashed 2px blue;
          border-radius: 50%;
          height: ${croppedDimensions.value.diameter * ratio.value}px;
          left: ${-2 +
          (croppedDimensions.value.centerX -
            croppedDimensions.value.diameter / 2) *
            ratio.value}px;
          overflow: hidden;
          position: absolute;
          top: ${-2 +
          (croppedDimensions.value.centerY -
            croppedDimensions.value.diameter / 2) *
            ratio.value}px;
          width: ${croppedDimensions.value.diameter * ratio.value}px;
        }
        .resizer {
          background-color: blue;
          border-radius: 50%;
          color: white;
          display: flex;
          left: ${-18 +
          (croppedDimensions.value.centerX +
            (croppedDimensions.value.diameter / 2) * 0.707) *
            ratio.value}px;
          padding: 4px;
          position: absolute;
          top: ${-18 +
          (croppedDimensions.value.centerY -
            (croppedDimensions.value.diameter / 2) * 0.707) *
            ratio.value}px;
          touch-action: none;
          user-select: none;
        }
      `}</style>
    </>
  );
};

export default forwardRef<CropperRef, CropperProps>(Cropper);
