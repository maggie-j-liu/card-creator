import { supabase } from "../../utils/supabaseClient";
import { useState, useEffect } from "react";
import useAuth from "../../utils/useAuth";
import { useRouter } from "next/router";

const AddPrompt = ({setSaving, id, user, setAddMessage}) => {
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
  }
  return (
    <section className="fixed top-0 flex items-center justify-center w-screen h-screen bg-white bg-opacity-40" onClick={() => destroySelf()} id="add">
      <div className="w-9/12 p-10 space-y-5 bg-white rounded-lg shadow-lg h-3/4 top-1/2">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold lg:text-5xl">Add a message</h1>
          <p className="text-lg lg:text-2xl">Drop off your own message to add onto this card.</p>
        </section>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-lg h-1/2"
        />
        <button onClick={() => addMessage()} className="px-3 py-1 bg-red-200 rounded-md">Add message</button>
      </div>
    </section>
  )
}

const Card = ({
  id,
  creator,
  title: initialTitle,
  messages: initialMessages,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [messages, setMessages] = useState(initialMessages);
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
      <main className="w-9/12 min-h-screen p-16 space-y-10 shadow-2xl mt-44 rounded-2xl">
        <section className="flex flex-col space-y-5 lg:flex-row lg:items-center lg:space-y-0">
          <section className="flex-grow space-y-2">
            <input type={"text"} value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-4xl font-bold lg:text-6xl"/>
            <p className="text-lg lg:text-2xl">by {creator}</p>
          </section>
          <button type="button" className="px-3 py-1 bg-red-200 rounded-md h-fit" onClick={() => setAddMessage(true)}>Add a message</button>
          <button
            className="fixed px-3 py-1 bg-red-200 rounded-md bottom-10 right-10"
            onClick={() => save()}
            disabled={saving}
          >
            Save
          </button>
        </section>
        <section className="space-y-5">
          {messages.map((m, i) => (
            <div key={i}>
              <p className="text-sm">{m.creator}</p>
              <p className="text-xl lg:text-2xl">{m.message}</p>
            </div>
          ))}
        </section>
      </main>
      {/* <label>
        <p>Title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      id: {id}, creator: {creator}, title: {title}
      <br />
      messages
      <label>
        <p>New Message</p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button onClick={() => addMessage()}>Add message</button>
      {messages.map((m, i) => (
        <div key={i}>
          {m.message} by {m.creator}
        </div>
      ))}
      <button
        className="absolute px-3 py-1 bg-red-200 rounded-md bottom-4 right-4"
        onClick={() => save()}
        disabled={saving}
      >
        Save
      </button> */}
    </div>
    { addMessage ? <AddPrompt setSaving={setSaving} id={id} user={user} setAddMessage={setAddMessage} /> : null }
    </>
  );
};

export default Card;

export const getServerSideProps = async ({ params }) => {
  const { data } = await supabase
    .from("cards")
    .select("creator,title")
    .eq("id", params.id)
    .single();
  const { data: messageData } = await supabase
    .from("messages")
    .select("creator,message")
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
