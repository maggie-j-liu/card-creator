import { supabase } from "../../utils/supabaseClient";

const Card = ({ id, creator }) => {
  return (
    <div>
      id: {id}, creator: {creator}
    </div>
  );
};

export default Card;

export const getServerSideProps = async ({ params }) => {
  const { data } = await supabase
    .from("cards")
    .select("creator")
    .eq("id", params.id)
    .single();
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
      creator: data.creator,
    },
  };
};
