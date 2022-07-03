import Head from "next/head";
import MetaLinks from "./MetaLinks";

export default function GeneralHead({
  title,
  content = "miloupaw homepage. We are a pet care agency that provides a safe and loving environment for your pet.",
  description = "miloupaw is a pet care service agency. Our services are delivered by a team of highly qualified and experienced professionals. Your pet will receive specialized care through our services. What makes miloupaw so unique? Miloupaw does not operate in bulk like many other existing service providers. We treat each client as an individual with unique needs that require a customized care package. As a company, we do not handle bulk services or provide one-stop shopping. Our pet care agency provides a safe and loving environment for your pet. In our journey with you, we begin with a personal meet and greet. After meticulously examining your pet's needs, we prepare a custom care package for your pet. In other words, you won't have to worry about any nitty-gritty details.",
  image,
  url = `https://miloupaw.com/`,
}) {
  return (
    <Head>
      <meta
        name="apple-itunes-app"
        // content={`app-id=${process.env.APP_STORE_ID}`}
      />
      {/* facebook meta */}
      <meta property="og:locale" content="en_us" />
      <meta property="og:type" content="summary" />
      <meta property="og:site_name" content="dio" />
      <meta property="og:title" content="dio home" />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://miloupaw.com/images/logo.svg"
      />
      <meta property="og:url" content={url} />
      {/* additional facebook */}
      <meta property="og:image:alt" content={content} />

      {/* twitter meta */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@diosoftware" />
      <meta name="twitter:title" content="dio home" />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://miloupaw.com/images/logo.svg"
      />
      <meta name="twitter:image:alt" content="dio on the App Store" />

      {/* html */}
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <title>{title}</title>
      <MetaLinks />
    </Head>
  );
}
