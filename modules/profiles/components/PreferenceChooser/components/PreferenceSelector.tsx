import { State, useState } from "@hookstate/core";

import { HAPPINESS_OPTIONS } from "@psi/profiles/constants/happiness";
import EmojiRadio from "@psi/styleguide/components/EmojiRadio";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface PreferenceSelectorProps {
  message: string;
  prefName: string;
  pv: string;
  weight: State<Record<string, number>>;
}

const PreferenceSelector = ({
  message,
  prefName,
  pv,
  weight,
}: PreferenceSelectorProps) => {
  const internalWeight = useState(weight[pv]);

  return (
    <div className="wrapper">
      <div>
        <Paragraph noMarginBottom>{message}</Paragraph>
      </div>
      <div>
        <EmojiRadio
          name={`${prefName}:${pv}`}
          checkedValue={internalWeight.value}
          onChange={(newValue) => internalWeight.set(newValue)}
          options={HAPPINESS_OPTIONS}
        />
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 1rem;
        }
      `}</style>
    </div>
  );
};

export default PreferenceSelector;
