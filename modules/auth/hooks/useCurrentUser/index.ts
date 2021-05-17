import { useQuery } from "@apollo/client";

import MyUser, {
  MyUserResponse,
  MyUserResponseData,
} from "@psi/auth/hooks/useCurrentUser/graphql";

const useCurrentUser = (): MyUserResponseData => {
  const { data } = useQuery<MyUserResponse>(MyUser);

  return data?.myUser || ({} as MyUserResponseData);
};

export default useCurrentUser;
