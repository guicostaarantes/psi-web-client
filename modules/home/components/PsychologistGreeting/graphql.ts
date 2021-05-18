import { gql } from "@apollo/client";

export interface MyLikeNameResponse {
  myPsychologistProfile: {
    id: string;
    likeName: string;
  };
}

export const MyLikeName = gql`
  query MyLikeName {
    myPsychologistProfile {
      id
      likeName
    }
  }
`;
