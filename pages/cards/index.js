import { useEffect } from "react";
import useAuth from "../../utils/useAuth";
import { useRouter } from "next/router";

const Cards = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading]);
  return <div>create a card</div>;
};

export default Cards;
