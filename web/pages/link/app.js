import React from "react";
import FooterComponent from "../../components/UI/FooterComponent";

export default function AppLinks() {
  return (
    <>
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
        </div>
      </div>
      <FooterComponent extraClassName={"md:-mt-16"} />
    </>
  );
}
