import { supabase } from "../../utils/supabaseClient";
import Tilt from "../../components/Tilt";
import Link from "next/link";

const Gift = ({ id, creator, title: initialTitle, messages: initialMessages }) => {

    const creators = [creator.username]
    initialMessages.forEach(message => {
        const creator = message.creator.username;
        !(creators.includes(creator)) && creators.push(creator)
    });

    return (
        <div className="flex items-center justify-center">
            <main className="flex flex-col items-center justify-center w-screen h-screen space-y-10 bg-red-200">
                <section className="space-y-2 text-center">
                    <h1>You have a card!</h1>
                    <p className="text-xl lg:text-2xl">Tap the card to open it.</p>
                </section>
                <Tilt>
                    <Link href={`/cards/${id}?gift=true`} passHref>
                        <div className="w-3/4 p-10 bg-white rounded-lg shadow-xl cursor-pointer h-1/3 md:h-1/2 lg:w-1/2 lg:h-1/2">
                            <h2>{initialTitle}</h2>
                            <p className="text-xl lg:text-2xl">
                                Created by {creators.map((creator, index) => {
                                    if (index === creators.length - 2) {
                                        return creator + " and "
                                    } else if (index === creators.length - 1) {
                                        return creator
                                    }
                                    return (
                                        creator + ", "
                                    )
                                })}
                            </p>
                        </div>
                    </Link>
                </Tilt>
            </main>
        </div>
    )
}

export default Gift

export const getServerSideProps = async ({ params }) => {
  const { data } = await supabase
    .from("cards")
    .select(
      `
      title,
      creator (
        id,
        username,
        avatar
      )
      `
    )
    .eq("id", params.id)
    .single();
  const { data: messageData } = await supabase
    .from("messages")
    .select(
      `
      message,
      id,
      creator (
        username,
        avatar
      )
      `
    )
    .eq("card", params.id);
  if (!data) {
    return {
      redirect: {
        permanent: false,
        destination: "/cards",
      },
    };
  }
  return {
    props: {
      id: params.id,
      ...data,
      messages: messageData,
    },
  };
};
