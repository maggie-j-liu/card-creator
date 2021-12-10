import Link from "next/link";
import { supabase } from "../utils/supabaseClient";
import useAuth from "../utils/useAuth";

const Navbar = () => {
  const { user, loading } = useAuth();
  return (
    <nav className="h-16 bg-red-100 px-8">
      <div className="h-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <a>Card Creator</a>
          </Link>
          <Link href="/cards">
            <a>Create</a>
          </Link>
        </div>
        <div className="flex items-center">
          {!loading &&
            (user ? (
              <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
            ) : (
              <Link href="/sign-in">
                <a>Sign In</a>
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
