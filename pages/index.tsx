import Head from "next/head";

import usePagePermission from "@psi/auth/hooks/usePagePermission";
import Greeting from "@psi/home/components/Greeting";
import LoadingPage from "@psi/shared/components/LoadingPage";
import Container from "@psi/styleguide/components/Layout/Container";

const Index = () => {
  const { pageStatus } = usePagePermission({
    requiresAuth: true,
  });

  if (pageStatus === "loading") {
    return <LoadingPage />;
  }

  if (pageStatus === "ready") {
    return (
      <>
        <Head>
          <title>Página inicial | PSI</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <Greeting />
        </Container>
      </>
    );
  }
};

export default Index;
