import { gql } from "@apollo/client";

export interface AuthenticateUserResponse {
  authenticateUser: {
    token: string;
    expiresAt: number;
  };
}

const AuthenticateUser = gql`
  query AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(input: { email: $email, password: $password }) {
      token
      expiresAt
    }
  }
`;

export default AuthenticateUser;
