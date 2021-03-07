import Head from "next/head";
import { useRouter } from "next/router";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Container from "@psi/styleguide/components/Layout/Container";
import ViewportHigh from "@psi/styleguide/components/Layout/ViewportHigh";
import MainTitle from "@psi/styleguide/components/Typography/MainTitle";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Página não encontrada | PSI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid>
        <ViewportHigh center>
          <Card>
            <MainTitle center>Página não encontrada</MainTitle>
            <Paragraph>
              Não conseguimos encontrar a página que você está procurando.
            </Paragraph>
            <Button block color="primary" onClick={() => router.push("/")}>
              Ir para a página inicial
            </Button>
          </Card>
        </ViewportHigh>
      </Container>
    </>
  );
};

export default NotFoundPage;
