import { State, useState } from "@hookstate/core";
import { HAPPINESS_OPTIONS } from "@psi/profiles/constants/happiness";
import EmojiRadio from "@psi/styleguide/components/EmojiRadio";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface PreferenceChooserComponentProps {
  preferences: State<
    {
      name: string;
      type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
      possibleValues: string[];
    }[]
  >;
  weights: State<Record<string, Record<string, number>>>;
  messages: State<Record<string, string>>;
  prefix: string;
}

const PreferenceChooserComponent = ({
  preferences,
  weights,
  messages,
  prefix,
}: PreferenceChooserComponentProps) => {
  return (
    <>
      {preferences?.value?.map((pref, index) => (
        <div key={pref.name}>
          {index > 0 ? <div style={{ padding: "0.5rem" }}></div> : null}
          {pref.possibleValues
            .filter((pv) => messages.value[`${prefix}:${pref.name}:${pv}`])
            .map((pv) => (
              <PreferenceSelector
                key={`${pref.name}:${pv}`}
                message={messages.value[`${prefix}:${pref.name}:${pv}`]}
                prefName={pref.name}
                pv={pv}
                weight={weights[pref.name]}
              />
            ))}
        </div>
      ))}
    </>
  );
};

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

export default PreferenceChooserComponent;
