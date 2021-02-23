import { gql } from "@apollo/client";

const ResetPassword = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(input: { token: $token, password: $newPassword })
  }
`;

export default ResetPassword;
