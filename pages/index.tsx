import Head from "next/head";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import usePagePermission from "@psi/auth/hooks/usePagePermission";
import CoordinatorHome from "@psi/coordinatorStart/components/Home";
import PatientHome from "@psi/patientStart/components/Home";
import PsychologistHome from "@psi/psychologistStart/components/Home";
import LoadingPage from "@psi/shared/components/LoadingPage";
import { Role } from "@psi/shared/graphql";
import Container from "@psi/styleguide/components/Layout/Container";

const renderPageForUser = (role: Role) => {
  switch (role) {
    case Role.Patient:
      return <PatientHome />;
    case Role.Psychologist:
      return <PsychologistHome />;
    case Role.Coordinator:
      return <CoordinatorHome />;
    default:
      return <></>;
  }
};

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
        <Container>{renderPageForUser(user.role)}</Container>
      </>
    );
  }
};

export default Index;
