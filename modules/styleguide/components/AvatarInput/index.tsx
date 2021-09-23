import { useState } from "@hookstate/core";
import {
  ChangeEvent,
  InputHTMLAttributes,
  RefObject,
  useEffect,
  useRef,
} from "react";

import useResizeObserver from "@psi/shared/hooks/useResizeObserver";
import Image from "@psi/styleguide/components/Image";
import Modal from "@psi/styleguide/components/Modal";

interface AvatarInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  currentAvatar: JSX.Element;
  name: string;
  label: string;
  reference?: RefObject<HTMLInputElement>;
}

const AvatarInput = ({
  currentAvatar,
  label,
  name,
  reference,
  ...rest
}: AvatarInputProps) => {
  const modalOpen = useState(false);

  const croppedDimensions = useState({ centerX: 0, centerY: 0, diameter: 0 });
  const ratio = useState(0);

  const uploadedFileLink = useState("");
  const croppedFileLink = useState("");

  const modalImageRef = useRef<HTMLImageElement>();
  const imageSize = useResizeObserver(modalImageRef.current);

  useEffect(() => {
    ratio.set(imageSize.height / modalImageRef.current?.naturalHeight);
  }, [imageSize]);

  useEffect(() => {
    setTimeout(() => {
      const height = modalImageRef.current?.naturalHeight || 0;
      const width = modalImageRef.current?.naturalWidth || 0;
      croppedDimensions.set({
        centerX: Math.floor(width / 2),
        centerY: Math.floor(height / 2),
        diameter: Math.floor(0.9 * Math.min(height, width)),
      });
    }, 100);
  }, [modalOpen.value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { files } = event.target;
    modalOpen.set(true);
    uploadedFileLink.set(URL.createObjectURL(files[0]));
  };

  const handleConfirm = () => {
    const canvas = document.createElement("canvas");
    const { centerX, centerY, diameter } = croppedDimensions.value;
    const radius = Math.floor(diameter / 2);
    const canvasSize = 600;

    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas
      .getContext("2d")
      .drawImage(
        modalImageRef.current,
        centerX - radius,
        centerY - radius,
        diameter,
        diameter,
        0,
        0,
        canvasSize,
        canvasSize,
      );

    canvas.toBlob((blob) => {
      const file = new File([blob], "upload.webp", {
        lastModified: 0,
        type: "image/webp",
      });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      reference.current.files = dataTransfer.files;
      croppedFileLink.set(URL.createObjectURL(file));
    }, "image/webp");
  };

  return (
    <>
      <div className="center">
        <div className="image-wrapper">{currentAvatar}</div>
        {croppedFileLink.value ? (
          <div className="image-wrapper">
            <Image circle label="Novo avatar" src={croppedFileLink.value} />
          </div>
        ) : null}
      </div>
      <input
        aria-label={label}
        id={name}
        name={name}
        onChange={handleChange}
        placeholder={label}
        ref={reference}
        type="file"
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
      <Modal
        open={modalOpen.value}
        onClose={() => modalOpen.set(false)}
        title="Cortar imagem"
      >
        <div className="image-container">
          <img ref={modalImageRef} src={uploadedFileLink.value} />
          <div className="background-opacity"></div>
          <div className="preview-circle">
            <img className="image-foreground" src={uploadedFileLink.value} />
          </div>
        </div>
        <button onClick={handleConfirm}>Confirmar</button>
      </Modal>
      <style jsx>{`
        img {
          height: 70vh;
        }
        .background-opacity {
          background-color: #0009;
          height: ${imageSize.height}px;
          left: 0;
          position: absolute;
          top: 0;
          width: ${imageSize.width}px;
        }
        .center {
          align-items: center;
          display: flex;
          flex-direction: column;
        }
        .image-container {
          position: relative;
        }
        .image-foreground {
          left: -${(croppedDimensions.value.centerX - croppedDimensions.value.diameter / 2) * ratio.value}px;
          position: absolute;
          top: -${(croppedDimensions.value.centerY - croppedDimensions.value.diameter / 2) * ratio.value}px;
        }
        .image-wrapper {
          height: 5rem;
          width: 5rem;
        }
        .preview-circle {
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
    </>
  );
};

export default AvatarInput;
