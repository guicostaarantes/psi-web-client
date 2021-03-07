import { useQuery } from "@apollo/client";
import GetOwnUser, {
  GetOwnUserResponse,
  GetOwnUserResponseData,
} from "@psi/auth/hooks/useCurrentUser/graphql";

const useCurrentUser = (): GetOwnUserResponseData => {
  const { data } = useQuery<GetOwnUserResponse>(GetOwnUser);

  return data?.getOwnUser || ({} as GetOwnUserResponseData);
};

export default useCurrentUser;
