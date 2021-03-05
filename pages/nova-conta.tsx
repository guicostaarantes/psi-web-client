import Head from "next/head";
import NewAccountComponent from "@psi/auth/components/NewAccount";
import Cover from "@psi/styleguide/components/Cover";
import Col from "@psi/styleguide/components/Layout/Col";
import Container from "@psi/styleguide/components/Layout/Container";
import Row from "@psi/styleguide/components/Layout/Row";
import ViewportHigh from "@psi/styleguide/components/Layout/ViewportHigh";
import useTheme from "@psi/styleguide/hooks/useTheme";

const NewAccountPage = () => {
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>PSI web client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid>
        <Row>
          <Col style={{ padding: 0 }} xs={0} lg={8}>
            <Cover
              src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2578&q=80"
              label="Imagem de capa"
            />
          </Col>
          <Col
            style={{ backgroundColor: theme.backgroundColor }}
            xs={12}
            lg={4}
          >
            <ViewportHigh center>
              <NewAccountComponent />
            </ViewportHigh>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewAccountPage;