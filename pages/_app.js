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
      {(!(router.pathname.includes("/gift")) || !gift) && <Navbar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
