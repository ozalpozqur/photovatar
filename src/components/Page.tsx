import Head from "next/head";

const url = process.env.NEXT_PUBLIC_FRONTEND_URL;
if (!url) {
  throw new Error("NEXT_PUBLIC_FRONTEND_URL is not defined");
}

const defaults = {
  title: "AI Powered Avatar Generator - Photovatar",
  description:
    "Integrated with CodeFormer, and modnet AI models to increase quality and remove the background of any image to create custom avatars on the fly.",
  ogImage: `${url}/photovatar.png`,
  twitterImage: `${url}/photovatar.png`,
  twitterImageAlt:
    "Integrated with CodeFormer, and modnet AI models to increase quality and remove the background of any image to create custom avatars on the fly.",
  ogURL: url,
  canonical: url,
  keywords: "Avatar, Codeformer, Modnet, AI",
};

export default function Page({
  children,
  title,
  canonical,
  ogImage,
  twitterImage,
  description,
  twitterImageAlt,
  keywords,
  ogURL,
}: Props) {
  return (
    <>
      <Head>
        <title>{title ?? defaults.title}</title>
        <meta property="og:type" content="website" />
        <meta name="author" content="Altogic" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonical ?? defaults.canonical} />
        <meta name="twitter:title" content={title ?? defaults.title} />
        <meta name="og:title" content={title ?? defaults.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description ?? defaults.description} />
        <meta name="keywords" content={keywords ?? defaults.keywords} />
        <meta name="twitter:description" content={description ?? defaults.description} />
        <meta name="og:description" content={description ?? defaults.description} />
        <meta property="og:image" content={ogImage ?? defaults.ogImage} />
        <meta property="twitter:image" content={twitterImage ?? defaults.twitterImage} />
        <meta property="twitter:image:alt" content={twitterImageAlt ?? defaults.twitterImageAlt} />
        <meta property="og:url" content={ogURL ?? defaults.ogURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@photovatar" />
        <meta name="theme-color" content="#2463eb" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#21222c" />
        <meta itemProp="name" content={title ?? defaults.title} />
        <meta itemProp="description" content={description ?? defaults.description} />
        <meta itemProp="url" content={url} />
        <meta itemProp="logo" content="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta itemProp="sameAs" content="https://twitter.com/photovatar" />
      </Head>
      {children}
    </>
  );
}

type Props = {
  children?: JSX.Element | JSX.Element[];
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  keywords?: string;
  ogURL?: string;
};
