import { gql } from "@apollo/client";

export interface GetOwnPatientProfileResponse {
  getOwnPatientProfile: {
    fullName: string;
    likeName: string;
    birthDate: string;
    city: string;
    characteristics: {
      name: string;
      type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
      selectedValues: string[];
      possibleValues: string[];
    }[];
    preferences: {
      characteristicName: string;
      selectedValue: string;
      weight: number;
    }[];
  };
  getPsychologistCharacteristics: {
    name: string;
    type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
    possibleValues: string[];
  }[];
}

const GetOwnPatientProfile = gql`
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
        possibleValues
      }
      preferences {
        characteristicName
        selectedValue
        weight
      }
    }
    getPsychologistCharacteristics {
      name
      type
      possibleValues
    }
  }
`;

export default GetOwnPatientProfile;
