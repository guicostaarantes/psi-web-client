import Head from "next/head";
import { useRouter } from "next/router";

import usePagePermission from "@psi/auth/hooks/usePagePermission";
import LoadingPage from "@psi/shared/components/LoadingPage";
import NotFoundPage from "@psi/shared/components/NotFoundPage";
import Container from "@psi/styleguide/components/Layout/Container";

const PsychologistProfilePage = () => {
  const { pageStatus } = usePagePermission({
    requiresAuth: true,
  });

  const router = useRouter();
  const { psyId } = router.query;

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
        <Container>{psyId}</Container>
      </>
    );
  }
};

export default PsychologistProfilePage;
