import { supabase } from "../../utils/supabaseClient";
import { useState, useEffect } from "react";
import useAuth from "../../utils/useAuth";
import { useRouter } from "next/router";

const Card = ({
  id,
  creator,
  title: initialTitle,
  messages: initialMessages,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
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
  return (
    <div>
      <label>
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
        className="absolute bottom-4 right-4 bg-red-200 px-3 py-1 rounded-md"
        onClick={() => save()}
        disabled={saving}
      >
        Save
      </button>
    </div>
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
