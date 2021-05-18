import { gql } from "@apollo/client";

export interface MyPatientLikeNameResponse {
  myPatientProfile: {
    id: string;
    likeName: string;
  };
}

export const MyPatientLikeName = gql`
  query MyPatientLikeName {
    myPatientProfile {
      id
      likeName
    }
  }
`;
