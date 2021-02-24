import useCurrentUser from "@src/hooks/useCurrentUser";

const Index = () => {
  useCurrentUser(true);

  return "Index";
};

export default Index;
