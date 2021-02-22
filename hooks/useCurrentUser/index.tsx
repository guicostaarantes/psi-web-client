import GetOwnUser from "graphql/GetOwnUserId";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";

const useCurrentUser = (redirectIfNotAuthenticated: boolean): string => {
  const router = useRouter();

  const { data, error } = useQuery(GetOwnUser);

  useEffect(() => {
    if (error && redirectIfNotAuthenticated) {
      router.push("/login");
    }
  }, [error]);

  return data?.getOwnUser?.id;
};

export default useCurrentUser;
