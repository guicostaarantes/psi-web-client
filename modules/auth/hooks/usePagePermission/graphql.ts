import { gql } from "@apollo/client";

import { Role } from "@psi/auth/constants/roles";

export interface GetOwnUserResponseData {
  id: string;
  role: Role;
}

export interface GetOwnUserResponse {
  getOwnUser: GetOwnUserResponseData;
}

export const GetOwnUser = gql`
  query GetOwnUser {
    getOwnUser {
      id
      role
    }
  }
`;
