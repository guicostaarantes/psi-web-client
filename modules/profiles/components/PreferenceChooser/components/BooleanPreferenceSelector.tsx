import { State, useState } from "@hookstate/core";

import { HAPPINESS_OPTIONS } from "@psi/profiles/constants/happiness";
import EmojiRadio from "@psi/styleguide/components/EmojiRadio";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface BooleanPreferenceSelectorProps {
  message: string;
  prefName: string;
  weight: State<Record<string, number>>;
}

const BooleanPreferenceSelector = ({
  message,
  prefName,
  weight,
}: BooleanPreferenceSelectorProps) => {
  const internalWeight = useState(weight);

  const handleChange = (newValue) => {
    internalWeight.set({ true: newValue, false: -newValue });
  };

  return (
    <div className="wrapper">
      <div>
        <Paragraph noMarginBottom>{message}</Paragraph>
      </div>
      <div>
        <EmojiRadio
          name={`${prefName}:true`}
          checkedValue={internalWeight.value?.["true"]}
          onChange={handleChange}
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

export default BooleanPreferenceSelector;
