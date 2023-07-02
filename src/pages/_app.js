import "@/styles/globals.css";
import withAuth from "@/utils/protectedRoute";
import Head from "next/head";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const { pathname } = router;
  const ProtectedComponent = withAuth(Component);

  return (
    <>
      <Head>
        <title>HR Dashboard</title>
      </Head>
      {pathname === "/" || pathname === "/signup" ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedComponent {...pageProps} />
      )}
    </>
  );
};

export default App;
