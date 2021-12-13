import Link from "next/link";
import Image from "next/image";
import Icon from "supercons";

const steps = [
  {
    icon: "welcome",
    title: "Create.",
    description: "Create a virtual holiday card for a special person you know."
  },
  {
    icon: "share",
    title: "Share.",
    description: "Share the virtual holiday card with other people would like to leave messages for the special person on the card."
  },
  {
    icon: "controls",
    title: "Customize.",
    description: "Customize the card to your liking by dragging everyone's messages to your own liking."
  },
  {
    icon: "like",
    title: "Gift.",
    description: "Gift your virtual card to the special person with some pizzazz."
  },
]

export default function Home() {
  return (
    <main>
      <div className="flex flex-col justify-center h-[50vh] pt-10 text-center bg-cover bg-gradient-to-r from-red-100 to-green-100">
        <h1 className="leading-loose">Card Creator</h1>
        <p className="text-xl lg:text-2xl">
          Spread the holiday cheer by sending a virtual holiday card filled with loved ones&#39; messages with Card
          Creator! 🎁
        </p>
        <Link href="/cards" passHref>
          <button className="w-40 mx-auto my-4">Get Started</button>
        </Link>
      </div>

      <section className="relative z-10 h-[50vh] max-w-5xl mx-6 md:mx-14 lg:mx-32 xl:mx-auto flex flex-col justify-center">
        <h2 className="leading-loose">How it works</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {steps.map((step) => {
              return (
                <div className="flex flex-row items-center space-x-4" key={step.title}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg shadow-lg bg-gradient-to-r from-red-200 to-red-400">
                    <Icon glyph={step.icon} size={32} color="white" />
                  </div>
                  <div className="w-9/12">
                    <p className="font-bold">{step.title}</p>
                    <p>{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
      </section>
    </main>
  );
}
