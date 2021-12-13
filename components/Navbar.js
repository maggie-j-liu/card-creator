import Link from "next/link";
import Image from "next/image";
import { supabase } from "../utils/supabaseClient";
import useAuth from "../utils/useAuth";
import Avatar from "boring-avatars";
import Icon from "supercons";

const Navbar = () => {
  const { user, loading } = useAuth();
  return (
    <nav className="h-16 px-8 bg-red-100">
      <div className="flex items-center justify-between h-full max-w-5xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" passHref>
            <Image
              src="/icon.png"
              alt="Mail with colorful lights."
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </Link>
          <Link href="/cards">
            <a>Cards</a>
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
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="flex flex-row"
                >
                  Sign out&nbsp;
                  <Icon glyph="door-leave" size={25} color="black" />
                </button>
              </>
            ) : (
              <Link href="/sign-in" passHref>
                <button className="flex flex-row">
                  Sign In{" "}
                  <Icon
                    glyph="door-enter"
                    size={25}
                    color="black"
                    className="ml-2"
                  />
                </button>
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
