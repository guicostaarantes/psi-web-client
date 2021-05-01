import Head from "next/head";

import Container from "@psi/styleguide/components/Layout/Container";
import ViewportHigh from "@psi/styleguide/components/Layout/ViewportHigh";
import CircleSpinner from "@psi/styleguide/components/Spinner";

const LoadingPage = () => {
  return (
    <>
      <Head>
        <title>PSI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid>
        <ViewportHigh center>
          <CircleSpinner size="3rem" />
        </ViewportHigh>
      </Container>
    </>
  );
};

export default LoadingPage;
