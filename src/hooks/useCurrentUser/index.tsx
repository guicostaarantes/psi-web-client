import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import GetOwnUser, { GetOwnUserIdResponse } from "@src/graphql/GetOwnUserId";

const useCurrentUser = (redirectIfNotAuthenticated: boolean): string => {
  const router = useRouter();

  const { data, error } = useQuery<GetOwnUserIdResponse>(GetOwnUser);

  useEffect(() => {
    if (error && redirectIfNotAuthenticated) {
      router.push("/login");
    }
  }, [error]);

  return data?.getOwnUser.id;
};

export default useCurrentUser;
