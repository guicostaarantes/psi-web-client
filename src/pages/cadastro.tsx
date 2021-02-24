import Head from "next/head";
import { Col, Container, Row } from "react-grid-system";
import ResetPasswordComponent from "@src/components/ResetPassword";
import useTheme from "@src/hooks/useTheme";
import Cover from "@src/styleguide/Cover";
import ViewportHigh from "@src/styleguide/Layout/ViewportHigh";
import MainTitle from "@src/styleguide/Typography/MainTitle";

const SetPasswordPage = () => {
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
          <Col style={{ backgroundColor: theme.primaryColor }} xs={12} lg={4}>
            <ViewportHigh center>
              <MainTitle>Defina sua nova senha</MainTitle>
              <ResetPasswordComponent />
            </ViewportHigh>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SetPasswordPage;
