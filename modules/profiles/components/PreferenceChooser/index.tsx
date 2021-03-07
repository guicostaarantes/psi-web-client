import { State } from "@hookstate/core";
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
              <div key={`${pref.name}:${pv}`} className="wrapper">
                <div>
                  <Paragraph noMarginBottom>
                    {messages.value[`${prefix}:${pref.name}:${pv}`]}
                  </Paragraph>
                </div>
                <div>
                  <EmojiRadio
                    name={`${pref.name}:${pv}`}
                    checkedValue={weights.value?.[pref.name]?.[pv]}
                    onChange={(newValue) =>
                      weights.set((old) => ({
                        ...old,
                        [pref.name]: { ...old[pref.name], [pv]: newValue },
                      }))
                    }
                    options={HAPPINESS_OPTIONS}
                  />
                </div>
              </div>
            ))}
        </div>
      ))}
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 1rem;
        }
      `}</style>
    </>
  );
};

export default PreferenceChooserComponent;
