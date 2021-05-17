import { gql } from "@apollo/client";

import { Role } from "@psi/auth/constants/roles";

export interface MyUserResponseData {
  id: string;
  role: Role;
}

export interface MyUserResponse {
  myUser: MyUserResponseData;
}

export const MyUser = gql`
  query MyUser {
    myUser {
      id
      role
    }
  }
`;
