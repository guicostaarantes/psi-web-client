import Head from "next/head";

import usePagePermission from "@psi/auth/hooks/usePagePermission";
import PsychologistDataComponent from "@psi/profiles/components/PsychologistData";
import LoadingPage from "@psi/shared/components/LoadingPage";
import NotFoundPage from "@psi/shared/components/NotFoundPage";
import { Role } from "@psi/shared/graphql";
import Container from "@psi/styleguide/components/Layout/Container";

const Psychologist = () => {
  const { pageStatus } = usePagePermission({
    requiresAuth: true,
    requiresRole: [Role.Coordinator, Role.Psychologist],
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
          <title>Perfil do psicólogo | PSI</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <PsychologistDataComponent />
        </Container>
      </>
    );
  }
};

export default Psychologist;
