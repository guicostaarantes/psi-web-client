import { useGetServerTimeQuery } from "@psi/shared/graphql";

const useServerTime = () => {
  const { data } = useGetServerTimeQuery({
    fetchPolicy: "no-cache",
  });

  return data?.time as number | undefined;
};

export default useServerTime;
