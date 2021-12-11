import Head from "next/head";

export default function Meta() {
  const title = "card creator ✨";
  const description = "Create and share digital holiday cards! 🎄";
  const searchBarColor = "#fed7d7"; // Safari 15 Search Bar Color in Light Mode
  const darkSearchBarColor = "#4a5568"; // Safari 15 Search Bar Color in Dark Mode (optional)
  const keywords = "supabase, holiday, card";
  const url = "https://lol.idk";
  const image = "/ogimage.png";
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta
        name="theme-color"
        content={searchBarColor}
        media="(prefers-color-scheme: light)"
      />
      <meta
        name="theme-color"
        content={darkSearchBarColor}
        media="(prefers-color-scheme: dark)"
      />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
