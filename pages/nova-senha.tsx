import Head from "next/head";
import { Container } from "react-grid-system";
import ResetPasswordComponent from "@psi/auth/components/ResetPassword";
import ViewportHigh from "@psi/styleguide/components/Layout/ViewportHigh";

const ResetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Nova senha | PSI</title>
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

export default ResetPasswordPage;
