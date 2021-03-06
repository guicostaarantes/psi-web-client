import Head from "next/head";
import { Container } from "react-grid-system";
import ResetPasswordComponent from "@psi/auth/components/ResetPassword";
import ViewportHigh from "@psi/styleguide/components/Layout/ViewportHigh";

const SetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>PSI web client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid>
        <ViewportHigh center>
          <ResetPasswordComponent />
        </ViewportHigh>
      </Container>
    </>
  );
};

export default SetPasswordPage;
