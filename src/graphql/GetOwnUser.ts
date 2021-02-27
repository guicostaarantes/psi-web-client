import { gql } from "@apollo/client";

export interface GetOwnUserResponseData {
  id: string;
  email: string;
  role: string;
}

export interface GetOwnUserResponse {
  getOwnUser: GetOwnUserResponseData;
}

const GetOwnUser = gql`
  query GetOwnUser {
    getOwnUser {
      id
      email
      role
    }
  }
`;

export default GetOwnUser;
