import { supabase } from "../../utils/supabaseClient";
import { useState, useEffect } from "react";
import useAuth from "../../utils/useAuth";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";

const AddPrompt = ({ setSaving, id, user, setAddMessage }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const addMessage = async () => {
    setSaving(true);
    await supabase.from("messages").insert(
      {
        card: id,
        creator: user.id,
        message,
      },
      { returning: "minimal" }
    );
    setSaving(false);
    router.replace(router.asPath);
  };
  const destroySelf = () => {
    setAddMessage(false);
  };
  return (
    <section
      className="fixed top-0 flex items-center justify-center w-screen h-screen bg-white bg-opacity-40"
      onClick={() => destroySelf()}
      id="add"
    >
      <div
        className="w-9/12 p-10 space-y-5 bg-white rounded-lg shadow-lg h-3/4 top-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="space-y-2">
          <h1>Add a message</h1>
          <p className="text-lg lg:text-2xl">
            Drop off your own message to add onto this card.
          </p>
        </section>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-lg h-1/2"
        />
        <button onClick={() => addMessage()}>Add message</button>
      </div>
    </section>
  );
};

const Card = ({
  id,
  creator,
  title: initialTitle,
  messages: initialMessages,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [saving, setSaving] = useState(false);
  const [addMessage, setAddMessage] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/sign-in");
      return;
    }
  }, [user, loading]);
  const save = async () => {
    setSaving(true);
    await supabase.from("cards").update({ title }).match({ id });
    setSaving(false);
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <main className="w-9/12 min-h-screen p-16 my-32 space-y-10 shadow-2xl rounded-2xl">
          <section className="flex flex-col space-y-5 lg:flex-row lg:items-center lg:space-y-0">
            <section className="flex-grow space-y-2">
              <input
                type={"text"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-4xl font-bold lg:text-6xl"
              />
              <p className="flex items-center gap-2 text-lg lg:text-2xl">
                by <img className="w-8 h-8 rounded-full" src={creator.avatar} />{" "}
                {creator.username}
              </p>
            </section>
            <button
              type="button"
              className="h-fit"
              onClick={() => setAddMessage(true)}
            >
              Add a message
            </button>
            <button
              className="fixed bottom-10 right-10"
              onClick={() => save()}
              disabled={saving}
            >
              Save
            </button>
          </section>
          <section className="space-y-5">
            {initialMessages.map((m) => (
              <div key={m.id}>
                <Tippy
                  placement={"right"}
                  className="px-8 py-4 shadow-lg bg-gray-50 w-72"
                  content={
                    <div>
                      <p className="text-xl lg:text-2xl">{m.message}</p>
                    </div>
                  }
                >
                  <button>
                    <p className="text-sm">
                      <img
                        className="w-16 h-16 rounded-full"
                        src={m.creator.avatar}
                      />
                      {m.creator.username}
                    </p>
                  </button>
                </Tippy>
              </div>
            ))}
          </section>
        </main>
      </div>
      {addMessage ? (
        <AddPrompt
          setSaving={setSaving}
          id={id}
          user={user}
          setAddMessage={setAddMessage}
        />
      ) : null}
    </>
  );
};

export default Card;

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
