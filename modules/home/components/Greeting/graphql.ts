import { gql } from "@apollo/client";

export interface MyLikeNameResponse {
  myPatientProfile: {
    likeName: string;
  };
}

export const MyLikeName = gql`
  query MyLikeName {
    myPatientProfile {
      likeName
    }
  }
`;
