import { gql } from "@apollo/client";

const GetOwnUserId = gql`
  query GetOwnUserId {
    getOwnUser {
      id
    }
  }
`;

export default GetOwnUserId;
