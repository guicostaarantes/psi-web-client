import Head from "next/head";

import usePagePermission from "@psi/auth/hooks/usePagePermission";
import PatientGreeting from "@psi/home/components/PatientGreeting";
import PatientStatus from "@psi/home/components/PatientStatus";
import PsychologistGreeting from "@psi/home/components/PsychologistGreeting";
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
          <PatientGreeting />
          <PatientStatus />
          <PsychologistGreeting />
        </Container>
      </>
    );
  }
};

export default Index;
