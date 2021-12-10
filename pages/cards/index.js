import { useEffect, useState } from "react";
import useAuth from "../../utils/useAuth";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";
import Link from "next/link";

const Cards = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/sign-in");
      return;
    }
    const getCards = async () => {
      const { data } = await supabase
        .from("cards")
        .select("id,title")
        .eq("creator", user.id);
      setCards(data);
    };
    getCards();
  }, [user, loading]);
  const createCard = async () => {
    const { data } = await supabase.from("cards").insert({
      creator: user.id,
    });
    console.log(data);
    router.push(`/cards/${data[0].id}`);
  };
  return (
    <div>
      <h1>create a card</h1>
      <button type="button" onClick={() => createCard()}>
        Create
      </button>
      <h2>your cards</h2>
      {cards.map((card) => (
        <div key={card.id}>
          <Link href={`/cards/${card.id}`}>
            <a>
              {card.id} / {card.title}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
