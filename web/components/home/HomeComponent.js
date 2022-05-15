import Image from "next/image";
import React from "react";

export default function HomeComponent() {
  return (
    <div id="home" className="bg-secondary-100 pt-36">
      <div className="flex flex-row max-w-6xl mx-auto ">
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
            We are a pet adoption agency that provides a safe and loving
            environment for your pet.
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
          <a
            target="_blank"
            href={process.env.APP_STORE_LINK}
            rel="noreferrer"
            className="mt-5"
          >
            <img src="/app-store-badge.svg" alt="app-store-fnel" />
          </a>
        </div>
      </div>

      <img src="/images/wave.svg" width="100%" height="100%" />
    </div>
  );
}
