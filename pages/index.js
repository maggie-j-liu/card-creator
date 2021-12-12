import Link from "next/link";
import Image from "next/image";
import Icon from "supercons";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col justify-center text-center pt-10 bg-cover bg-gradient-to-r from-red-100 to-green-100 h-64">
        <h1 className="leading-loose">Card Creator</h1>
        <p>
          Spread the holiday cheer by sending a virtual holiday card with Card
          Creator idk. 🎁
        </p>
        <Link href="/cards" passHref>
          <button className="w-40 mx-auto my-4">Get Started</button>
        </Link>
      </div>

      <div className="max-w-5xl mx-6 md:mx-14 lg:mx-32 xl:mx-auto relative z-10">
        <div>
          <h2 className="leading-loose pt-5">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-row space-x-4">
              <div className="h-10 w-10 bg-gradient-to-r from-red-200 to-red-400 flex justify-center items-center rounded-lg shadow-lg">
                <Icon glyph="welcome" size={32} color="white" />
              </div>
              <div>
                <p className="font-bold">Create.</p>
                <p>Create a shareable, digital holiday card!</p>
              </div>
            </div>
            <div>thing one </div>
            <div>thing one </div>
            <div>Celebrate the holidays!</div>
          </div>
        </div>
      </div>
    </main>
  );
}
