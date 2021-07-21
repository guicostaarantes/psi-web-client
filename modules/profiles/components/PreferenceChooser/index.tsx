import { State } from "@hookstate/core";

import BooleanPreferenceSelector from "@psi/profiles/components/PreferenceChooser/components/BooleanPreferenceSelector";
import PreferenceSelector from "@psi/profiles/components/PreferenceChooser/components/PreferenceSelector";

interface PreferenceChooserComponentProps {
  preferences: {
    name: string;
    type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
    possibleValues: string[];
  }[];
  weights: State<Record<string, Record<string, number>>>;
  messages: Record<string, string>;
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
      {preferences.map((pref, index) => (
        <div key={pref.name}>
          {index > 0 ? <div style={{ padding: "0.5rem" }}></div> : null}
          {pref.type === "BOOLEAN" ? (
            <BooleanPreferenceSelector
              message={messages[`${prefix}:${pref.name}:true`]}
              prefName={pref.name}
              weight={weights[pref.name]}
            />
          ) : (
            pref.possibleValues
              .filter((pv) => messages[`${prefix}:${pref.name}:${pv}`])
              .map((pv) => (
                <PreferenceSelector
                  key={`${pref.name}:${pv}`}
                  message={messages[`${prefix}:${pref.name}:${pv}`]}
                  prefName={pref.name}
                  pv={pv}
                  weight={weights[pref.name]}
                />
              ))
          )}
        </div>
      ))}
    </>
  );
};

export default PreferenceChooserComponent;
