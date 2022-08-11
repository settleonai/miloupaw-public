import React from "react";
import GeneralHead from "../../components/heads/GeneralHead";
import FooterComponent from "../../components/UI/FooterComponent";

export default function AppLinks() {
  return (
    <>
      <GeneralHead title={`miloupaw app links`} />
      <div className="h-screen flex flex-col justify-between mx-auto lg:px-8">
        <div className="py-12 pt-32 bg-white">
          <div className="flex flex-col lg:flex-row max-w-6xl mx-auto ">
            <div className="flex flex-col justify-center max-w-md mx-auto px-10">
              <h1 className=" font-semibold  font-display text-primary-default text-5xl text-left">
                App Links!
              </h1>
              <p className="mt-12 text-primary-400 font-light font-body text-lg text-left">
                Our app is available on following platforms:
              </p>

              <div className="flex justify-arund gap-3">
                <a
                  target="_blank"
                  href={process.env.APP_STORE_LINK}
                  rel="noreferrer"
                  className="mt-5"
                >
                  <img src="/app-store-badge.svg" alt="app-store-fnel" />
                </a>

                <a
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5"
                  href="https://play.google.com/store/apps/details?id=com.fnel.miloupaw&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                  // href={process.env.GOOGLE_STORE_LINK}
                >
                  <img
                    className="h-10"
                    alt="Get it on Google Play"
                    src="/en_badge_web_generic.svg"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent extraClassName={"md:-mt-16"} />
    </>
  );
}
