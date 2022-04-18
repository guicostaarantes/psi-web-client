import Head from "next/head";

import AskResetPasswordComponent from "@psi/auth/components/AskResetPassword";
import Container from "@psi/styleguide/components/Layout/Container";
import ViewportHigh from "@psi/styleguide/components/Layout/ViewportHigh";

const AskResetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Redefinir senha | PSI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <ViewportHigh center>
          <AskResetPasswordComponent />
        </ViewportHigh>
      </Container>
    </>
  );
};

export default AskResetPasswordPage;
