import { useState } from "@hookstate/core";
import { useEffect } from "react";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import {
  PATIENT_CHARACTERISTIC_PREFIX,
  PATIENT_PREFERENCE_PREFIX,
  PSYCHOLOGIST_CHARACTERISTIC_PREFIX,
  PSYCHOLOGIST_PREFERENCE_PREFIX,
} from "@psi/profiles/constants/characteristicPrefixes";
import {
  Role,
  useGetCharacteristicMessagesLazyQuery,
  useGetCharacteristicsQuery,
} from "@psi/shared/graphql";

const useCharacteristics = () => {
  const { role } = useCurrentUser();

  const { data: characteristicsData } = useGetCharacteristicsQuery();

  const [
    getMessages,
    { data: characteristicMessagesData },
  ] = useGetCharacteristicMessagesLazyQuery();

  const messages = useState({});

  useEffect(() => {
    if (characteristicsData && !characteristicMessagesData) {
      const keys = [];
      const isPatient = role === Role.Patient;

      const charPrefix = isPatient
        ? PATIENT_CHARACTERISTIC_PREFIX
        : PSYCHOLOGIST_CHARACTERISTIC_PREFIX;
      const prefPrefix = isPatient
        ? PSYCHOLOGIST_PREFERENCE_PREFIX
        : PATIENT_PREFERENCE_PREFIX;

      const myCharacteristics = isPatient
        ? characteristicsData.patientCharacteristics
        : characteristicsData.psychologistCharacteristics;
      const theirCharacteristics = isPatient
        ? characteristicsData.psychologistCharacteristics
        : characteristicsData.patientCharacteristics;

      myCharacteristics.forEach((char) => {
        keys.push(`${charPrefix}:${char.name}`);
        char.possibleValues.forEach((pv) =>
          keys.push(`${charPrefix}:${char.name}:${pv}`),
        );
      });

      theirCharacteristics.forEach((char) => {
        char.possibleValues.forEach((pv) =>
          keys.push(`${prefPrefix}:${char.name}:${pv}`),
        );
      });

      getMessages({ variables: { lang: "pt-BR", keys } });
    }
  }, [characteristicsData, characteristicMessagesData]);

  useEffect(() => {
    if (characteristicMessagesData?.translations) {
      messages.set(
        characteristicMessagesData.translations.reduce((final, msg) => {
          final[msg.key] = msg.value;
          return final;
        }, {}),
      );
    }
  }, [characteristicMessagesData]);

  return {
    characteristics: characteristicsData,
    messages: messages.value,
  };
};

export default useCharacteristics;
