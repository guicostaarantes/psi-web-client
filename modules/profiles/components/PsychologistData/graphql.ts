import { gql } from "@apollo/client";

export type CharacteristicType = "BOOLEAN" | "SINGLE" | "MULTIPLE";

export interface MyPsychologistProfileResponse {
  myPsychologistProfile: {
    fullName: string;
    likeName: string;
    birthDate: string;
    city: string;
    characteristics: {
      name: string;
      type: CharacteristicType;
      selectedValues: string[];
    }[];
    preferences: {
      characteristicName: string;
      selectedValue: string;
      weight: number;
    }[];
  };
}

export const MyPsychologistProfile = gql`
  query MyPsychologistProfile {
    myPsychologistProfile {
      fullName
      likeName
      birthDate
      city
      characteristics {
        name
        type
        selectedValues
      }
      preferences {
        characteristicName
        selectedValue
        weight
      }
    }
  }
`;

export interface GetCharacteristicsResponse {
  patientCharacteristics: {
    name: string;
    type: CharacteristicType;
    possibleValues: string[];
  }[];
  psychologistCharacteristics: {
    name: string;
    type: CharacteristicType;
    possibleValues: string[];
  }[];
}

export const GetCharacteristics = gql`
  query GetCharacteristics {
    patientCharacteristics {
      name
      type
      possibleValues
    }
    psychologistCharacteristics {
      name
      type
      possibleValues
    }
  }
`;

export interface GetCharacteristicMessagesInput {
  lang: string;
  keys: string[];
}

export interface GetCharacteristicMessagesResponse {
  translations: {
    lang: string;
    key: string;
    value: string;
  }[];
}

export const GetCharacteristicMessages = gql`
  query GetCharacteristicMessages($lang: String!, $keys: [String!]!) {
    translations(lang: $lang, keys: $keys) {
      lang
      key
      value
    }
  }
`;

export interface UpsertMyPsychologistProfileInput {
  profileInput: {
    fullName: string;
    likeName: string;
    birthDate: number;
    city: string;
  };
}

export const UpsertMyPsychologistProfile = gql`
  mutation UpsertMyPsychologistProfile(
    $profileInput: UpsertMyPsychologistProfileInput!
  ) {
    upsertMyPsychologistProfile(input: $profileInput)
  }
`;

export interface SetMyPsychologistCharacteristicChoicesAndPreferencesInput {
  choiceInput: {
    characteristicName: string;
    selectedValues: string[];
  }[];
  weightInput: {
    characteristicName: string;
    selectedValue: string;
    weight: number;
  }[];
}

export const SetMyPsychologistCharacteristicChoicesAndPreferences = gql`
  mutation SetMyPsychologistCharacteristicChoicesAndPreferences(
    $choiceInput: [SetMyProfileCharacteristicChoiceInput!]!
    $weightInput: [SetMyProfilePreferenceInput!]!
  ) {
    setMyPsychologistCharacteristicChoices(input: $choiceInput)
    setMyPsychologistPreferences(input: $weightInput)
  }
`;
