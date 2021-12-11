import Link from "next/link";

export default function Home() {
  const cards = false;
  return (
    <main className="max-w-5xl mx-6 md:mx-14 lg:mx-32 xl:mx-auto">
      <h1 className="leading-loose">Welcome to -!</h1>
      {cards ? (
        <div>
          <h2 className="leading-loose">Recent</h2>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
