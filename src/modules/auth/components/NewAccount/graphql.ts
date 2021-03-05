import { gql } from "@apollo/client";

const CreatePatientUser = gql`
  mutation CreatePatientUser($email: String!) {
    createPatientUser(input: { email: $email })
  }
`;

export default CreatePatientUser;
