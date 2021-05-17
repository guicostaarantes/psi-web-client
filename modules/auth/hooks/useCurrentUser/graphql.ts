import { gql } from "@apollo/client";

import { Role } from "@psi/auth/constants/roles";

export interface MyUserResponseData {
  id: string;
  email: string;
  role: Role;
}

export interface MyUserResponse {
  myUser: MyUserResponseData;
}

const MyUser = gql`
  query MyUser {
    myUser {
      id
      email
      role
    }
  }
`;

export default MyUser;
