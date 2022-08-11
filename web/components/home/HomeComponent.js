import Image from "next/image";
import React from "react";

export default function HomeComponent() {
  return (
    <div id="home" className="bg-secondary-100 pt-36">
      <div className="flex flex-row max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:block max-w-lg mx-auto ">
          <Image
            src="/images/header-dog-cat.png"
            alt="homepage header"
            width={600}
            height={748}
            className=""
          />
        </div>
        <div className="flex flex-col justify-center max-w-md mx-auto">
          <h1 className=" font-semibold  font-display text-primary-default text-5xl text-left">
            Your Pet Will be Loved Like a Family
          </h1>
          <p className="mt-12 text-primary-400 font-light font-body text-lg text-left">
            We are a pet care agency that provides a safe and loving environment
            for your pet.
          </p>
          <a
            href="#services"
            className="mt-9 bg-primary-default w-60 text-secondary-default font-bold font-body text-lg py-2 px-4 rounded-lg self-end text-center"
          >
            check our services
          </a>
          <h3 className="mt-12 font-display text-primary-default text-lg text-left">
            start using our app
          </h3>
          {/* app links */}
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

      <img src="/images/wave.svg" width="100%" height="100%" />
    </div>
  );
}
