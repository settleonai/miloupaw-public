import Head from "next/head";
import Navbar from "../components/UI/Navbar";
import HomeComponent from "../components/home/HomeComponent";
import ServiceSummaryComponent from "../components/services/ServiceSummaryComponent";
import FaqSummaryComponent from "../components/faq/FaqSummaryComponent";
import GallerySummaryComponent from "../components/gallery/GallerySummaryComponent";
import ReviewSummaryComponent from "../components/reviews/ReviewSummaryComponent";
import ContactSummaryComponent from "../components/contact/ContactSummaryComponent";
import FooterComponent from "../components/UI/FooterComponent";

export default function Home() {
  return (
    <div>
      <Head>
        <title>miloupaw</title>
        <meta name="description" content="personalized pet care services" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5ab2ca" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Navbar />
      <HomeComponent />
      <ServiceSummaryComponent />
      <FaqSummaryComponent />
      <GallerySummaryComponent />
      <ReviewSummaryComponent />
      <ContactSummaryComponent />
      <FooterComponent />
    </div>
  );
}
