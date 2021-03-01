import useTheme from "@src/hooks/useTheme";

interface EmojiRadioProps {
  checkedValue: number;
  name: string;
  onChange: (newValue: number) => void;
  options: {
    label: string;
    src: string;
    value: number;
  }[];
}

const EmojiRadio = ({
  checkedValue,
  name,
  onChange,
  options,
}: EmojiRadioProps) => {
  const { theme } = useTheme();

  return (
    <>
      <div>
        {options.map((opt) => (
          <label key={opt.label}>
            <input
              aria-label={opt.label}
              checked={checkedValue === opt.value}
              id={`${name}:${opt.value}`}
              name={name}
              onChange={() => onChange(opt.value)}
              type="radio"
              value={opt.value}
            />
            <img src={opt.src} alt={opt.label} title={opt.label} />
          </label>
        ))}
      </div>
      <style jsx>{`
        div {
          align-items: center;
          display: flex;
          height: 2.5rem;
          width: 11.5rem;
        }
        label {
          display: flex;
        }
        img {
          border-radius: 15%;
          cursor: pointer;
          margin: 0.2rem;
          width: 1.5rem;
          transition: filter 0.3s ease, width 0.3s ease;
        }
        input {
          margin: 0;
          height: 0;
          width: 0;
        }
        input:focus:not(:active) + img {
          box-shadow: 0 0 0 0.1rem ${theme.primaryColorHover}77;
        }
        input:checked + img {
          filter: saturate(200%);
          width: 2.5rem;
        }
        div:not(:hover) input:not(:checked) + img {
          filter: saturate(0%);
        }
        img:hover {
          filter: saturate(200%);
          width: 2.5rem;
        }
      `}</style>
    </>
  );
};

export default EmojiRadio;
