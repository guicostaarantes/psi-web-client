import { State } from "@hookstate/core";
import { HAPPINESS_OPTIONS } from "@src/constants/happiness";
import EmojiRadio from "@src/styleguide/EmojiRadio";
import Row from "@src/styleguide/Layout/Row";
import Paragraph from "@src/styleguide/Typography/Paragraph";

interface PreferenceChooserComponentProps {
  preferences: State<
    {
      name: string;
      type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
      possibleValues: string[];
    }[]
  >;
  weights: State<Record<string, Record<string, number>>>;
}

const PreferenceChooserComponent = ({
  preferences,
  weights,
}: PreferenceChooserComponentProps) => {
  return (
    <>
      {preferences?.value?.map((pref) => (
        <div key={pref.name}>
          <Row style={{ margin: "1rem" }}>
            <Paragraph noMarginBottom noMarginTop>
              {pref.name}
            </Paragraph>
          </Row>
          {pref.possibleValues.map((pv) => (
            <Row
              key={`${pref.name}:${pv}`}
              style={{
                alignItems: "center",
                display: "flex",
                margin: "1rem",
              }}
            >
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
              <span>{pv}</span>
            </Row>
          ))}
        </div>
      ))}
    </>
  );
};

export default PreferenceChooserComponent;
