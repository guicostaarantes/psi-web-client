import Head from "next/head";

import usePagePermission from "@psi/auth/hooks/usePagePermission";
import PatientDataComponent from "@psi/profiles/components/PatientData";
import LoadingPage from "@psi/shared/components/LoadingPage";
import NotFoundPage from "@psi/shared/components/NotFoundPage";
import Container from "@psi/styleguide/components/Layout/Container";

const PatientPage = () => {
  const { pageStatus } = usePagePermission({
    requiresAuth: true,
    requiresRole: ["COORDINATOR", "PATIENT"],
  });

  if (pageStatus === "loading") {
    return <LoadingPage />;
  }

  if (pageStatus === "notFound") {
    return <NotFoundPage />;
  }

  if (pageStatus === "ready") {
    return (
      <>
        <Head>
          <title>Perfil do paciente | PSI</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <PatientDataComponent />
        </Container>
      </>
    );
  }
};

export default PatientPage;
