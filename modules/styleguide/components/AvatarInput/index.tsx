import { InputHTMLAttributes, LegacyRef } from "react";

interface AvatarInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  name: string;
  label: string;
  reference?: LegacyRef<HTMLInputElement>;
}

const AvatarInput = ({ label, name, reference, ...rest }: AvatarInputProps) => {
  return (
    <>
      <div>
        <input
          aria-label={label}
          id={name}
          name={name}
          placeholder={label}
          ref={reference}
          type="file"
          {...rest}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    </>
  );
};

export default AvatarInput;
