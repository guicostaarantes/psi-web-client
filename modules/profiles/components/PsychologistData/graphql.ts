import { gql } from "@apollo/client";

export type CharacteristicType = "BOOLEAN" | "SINGLE" | "MULTIPLE";

export interface GetOwnPsychologistProfileResponse {
  getOwnPsychologistProfile: {
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

export const GetOwnPsychologistProfile = gql`
  query GetOwnPsychologistProfile {
    getOwnPsychologistProfile {
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

export interface CreateOrUpdatePsychologistProfileInput {
  profileInput: {
    fullName: string;
    likeName: string;
    birthDate: number;
    city: string;
  };
}

export const CreateOwnPsychologistProfile = gql`
  mutation CreateOwnPsychologistProfile(
    $profileInput: CreateOwnPsychologistProfileInput!
  ) {
    createOwnPsychologistProfile(input: $profileInput)
  }
`;

export const UpdateOwnPsychologistProfile = gql`
  mutation UpdateOwnPsychologistProfile(
    $profileInput: UpdateOwnPsychologistProfileInput!
  ) {
    updateOwnPsychologistProfile(input: $profileInput)
  }
`;

export interface SetOwnPsychologistCharacteristicChoicesAndPreferencesInput {
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

export const SetOwnPsychologistCharacteristicChoicesAndPreferences = gql`
  mutation SetOwnPsychologistCharacteristicChoicesAndPreferences(
    $choiceInput: [SetOwnProfileCharacteristicChoiceInput!]!
    $weightInput: [SetOwnProfilePreferenceInput!]!
  ) {
    setOwnPsychologistCharacteristicChoices(input: $choiceInput)
    setOwnPsychologistPreferences(input: $weightInput)
  }
`;
