import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import FaqSummaryComponent from "./components/faq/FaqSummaryComponent";
import GallerySummaryComponent from "./components/gallery/GallerySummaryComponent";
import HomeComponent from "./components/home/HomeComponent";
import ServiceSummaryComponent from "./components/services/ServiceSummaryComponent";
import ReviewSummaryComponent from "./components/reviews/ReviewSummaryComponent";
// import LocaleSwitcher from "./components/locale-switcher";
// import GeneralHead from "./components/heads/GeneralHead";
import Navbar from "./components/UI/Navbar";
import ContactSummaryComponent from "./components/contact/ContactSummaryComponent";
import FooterComponent from "./components/UI/FooterComponent";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <main>
      <Navbar dictionary={dictionary} currentLocale={lang} />
      <HomeComponent dictionary={dictionary} lang={lang} />
      <ServiceSummaryComponent dictionary={dictionary} lang={lang} />
      <FaqSummaryComponent dictionary={dictionary} lang={lang} />
      <GallerySummaryComponent dictionary={dictionary} lang={lang} />
      <ReviewSummaryComponent dictionary={dictionary} lang={lang} />
      <ContactSummaryComponent dictionary={dictionary} lang={lang} />
      <FooterComponent dictionary={dictionary} language={lang} />
    </main>
  );
}
