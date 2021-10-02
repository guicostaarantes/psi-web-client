import { useState } from "@hookstate/core";
import {
  forwardRef,
  ForwardRefRenderFunction,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import { FiMaximize2 } from "react-icons/fi";

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

  const drag = useState({
    isDragging: false,
    isResizing: false,
    initialClientX: 0,
    initialClientY: 0,
    initialCenterX: 0,
    initialCenterY: 0,
  });

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

  const handleMouseDown = useCallback(
    (event) => {
      const clientX =
        event.clientX || event.nativeEvent.changedTouches?.[0]?.clientX || 0;
      const clientY =
        event.clientY || event.nativeEvent.changedTouches?.[0]?.clientY || 0;

      const { centerX, centerY } = croppedDimensions.value;
      drag.set({
        isDragging: true,
        isResizing: false,
        initialClientX: clientX,
        initialClientY: clientY,
        initialCenterX: centerX,
        initialCenterY: centerY,
      });
    },
    [croppedDimensions.value],
  );

  const handleResizeMouseDown = useCallback(
    (event) => {
      const clientX =
        event.clientX || event.nativeEvent.changedTouches?.[0]?.clientX || 0;
      const clientY =
        event.clientY || event.nativeEvent.changedTouches?.[0]?.clientY || 0;

      const { centerX, centerY } = croppedDimensions.value;
      drag.set({
        isDragging: false,
        isResizing: true,
        initialClientX: clientX,
        initialClientY: clientY,
        initialCenterX: centerX,
        initialCenterY: centerY,
      });
    },
    [croppedDimensions.value],
  );

  const handleMouseMove = useCallback(
    (event) => {
      const clientX =
        event.clientX || event.nativeEvent.changedTouches?.[0]?.clientX || 0;
      const clientY =
        event.clientY || event.nativeEvent.changedTouches?.[0]?.clientY || 0;

      if (drag.value.isDragging) {
        const {
          initialClientX,
          initialClientY,
          initialCenterX,
          initialCenterY,
        } = drag.value;

        const height = imageRef.current?.naturalHeight || 0;
        const width = imageRef.current?.naturalWidth || 0;

        const diameter = croppedDimensions.value.diameter;
        const radius = diameter / 2;

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
      }

      if (drag.value.isResizing) {
        const { initialCenterX, initialCenterY } = drag.value;

        const { top, left } = imageRef.current.getBoundingClientRect();

        const height = imageRef.current?.naturalHeight || 0;
        const width = imageRef.current?.naturalWidth || 0;

        croppedDimensions.set({
          centerX: initialCenterX,
          centerY: initialCenterY,
          diameter: valueBetween({
            value:
              2 *
              Math.pow(
                Math.pow((clientX - left) / ratio.value - initialCenterX, 2) +
                  Math.pow((clientY - top) / ratio.value - initialCenterY, 2),
                0.5,
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
      }
    },
    [drag.value, croppedDimensions.value],
  );

  const handleMouseUpLeave = useCallback(() => {
    drag.set({
      isDragging: false,
      isResizing: false,
      initialClientX: 0,
      initialClientY: 0,
      initialCenterX: 0,
      initialCenterY: 0,
    });
  }, []);

  return (
    <>
      <div className="background"></div>
      <div
        className="preview"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpLeave}
        onMouseLeave={handleMouseUpLeave}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUpLeave}
      >
        <img
          className="foreground"
          draggable={false}
          onLoad={handleImageLoad}
          src={imageRef.current?.src}
        />
      </div>
      <div
        className="resizer"
        onMouseDown={handleResizeMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpLeave}
        onMouseLeave={handleMouseUpLeave}
        onTouchStart={handleResizeMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUpLeave}
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
        .foreground {
          height: ${imageSize.height}px;
          left: -${(croppedDimensions.value.centerX - croppedDimensions.value.diameter / 2) * ratio.value}px;
          position: absolute;
          top: -${(croppedDimensions.value.centerY - croppedDimensions.value.diameter / 2) * ratio.value}px;
          user-select: none;
          width: ${imageSize.width}px;
        }
        .preview {
          border: dashed 1px blue;
          border-radius: 50%;
          height: ${croppedDimensions.value.diameter * ratio.value}px;
          left: ${-1 +
          (croppedDimensions.value.centerX -
            croppedDimensions.value.diameter / 2) *
            ratio.value}px;
          overflow: hidden;
          position: absolute;
          top: ${-1 +
          (croppedDimensions.value.centerY -
            croppedDimensions.value.diameter / 2) *
            ratio.value}px;
          width: ${croppedDimensions.value.diameter * ratio.value}px;
        }
        .resizer {
          display: flex;
          left: ${-14 +
          (croppedDimensions.value.centerX +
            (croppedDimensions.value.diameter / 2) * 0.707) *
            ratio.value}px;
          position: absolute;
          top: ${-14 +
          (croppedDimensions.value.centerY -
            (croppedDimensions.value.diameter / 2) * 0.707) *
            ratio.value}px;
        }
      `}</style>
    </>
  );
};

export default forwardRef<CropperRef, CropperProps>(Cropper);
