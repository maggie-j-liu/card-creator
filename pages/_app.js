import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { AuthProvider } from "../utils/useAuth";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.info(router, router.pathname.includes("/gift"))

  return (
    <AuthProvider>
      <Meta />
      {!(router.pathname.includes("/gift")) && <Navbar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
