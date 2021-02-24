import {
  ApolloClient, ApolloProvider, createHttpLink, InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import useTheme from "@src/styleguide/Theme";
import ToastContainer from "@src/styleguide/Toast";

const httpLink = createHttpLink({
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
          padding: 0;
          margin: 0;
          background-color: ${theme.backgroundColor};
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
