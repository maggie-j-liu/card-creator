import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-5xl mx-6 md:mx-14 lg:mx-32 xl:mx-auto">
      <h1 className="leading-loose">Welcome to hi!</h1>
      <h2 className="leading-loose">Recent</h2>
      {cards ? (
        <div>
          <p></p>
        </div>
      ) : (
        <p>
          No recent cards. Create a{" "}
          <Link href="/create" passHref>
            <a className="hover:underline text-red-400">new one</a>
          </Link>
          ?
        </p>
      )}
    </main>
  );
}
