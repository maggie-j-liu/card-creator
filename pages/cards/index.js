import { useEffect } from "react";
import useAuth from "../../utils/useAuth";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";

const Cards = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/sign-in");
    }
  }, [user, loading]);
  const createCard = async () => {
    const { data } = await supabase.from("cards").insert({
      creator: user.id,
    });
    console.log(data);
    router.push(`/cards/${data.id}`);
  };
  return (
    <div>
      create a card
      <button type="button" onClick={() => createCard()}>
        Create
      </button>
    </div>
  );
};

export default Cards;
