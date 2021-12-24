import { useGetServerTimeQuery } from "@psi/shared/graphql";

const useServerTime = () => {
  const { data } = useGetServerTimeQuery({
    fetchPolicy: "no-cache",
  });

  return data?.time;
};

export default useServerTime;
