import useTheme from "styleguide/Theme";
import { ToastContainer } from "styleguide/Toast";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/gql",
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }) {
  const { theme, changeTheme } = useTheme();

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
