import Head from "next/head";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import usePagePermission from "@psi/auth/hooks/usePagePermission";
import PatientDataComponent from "@psi/profiles/components/PatientData";
import PsychologistDataComponent from "@psi/profiles/components/PsychologistData";
import LoadingPage from "@psi/shared/components/LoadingPage";
import NotFoundPage from "@psi/shared/components/NotFoundPage";
import { Role } from "@psi/shared/graphql";
import Container from "@psi/styleguide/components/Layout/Container";

const PatientPage = () => {
  const { pageStatus } = usePagePermission({
    requiresAuth: true,
  });

  const { role } = useCurrentUser();

  if (pageStatus === "loading") {
    return <LoadingPage />;
  }

  if (pageStatus === "notFound") {
    return <NotFoundPage />;
  }

  if (pageStatus === "ready") {
    if (role === Role.Patient) {
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
    } else if (role === Role.Psychologist || role === Role.Coordinator) {
      return (
        <>
          <Head>
            <title>Perfil do psicólogo | PSI</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Container>
            <PsychologistDataComponent />
          </Container>
        </>
      );
    } else {
      return null;
    }
  }
};

export default PatientPage;
