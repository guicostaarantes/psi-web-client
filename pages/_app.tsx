import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import ToastContainer from "@psi/styleguide/components/Toast";
import useTheme from "@psi/styleguide/hooks/useTheme";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_PSI_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      pollInterval: 60000,
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  const { theme } = useTheme();

  return (
    <>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <ToastContainer />
      </ApolloProvider>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500&display=swap");

        html,
        body {
          /*background: url(${theme.backgroundUrl});
          background-attachment: fixed;
          background-size: cover;*/
          background-color: ${theme.backgroundColor};
          padding: 0;
          margin: 0;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
          font-family: Fira Sans, sans-serif;
        }
      `}</style>
    </>
  );
}
