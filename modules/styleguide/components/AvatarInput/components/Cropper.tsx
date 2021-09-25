import { useState } from "@hookstate/core";
import {
  forwardRef,
  ForwardRefRenderFunction,
  RefObject,
  useEffect,
  useImperativeHandle,
} from "react";

import useResizeObserver from "@psi/shared/hooks/useResizeObserver";

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

  const isDragging = useState(false);
  const dragOriginX = useState(0);
  const dragOriginY = useState(0);
  const croppedOriginX = useState(0);
  const croppedOriginY = useState(0);

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

  const handleMouseDown = ({ clientX, clientY }) => {
    isDragging.set(true);
    dragOriginX.set(clientX);
    dragOriginY.set(clientY);
    croppedOriginX.set(croppedDimensions.value.centerX);
    croppedOriginY.set(croppedDimensions.value.centerY);
  };

  const handleMouseMove = ({ clientX, clientY }) => {
    if (isDragging.value) {
      croppedDimensions.set({
        centerX:
          croppedOriginX.value + (clientX - dragOriginX.value) / ratio.value,
        centerY:
          croppedOriginY.value + (clientY - dragOriginY.value) / ratio.value,
        diameter: croppedDimensions.value.diameter,
      });
    }
  };

  const handleMouseUpLeave = () => {
    isDragging.set(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpLeave}
      onMouseLeave={handleMouseUpLeave}
    >
      <div className="background"></div>
      <div className="preview">
        <img
          className="foreground"
          draggable={false}
          onLoad={handleImageLoad}
          src={imageRef.current?.src}
        />
      </div>
      <style jsx>{`
        .background {
          background-color: #0009;
          height: ${imageSize.height}px;
          left: 0;
          position: absolute;
          top: 0;
          width: ${imageSize.width}px;
        }
        .foreground {
          height: ${imageSize.height}px;
          left: -${(croppedDimensions.value.centerX - croppedDimensions.value.diameter / 2) * ratio.value}px;
          position: absolute;
          top: -${(croppedDimensions.value.centerY - croppedDimensions.value.diameter / 2) * ratio.value}px;
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
      `}</style>
    </div>
  );
};

export default forwardRef<CropperRef, CropperProps>(Cropper);
