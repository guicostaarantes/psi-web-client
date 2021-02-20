import NewAccountComponent from "components/NewAccount";
import Head from "next/head";
import Cover from "styleguide/Cover";
import Col from "styleguide/Layout/Col";
import Container from "styleguide/Layout/Container";
import Row from "styleguide/Layout/Row";
import ViewportHigh from "styleguide/Layout/ViewportHigh";
import useTheme from "styleguide/Theme";

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
            <Cover src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2578&q=80" />
          </Col>
          <Col style={{ backgroundColor: theme.primaryColor }} xs={12} lg={4}>
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
