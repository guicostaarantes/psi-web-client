import { gql } from "@apollo/client";
import { Role } from "@psi/auth/constants/roles";

export interface GetOwnUserResponseData {
  id: string;
  email: string;
  role: Role;
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
