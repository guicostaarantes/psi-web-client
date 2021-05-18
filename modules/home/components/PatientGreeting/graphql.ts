import { gql } from "@apollo/client";

export interface MyLikeNameResponse {
  myPatientProfile: {
    id: string;
    likeName: string;
  };
}

export const MyLikeName = gql`
  query MyLikeName {
    myPatientProfile {
      id
      likeName
    }
  }
`;
