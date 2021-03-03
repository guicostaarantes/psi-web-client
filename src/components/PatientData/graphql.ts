import { gql } from "@apollo/client";

export type CharacteristicType = "BOOLEAN" | "SINGLE" | "MULTIPLE";

export interface GetOwnPatientProfileResponse {
  getOwnPatientProfile: {
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

export interface CreateOrUpdatePatientProfileInput {
  input: {
    fullName: string;
    likeName: string;
    birthDate: number;
    city: string;
  };
}

export const CreateOwnPatientProfile = gql`
  mutation CreateOwnPatientProfile($input: CreateOwnPatientProfileInput!) {
    createOwnPatientProfile(input: $input)
  }
`;

export const UpdateOwnPatientProfile = gql`
  mutation UpdateOwnPatientProfile($input: UpdateOwnPatientProfileInput!) {
    updateOwnPatientProfile(input: $input)
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
