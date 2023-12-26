import { Metadata } from "next";
import { i18n } from "../../i18n-config";
import "../../styles/globals.css";
import localFont from "next/font/local";
import GeneralHead from "./components/heads/GeneralHead";

const vazirmatn = localFont({
  variable: "--font-vazirmatn",
  src: [
    {
      path: "../../fonts/Vazirmatn-RD-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../fonts/Vazirmatn-RD-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Vazirmatn-RD-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <>
      <GeneralHead title="MilouPaw - Professional Pet Care Services" />

      <html lang={params.lang} className={`${vazirmatn.variable} `}>
        <body className={`${params.lang === "fa" ? "font-farsi" : null}`}>
          {children}
        </body>
      </html>
    </>
  );
}

export const metadata: Metadata = {
  title: "MilouPaw - Professional Pet Care Services",
  description:
    "Discover personalized pet care with miloupaw - a unique pet service agency offering customized care packages. Experience dedicated, one-on-one attention for your pet's needs. Contact us for a special meet and greet!",
};
