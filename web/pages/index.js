import Head from "next/head";
import Navbar from "../components/UI/Navbar";
import HomeComponent from "../components/home/HomeComponent";
import ServiceSummaryComponent from "../components/services/ServiceSummaryComponent";
import FaqSummaryComponent from "../components/faq/FaqSummaryComponent";
import GallerySummaryComponent from "../components/gallery/GallerySummaryComponent";
import ReviewSummaryComponent from "../components/reviews/ReviewSummaryComponent";
import ContactSummaryComponent from "../components/contact/ContactSummaryComponent";
import FooterComponent from "../components/UI/FooterComponent";
import GeneralHead from "../components/heads/GeneralHead";

export default function Home() {
  return (
    <div>
      <GeneralHead title={`miloupaw`} />
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
