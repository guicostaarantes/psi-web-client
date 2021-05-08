import { gql } from "@apollo/client";

export interface GetOwnLikeNameResponse {
  getOwnPatientProfile: {
    likeName: string;
  };
}

export const GetOwnLikeName = gql`
  query GetOwnLikeName {
    getOwnPatientProfile {
      likeName
    }
  }
`;
