import { gql } from "@apollo/client";

export type CharacteristicType = "BOOLEAN" | "SINGLE" | "MULTIPLE";

export interface GetOwnPatientProfileResponse {
  getOwnPatientProfile: {
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

export const GetOwnPatientProfile = gql`
  query GetOwnPatientProfile {
    getOwnPatientProfile {
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
  getPatientCharacteristics: {
    name: string;
    type: CharacteristicType;
    possibleValues: string[];
  }[];
  getPsychologistCharacteristics: {
    name: string;
    type: CharacteristicType;
    possibleValues: string[];
  }[];
}

export const GetCharacteristics = gql`
  query GetCharacteristics {
    getPatientCharacteristics {
      name
      type
      possibleValues
    }
    getPsychologistCharacteristics {
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
  getMessages: {
    lang: string;
    key: string;
    value: string;
  }[];
}

export const GetCharacteristicMessages = gql`
  query GetCharacteristicMessages($lang: String!, $keys: [String!]!) {
    getMessages(lang: $lang, keys: $keys) {
      lang
      key
      value
    }
  }
`;

export interface CreateOrUpdatePatientProfileInput {
  profileInput: {
    fullName: string;
    likeName: string;
    birthDate: number;
    city: string;
  };
}

export const CreateOwnPatientProfile = gql`
  mutation CreateOwnPatientProfile(
    $profileInput: CreateOwnPatientProfileInput!
  ) {
    createOwnPatientProfile(input: $profileInput)
  }
`;

export const UpdateOwnPatientProfile = gql`
  mutation UpdateOwnPatientProfile(
    $profileInput: UpdateOwnPatientProfileInput!
  ) {
    updateOwnPatientProfile(input: $profileInput)
  }
`;

export interface SetOwnPatientCharacteristicChoicesAndPreferencesInput {
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

export const SetOwnPatientCharacteristicChoicesAndPreferences = gql`
  mutation SetOwnPatientCharacteristicChoicesAndPreferences(
    $choiceInput: [SetOwnProfileCharacteristicChoiceInput!]!
    $weightInput: [SetOwnProfilePreferenceInput!]!
  ) {
    setOwnPatientCharacteristicChoices(input: $choiceInput)
    setOwnPatientPreferences(input: $weightInput)
  }
`;
