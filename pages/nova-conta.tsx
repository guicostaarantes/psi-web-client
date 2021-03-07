import Head from "next/head";
import NewAccountComponent from "@psi/auth/components/NewAccount";
import Container from "@psi/styleguide/components/Layout/Container";
import ViewportHigh from "@psi/styleguide/components/Layout/ViewportHigh";

const NewAccountPage = () => {
  return (
    <>
      <Head>
        <title>Nova conta | PSI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid>
        <ViewportHigh center>
          <NewAccountComponent />
        </ViewportHigh>
      </Container>
    </>
  );
};

export default NewAccountPage;
