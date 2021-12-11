import { useEffect, useState } from "react";
import useAuth from "../../utils/useAuth";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";
import Link from "next/link";
import Tilt from "../../components/Tilt";

const Cards = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(true);
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
      setCardsLoading(false);
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
    <div className="flex justify-center">
      <main className="w-9/12 min-h-screen pt-10 space-y-5">
        <h1>Your Cards</h1>
        <button type="button" onClick={() => createCard()}>
          Create a New Card
        </button>
        {cardsLoading ? (
          <section className="grid gap-5 md:grid-cols-2 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div
                className="p-5 text-gray-100 bg-gray-100 rounded-lg cursor-default"
                key={i}
              >
                Loading...
              </div>
            ))}
          </section>
        ) : (
          <section className="grid gap-5 md:grid-cols-2">
            {cards.map((card) => (
              <div key={card.id} className="h-max">
                <Link href={`/cards/${card.id}`} passHref>
                  <Tilt>
                    <div className="p-5 transition-shadow rounded-lg shadow-lg cursor-pointer hover:shadow-3xl border-red-300 border-2">
                      <h2>{card.title}</h2>
                      <p className="font-mono">{card.id}</p>
                      {console.info(card)}
                    </div>
                  </Tilt>
                </Link>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default Cards;
