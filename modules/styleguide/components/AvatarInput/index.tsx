import { useState } from "@hookstate/core";
import { ChangeEvent, InputHTMLAttributes, LegacyRef, useRef } from "react";

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
  const imageLoaded = useState(false);

  const thumbnailImageRef = useRef(null);
  const modalImageRef = useRef(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    modalOpen.set(true);
    event.preventDefault();
    const { files } = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      imageLoaded.set(true);
      modalImageRef.current.src = reader.result;
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <>
      <div className="center">
        <div className="image-wrapper">{currentAvatar}</div>
        {imageLoaded.value ? (
          <div className="image-wrapper">
            <Image
              circle
              label="New avatar"
              reference={thumbnailImageRef}
              src="avatar.webp"
            />
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
        <img ref={modalImageRef} />
      </Modal>
      <style jsx>{`
        img {
          height: 20vh;
        }
        .center {
          align-items: center;
          display: flex;
          flex-direction: column;
        }
        .image-wrapper {
          height: 5rem;
          width: 5rem;
        }
      `}</style>
    </>
  );
};

export default AvatarInput;
