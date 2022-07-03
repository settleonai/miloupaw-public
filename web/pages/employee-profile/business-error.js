import Image from "next/image";
import React from "react";
import GeneralHead from "../../components/heads/GeneralHead";
import FooterComponent from "../../components/UI/FooterComponent";

export default function BusinessError() {
  return (
    <>
      <GeneralHead title={`error in setup`} />
      <div className="h-screen flex flex-col justify-between mx-auto lg:px-8">
        <div className="py-12 pt-32 bg-white">
          <div className="flex flex-col lg:flex-row max-w-6xl mx-auto ">
            <div className="mx-auto w-96 h-96 relative">
              <Image
                src="/images/login.jpg"
                alt="homepage header"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col justify-center max-w-md mx-auto px-10">
              <h1 className=" font-semibold  font-display text-primary-default text-5xl text-left">
                Error!
              </h1>
              <p className="mt-12 text-primary-400 font-light font-body text-lg text-left">
                There was an error processing your request. Please reopen the
                app try again.
              </p>

              <a
                target="_blank"
                href="miloupaw://profile/business"
                rel="noreferrer"
                className="mt-9 bg-primary-default w-60 text-secondary-default font-bold font-body text-lg py-2 px-4 rounded-lg self-center md:self-end text-center"
              >
                Go to app
              </a>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent extraClassName={"md:-mt-16"} />
    </>
  );
}
