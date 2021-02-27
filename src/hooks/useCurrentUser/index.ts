import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import GetOwnUser, {
  GetOwnUserResponse,
  GetOwnUserResponseData,
} from "@src/graphql/GetOwnUser";

const useCurrentUser = (
  redirectIfNotAuthenticated: boolean,
): GetOwnUserResponseData => {
  const router = useRouter();

  const { data, error } = useQuery<GetOwnUserResponse>(GetOwnUser);

  useEffect(() => {
    if (error && redirectIfNotAuthenticated) {
      router.push("/login");
    }
  }, [error]);

  return data?.getOwnUser || ({} as GetOwnUserResponseData);
};

export default useCurrentUser;
