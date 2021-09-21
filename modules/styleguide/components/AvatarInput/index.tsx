import { useState } from "@hookstate/core";
import {
  ChangeEvent,
  InputHTMLAttributes,
  LegacyRef,
  useEffect,
  useRef,
} from "react";

import Image from "@psi/styleguide/components/Image";
import Modal from "@psi/styleguide/components/Modal";

interface AvatarInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  currentAvatar: JSX.Element;
  name: string;
  label: string;
  reference?: LegacyRef<HTMLInputElement>;
}

const AvatarInput = ({
  currentAvatar,
  label,
  name,
  reference,
  ...rest
}: AvatarInputProps) => {
  const modalOpen = useState(false);

  const imageDimensions = useState({ height: 0, width: 0 });
  const croppedDimensions = useState({ centerX: 0, centerY: 0, diameter: 0 });

  const uploadedFileLink = useState("");
  const croppedFileLink = useState("");

  const modalImageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    setTimeout(() => {
      const { height, width } =
        modalImageRef.current?.getBoundingClientRect() || {};
      imageDimensions.set({ height, width });
      croppedDimensions.set({
        centerX: width / 2,
        centerY: height / 2,
        diameter: Math.min(height, width),
      });
    }, 0);
  }, [modalOpen.value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { files } = event.target;
    modalOpen.set(true);
    uploadedFileLink.set(URL.createObjectURL(files[0]));
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
      </Modal>
      <style jsx>{`
        img {
          height: 70vh;
        }
        .background-opacity {
          background-color: #0009;
          height: ${imageDimensions.value.height}px;
          left: 0;
          position: absolute;
          top: 0;
          width: ${imageDimensions.value.width}px;
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
          left: -${croppedDimensions.value.centerX - croppedDimensions.value.diameter / 2}px;
          position: absolute;
          top: -${croppedDimensions.value.centerY - croppedDimensions.value.diameter / 2}px;
        }
        .image-wrapper {
          height: 5rem;
          width: 5rem;
        }
        .preview-circle {
          border: dashed 1px blue;
          border-radius: 50%;
          height: ${croppedDimensions.value.diameter}px;
          left: ${croppedDimensions.value.centerX -
          croppedDimensions.value.diameter / 2}px;
          overflow: hidden;
          position: absolute;
          top: ${croppedDimensions.value.centerY -
          croppedDimensions.value.diameter / 2}px;
          width: ${croppedDimensions.value.diameter}px;
        }
      `}</style>
    </>
  );
};

export default AvatarInput;
