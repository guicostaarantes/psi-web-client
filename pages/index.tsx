import Head from "next/head";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import usePagePermission from "@psi/auth/hooks/usePagePermission";
import PatientHome from "@psi/patientStart/components/Home";
import PsychologistHome from "@psi/psychologistStart/components/Home";
import LoadingPage from "@psi/shared/components/LoadingPage";
import Container from "@psi/styleguide/components/Layout/Container";

const Index = () => {
  const { pageStatus } = usePagePermission({
    requiresAuth: true,
  });

  const user = useCurrentUser();

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
          {user.role === "PATIENT" ? (
            <PatientHome />
          ) : user.role === "PSYCHOLOGIST" ? (
            <PsychologistHome />
          ) : (
            <></>
          )}
        </Container>
      </>
    );
  }
};

export default Index;
