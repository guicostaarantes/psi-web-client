import { gql } from "@apollo/client";

export interface MyPsychologistLikeNameResponse {
  myPsychologistProfile: {
    id: string;
    likeName: string;
  };
}

export const MyPsychologistLikeName = gql`
  query MyPsychologistLikeName {
    myPsychologistProfile {
      id
      likeName
    }
  }
`;
