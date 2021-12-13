import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { AuthProvider } from "../utils/useAuth";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { gift } = router.query;

  return (
    <AuthProvider>
      <Meta />
      {!gift && !(router.pathname.includes("/gift")) && <Navbar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
