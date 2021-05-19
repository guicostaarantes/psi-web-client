import { gql, useQuery } from "@apollo/client";

interface GetServerTimeResponse {
  time: number;
}

export const GetServerTime = gql`
  query GetServerTime {
    time
  }
`;

const useServerTime = () => {
  const { data } = useQuery<GetServerTimeResponse>(GetServerTime, {
    fetchPolicy: "no-cache",
  });

  return data?.time as number | undefined;
};

export default useServerTime;
