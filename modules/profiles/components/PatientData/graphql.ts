import { gql } from "@apollo/client";

export type CharacteristicType = "BOOLEAN" | "SINGLE" | "MULTIPLE";

export interface MyPatientProfileResponse {
  myPatientProfile: {
    id: string;
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

export const MyPatientProfile = gql`
  query MyPatientProfile {
    myPatientProfile {
      id
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

export interface UpsertMyPatientProfileInput {
  profileInput: {
    fullName: string;
    likeName: string;
    birthDate: number;
    city: string;
  };
}

export const UpsertMyPatientProfile = gql`
  mutation UpsertMyPatientProfile($profileInput: UpsertMyPatientProfileInput!) {
    upsertMyPatientProfile(input: $profileInput)
  }
`;

export interface SetMyPatientCharacteristicChoicesAndPreferencesInput {
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

export const SetMyPatientCharacteristicChoicesAndPreferences = gql`
  mutation SetMyPatientCharacteristicChoicesAndPreferences(
    $choiceInput: [SetMyProfileCharacteristicChoiceInput!]!
    $weightInput: [SetMyProfilePreferenceInput!]!
  ) {
    setMyPatientCharacteristicChoices(input: $choiceInput)
    setMyPatientPreferences(input: $weightInput)
  }
`;
