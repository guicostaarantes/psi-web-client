import Head from "next/head";
import Button from "styleguide/Button";
import Card from "styleguide/Card";
import Cover from "styleguide/Cover";
import Input from "styleguide/Input";
import Col from "styleguide/Layout/Col";
import Container from "styleguide/Layout/Container";
import Row from "styleguide/Layout/Row";
import ViewportHigh from "styleguide/Layout/ViewportHigh";
import themeState from "styleguide/Theme";
import MainTitle from "styleguide/Typography/MainTitle";
import { useState } from "@hookstate/core";

const Login = () => {
  const theme = useState(themeState);

  return (
    <>
      <Head>
        <title>PSI web client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid>
        <Row>
          <Col
            style={{ backgroundColor: theme.get().primaryColor }}
            xs={12}
            lg={4}
          >
            <ViewportHigh center>
              <MainTitle>Oi, bem-vindo ao PSI</MainTitle>
              <Card style={{ width: "100%", maxWidth: 440 }}>
                <Input name="email" label="Email" />
                <Input name="password" label="Senha" type="password" />
                <Button block color="primary">
                  Entrar
                </Button>
                <Button block color="secondary">
                  Criar minha conta
                </Button>
              </Card>
            </ViewportHigh>
          </Col>
          <Col style={{ padding: 0 }} xs={0} lg={8}>
            <Cover src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2578&q=80" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
