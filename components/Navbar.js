import Link from "next/link";
import Image from "next/image";
import { supabase } from "../utils/supabaseClient";
import useAuth from "../utils/useAuth";
import Avatar from "boring-avatars";

const Navbar = () => {
  const { user, loading } = useAuth();
  return (
    <nav className="h-16 px-8 bg-red-100">
      <div className="flex items-center justify-between h-full max-w-5xl mx-auto">
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
              <>
                {user.user_metadata.avatar_url ? (
                  <div className="relative w-8 h-8 mr-2">
                    <Image
                    className="rounded-full"
                      src={user.user_metadata.avatar_url}
                      alt="Profile picture"
                      layout="fill"
                    />
                  </div>
                ) : (
                  <Avatar
                    variant="marble"
                    name={user.user_metadata.username}
                    size={32}
                  />
                )}
                <div>{user.user_metadata.username}</div>
                <span className="mx-2">&bull;</span>
                <button onClick={() => supabase.auth.signOut()}>
                  Sign Out
                </button>
              </>
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
