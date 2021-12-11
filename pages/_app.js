import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { AuthProvider } from "../utils/useAuth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Meta />
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
