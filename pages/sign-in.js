import { useRouter } from "next/router";
import { useEffect } from "react";
import Auth from "../components/Auth";
import useAuth from "../utils/useAuth";
export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  if (user) return null;
  return <Auth />;
}
