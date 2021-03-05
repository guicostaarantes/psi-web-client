import useCurrentUser from "@src/modules/auth/hooks/useCurrentUser";

const Index = () => {
  useCurrentUser(true);

  return "Index";
};

export default Index;
