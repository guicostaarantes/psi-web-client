import { gql } from "@apollo/client";

const AuthenticateUser = gql`
  query AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(input: { email: $email, password: $password }) {
      token
      expiresAt
    }
  }
`;

export default AuthenticateUser;
