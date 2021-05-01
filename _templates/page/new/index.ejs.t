---
to: pages/<%= h.changeCase.paramCase(name) %>.tsx
---
import Head from "next/head";

import Container from "@psi/styleguide/components/Layout/Container";

const <%= h.changeCase.pascal(name) %>Page = () => {
  return (
    <>
      <Head>
        <title><%= h.changeCase.title(name) %> | PSI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div>Hi, I am the <%= h.changeCase.pascal(name) %> page.</div>
      </Container>
    </>
  );
};

export default <%= h.changeCase.pascal(name) %>Page;
