import Head from "next/head";

import ResetPasswordComponent from "@psi/auth/components/ResetPassword";
import Container from "@psi/styleguide/components/Layout/Container";
import ViewportHigh from "@psi/styleguide/components/Layout/ViewportHigh";

const SetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Cadastro | PSI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <ViewportHigh center>
          <ResetPasswordComponent />
        </ViewportHigh>
      </Container>
    </>
  );
};

export default SetPasswordPage;
