import { useQuery } from "@apollo/client";
import { useState } from "@hookstate/core";
import { useEffect } from "react";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import {
  PATIENT_TERM_PREFIX,
  PSYCHOLOGIST_TERM_PREFIX,
} from "@psi/profiles/constants/characteristicPrefixes";
import {
  GetPatientTermsDocument,
  GetPatientTermsQuery,
  GetPsychologistTermsDocument,
  GetPsychologistTermsQuery,
  Role,
  Term,
  useGetCharacteristicMessagesLazyQuery,
} from "@psi/shared/graphql";

const useTerms = () => {
  const { role } = useCurrentUser();

  const isPatient = role === Role.Patient;

  const { data: termsData } = useQuery<
    GetPatientTermsQuery & GetPsychologistTermsQuery
  >(isPatient ? GetPatientTermsDocument : GetPsychologistTermsDocument);

  const [
    getMessages,
    { data: termMessagesData },
  ] = useGetCharacteristicMessagesLazyQuery();

  const activeTerms = useState<Array<Term>>([]);
  const messages = useState({});

  useEffect(() => {
    const data = termsData?.patientTerms || termsData?.psychologistTerms;
    if (data) {
      activeTerms.set(
        data.reduce((final, term) => {
          const replaceIndex = final.findIndex(
            (t) => t.name === term.name && t.version < term.version,
          );
          if (term.active) {
            if (replaceIndex !== -1) {
              final[replaceIndex] = term;
            } else {
              final.push(term);
            }
          }
          return final;
        }, [] as Array<Term>),
      );
    }
  }, [termsData]);

  useEffect(() => {
    if (activeTerms.value.length && !termMessagesData) {
      const keys = [];

      const prefix = isPatient ? PATIENT_TERM_PREFIX : PSYCHOLOGIST_TERM_PREFIX;

      activeTerms.value.forEach((t) =>
        keys.push(`${prefix}:${t.name}:${t.version}`),
      );

      getMessages({ variables: { lang: "pt-BR", keys } });
    }
  }, [activeTerms.value.length, termMessagesData]);

  useEffect(() => {
    if (termMessagesData?.translations) {
      messages.set(
        termMessagesData.translations.reduce((final, msg) => {
          final[msg.key] = msg.value;
          return final;
        }, {}),
      );
    }
  }, [termMessagesData]);

  return {
    terms: activeTerms.value,
    messages: messages.value,
  };
};

export default useTerms;
