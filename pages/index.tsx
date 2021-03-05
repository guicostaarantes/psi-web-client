import useCurrentUser from "@psi/auth/hooks/useCurrentUser";

const Index = () => {
  useCurrentUser(true);

  return "Index";
};

export default Index;
