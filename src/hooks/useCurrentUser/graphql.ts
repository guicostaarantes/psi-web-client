import { gql } from "@apollo/client";

export interface GetOwnUserResponseData {
  id: string;
  role: string;
}

export interface GetOwnUserResponse {
  getOwnUser: GetOwnUserResponseData;
}

const GetOwnUser = gql`
  query GetOwnUser {
    getOwnUser {
      id
      role
    }
  }
`;

export default GetOwnUser;
