import { State } from "@hookstate/core";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import BooleanPreferenceSelector from "@psi/profiles/components/PreferenceChooser/components/BooleanPreferenceSelector";
import PreferenceSelector from "@psi/profiles/components/PreferenceChooser/components/PreferenceSelector";
import {
  PATIENT_PREFERENCE_PREFIX,
  PSYCHOLOGIST_PREFERENCE_PREFIX,
} from "@psi/profiles/constants/characteristicPrefixes";
import useCharacteristics from "@psi/profiles/hooks/useCharacteristics";
import { Characteristic, Role } from "@psi/shared/graphql";

interface PreferenceChooserComponentProps {
  preference: Characteristic;
  weights: State<Record<string, Record<string, number>>>;
}

const PreferenceChooserComponent = ({
  preference,
  weights,
}: PreferenceChooserComponentProps) => {
  const { role } = useCurrentUser();

  const { messages } = useCharacteristics();

  const prefix =
    role === Role.Patient
      ? PSYCHOLOGIST_PREFERENCE_PREFIX
      : PATIENT_PREFERENCE_PREFIX;

  return (
    <div key={preference.name}>
      {preference.type === "BOOLEAN" ? (
        <BooleanPreferenceSelector
          message={messages[`${prefix}:${preference.name}:true`]}
          prefName={preference.name}
          weight={weights[preference.name]}
        />
      ) : (
        preference.possibleValues
          .filter((pv) => messages[`${prefix}:${preference.name}:${pv}`])
          .map((pv) => (
            <PreferenceSelector
              key={`${preference.name}:${pv}`}
              message={messages[`${prefix}:${preference.name}:${pv}`]}
              prefName={preference.name}
              pv={pv}
              weight={weights[preference.name]}
            />
          ))
      )}
    </div>
  );
};

export default PreferenceChooserComponent;
