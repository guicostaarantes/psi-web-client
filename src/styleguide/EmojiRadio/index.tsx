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

const MARGIN = 0.2;
const ICON_WIDTH = 1.5;
const ZOOM_ICON_WIDTH = 2.5;

const EmojiRadio = ({
  checkedValue,
  name,
  onChange,
  options,
}: EmojiRadioProps) => {
  const { theme } = useTheme();

  return (
    <>
      <div className="wrapper">
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
            <div className="image">
              <img src={opt.src} alt={opt.label} title={opt.label} />
            </div>
          </label>
        ))}
      </div>
      <style jsx>{`
        .wrapper {
          align-items: center;
          display: flex;
          height: ${ZOOM_ICON_WIDTH}rem;
          width: ${2 * ZOOM_ICON_WIDTH +
          (options.length - 1) * (ICON_WIDTH + 2 * MARGIN)}rem;
        }
        label {
          display: flex;
        }
        img {
          border-radius: 15%;
          cursor: pointer;
          margin: ${MARGIN}rem;
          width: ${ICON_WIDTH}rem;
          transition: filter 0.3s ease, width 0.3s ease;
        }
        input {
          appearance: none;
          height: 0;
          margin: 0;
          width: 0;
        }
        input:focus:not(:active) + .image img {
          box-shadow: 0 0 0 0.1rem ${theme.primaryColorHover}77;
        }
        input:checked + .image img {
          filter: saturate(200%);
          width: ${ZOOM_ICON_WIDTH}rem;
        }
        div:not(:hover) input:not(:checked) + .image img {
          filter: saturate(0%);
        }
        img:hover {
          filter: saturate(200%);
          width: ${ZOOM_ICON_WIDTH}rem;
        }
      `}</style>
    </>
  );
};

export default EmojiRadio;
