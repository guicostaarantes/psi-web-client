import Head from "next/head";

import usePagePermission from "@psi/auth/hooks/usePagePermission";
import LoadingPage from "@psi/shared/components/LoadingPage";

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
        <span>Página inicial</span>
      </>
    );
  }
};

export default Index;
