import { State } from "@hookstate/core";
import { HAPPINESS_OPTIONS } from "@src/constants/happiness";
import EmojiRadio from "@src/styleguide/EmojiRadio";
import Row from "@src/styleguide/Layout/Row";

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
}

const PreferenceChooserComponent = ({
  preferences,
  weights,
  messages,
}: PreferenceChooserComponentProps) => {
  return (
    <>
      {preferences?.value?.map((pref, index) => (
        <div key={pref.name}>
          {index > 0 ? <Row style={{ padding: "0.5rem" }}></Row> : null}
          {pref.possibleValues.map((pv) => (
            <div key={`${pref.name}:${pv}`} className="wrapper">
              <div>
                <span>{messages.value[`pref:${pref.name}:${pv}`]}</span>
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
