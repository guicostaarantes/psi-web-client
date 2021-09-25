import { useState } from "@hookstate/core";
import { ChangeEvent, InputHTMLAttributes, RefObject, useRef } from "react";
import React from "react";

import Cropper, {
  CropperRef,
} from "@psi/styleguide/components/AvatarInput/components/Cropper";
import Button from "@psi/styleguide/components/Button";
import Image from "@psi/styleguide/components/Image";
import Modal from "@psi/styleguide/components/Modal";

interface AvatarInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  currentAvatar: JSX.Element;
  finalSize?: number;
  name: string;
  label: string;
  reference: RefObject<HTMLInputElement>;
}

const AvatarInput = ({
  currentAvatar,
  finalSize = 600,
  label,
  name,
  reference,
  ...rest
}: AvatarInputProps) => {
  const modalOpen = useState(false);

  const uploadedFileLink = useState("");
  const croppedFileLink = useState("");

  const modalImageRef = useRef<HTMLImageElement>();
  const cropperRef = useRef<CropperRef>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { files } = event.target;
    modalOpen.set(true);
    uploadedFileLink.set(URL.createObjectURL(files[0]));
  };

  const handleUndo = () => {
    reference.current.value = "";
    uploadedFileLink.set("");
    croppedFileLink.set("");
  };

  const handleConfirm = () => {
    if (cropperRef.current) {
      const canvas = document.createElement("canvas");
      const {
        centerX,
        centerY,
        diameter,
      } = cropperRef.current?.getDimensions();
      const radius = Math.floor(diameter / 2);
      canvas.width = finalSize;
      canvas.height = finalSize;
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
          finalSize,
          finalSize,
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
    }
  };

  return (
    <>
      <div className="wrapper">
        {croppedFileLink.value ? (
          <div className="image-wrapper">
            <Image circle label="Novo avatar" src={croppedFileLink.value} />
          </div>
        ) : (
          <div className="image-wrapper">{currentAvatar}</div>
        )}
        {croppedFileLink.value ? (
          <Button color="secondary" onClick={handleUndo}>
            Desfazer
          </Button>
        ) : (
          <Button color="primary" onClick={() => reference.current.click()}>
            {label}
          </Button>
        )}
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
      </div>
      <Modal
        open={modalOpen.value}
        onClose={() => modalOpen.set(false)}
        title="Cortar imagem"
      >
        <div className="image-container">
          <img ref={modalImageRef} src={uploadedFileLink.value} />
          <Cropper ref={cropperRef} imageRef={modalImageRef} />
        </div>
        <button onClick={handleConfirm}>Confirmar</button>
      </Modal>
      <style jsx>{`
        img {
          height: 70vh;
        }
        input {
          display: none;
        }
        .image-container {
          position: relative;
        }
        .image-wrapper {
          height: 5rem;
          width: 5rem;
        }
        .wrapper {
          align-items: center;
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </>
  );
};

export default AvatarInput;
