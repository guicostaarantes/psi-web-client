import { useRouter } from "next/router";
import { useEffect } from "react";
import themeState from "styleguide/Theme";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500&display=swap");

        html,
        body {
          padding: 0;
          margin: 0;
          background-color: ${themeState.get().backgroundColor};
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
