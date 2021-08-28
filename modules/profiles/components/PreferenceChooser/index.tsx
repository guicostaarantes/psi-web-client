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
  weight: State<Record<string, number>>;
}

const PreferenceChooserComponent = ({
  preference,
  weight,
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
          weight={weight}
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
              weight={weight}
            />
          ))
      )}
    </div>
  );
};

export default PreferenceChooserComponent;
