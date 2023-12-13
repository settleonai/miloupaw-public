import Head from "next/head";
import MetaLinks from "./MetaLinks";

export default function GeneralHead({
  title,
  content = "miloupaw homepage. We are a pet care agency that provides a safe and loving environment for your pet.",
  description = "Discover personalized pet care with miloupaw - a unique pet service agency offering customized care packages. Experience dedicated, one-on-one attention for your pet's needs. Contact us for a special meet and greet!",
  image,
  url = `https://miloupaw.com/`,
}) {
  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "PetCare",
          name: "Miloupaw",
          url: "http://www.miloupaw.com/",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1700 N Broadway",
            addressLocality: "Walnut Creek",
            postalCode: "94596",
            addressRegion: "CA",
            addressCountry: "USA",
          },
          telephone: "(925) 771-0435",
        })}
      </script>
      {/* <meta
        name="apple-itunes-app"
        // content={`app-id=${process.env.APP_STORE_ID}`}
      /> */}
      {/* facebook meta */}
      <meta property="og:locale" content="en_us" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="miloupaw" />
      <meta
        property="og:title"
        content="MilouPaw - Professional Pet Care Services"
      />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://miloupaw.com/images/logo.svg"
      />
      <meta property="og:url" content={url} />
      {/* additional facebook */}
      <meta property="og:image:alt" content={content} />

      {/* twitter meta */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@diosoftware" />
      <meta
        name="twitter:title"
        content="MilouPaw - Professional Pet Care Services"
      />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://miloupaw.com/images/logo.svg"
      />

      {/* html */}
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <link rel="canonical" href="http://www.miloupaw.com/" />
      <title>{title}</title>
      <MetaLinks />
    </Head>
  );
}
