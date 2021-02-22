import useCurrentUser from "hooks/useCurrentUser";

const Index = () => {
  const user = useCurrentUser(true);

  return "Index";
};

export default Index;
