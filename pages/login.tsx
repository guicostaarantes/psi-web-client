import Head from "next/head";

import LoginComponent from "@psi/auth/components/Login";
import usePagePermission from "@psi/auth/hooks/usePagePermission";
import Container from "@psi/styleguide/components/Layout/Container";
import ViewportHigh from "@psi/styleguide/components/Layout/ViewportHigh";

const LoginPage = () => {
  usePagePermission({
    requiresAuth: false,
  });

  return (
    <>
      <Head>
        <title>PSI web client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <ViewportHigh center>
          <LoginComponent />
        </ViewportHigh>
      </Container>
    </>
  );
};

export default LoginPage;
