import Auth from "../components/Auth";
import { supabase } from "../utils/supabaseClient";
import useAuth from "../utils/useAuth";
export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      holiday card creator
      {user ? (
        <button
          className="block bg-white hover:bg-gray-50 px-4 py-2 text-gray-700 font-semibold rounded-lg shadow-md"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      ) : (
        <Auth />
      )}
      {user ? "Signed in as " + user.user_metadata.name : "Not signed in"}
    </div>
  );
}
