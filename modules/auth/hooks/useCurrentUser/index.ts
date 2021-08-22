import { useMyUserQuery } from "@psi/shared/graphql";

const useCurrentUser = () => {
  const { data } = useMyUserQuery();

  return (
    data?.myUser || {
      __typename: "User",
      id: undefined,
      email: undefined,
      role: undefined,
    }
  );
};

export default useCurrentUser;
