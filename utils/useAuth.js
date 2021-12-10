import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const initialState = { session: null, user: null, loading: true };
const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      setAuth({ user: session.user, session, loading: false });
    } else {
      setAuth({ ...initialState, loading: false });
    }
    return supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        if (!session.user.user_metadata.profile_added) {
          const username =
            session.user.user_metadata.name ||
            session.user.user_metadata.full_name ||
            session.user.email.split("@")[0];
          await supabase.from("profiles").insert(
            {
              id: session.user.id,
              username,
              avatar: session.user.user_metadata.avatar_url ?? null,
            },
            {
              returning: "minimal",
            }
          );
          const { user } = await supabase.auth.update({
            data: { profile_added: true, username },
          });
          session.user = user;
        }
        setAuth({ user: session.user, session, loading: false });
      } else {
        setAuth({ ...initialState, loading: false });
      }
    });
  }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
