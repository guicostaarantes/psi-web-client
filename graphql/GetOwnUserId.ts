import { gql } from "@apollo/client";

export interface GetOwnUserIdResponse {
  getOwnUser: {
    id: string;
  };
}

const GetOwnUserId = gql`
  query GetOwnUserId {
    getOwnUser {
      id
    }
  }
`;

export default GetOwnUserId;
