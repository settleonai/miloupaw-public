import Image from "next/image";
import React from "react";

export default function BusinessError() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className='className="py-12 pt-32 bg-white'>
        <div className="flex flex-row max-w-6xl mx-auto ">
          <div className="hidden md:block max-w-lg mx-auto ">
            <Image
              src="/images/login.jpg"
              alt="homepage header"
              width={600}
              height={748}
              className=""
            />
          </div>
          <div className="flex flex-col justify-center max-w-md mx-auto">
            <h1 className=" font-semibold  font-display text-primary-default text-5xl text-left">
              Error!
            </h1>
            <p className="mt-12 text-primary-400 font-light font-body text-lg text-left">
              There was an error processing your request. Please reopen the app
              try again.
            </p>

            <a
              target="_blank"
              href="miloupaw://profile/business"
              rel="noreferrer"
              className="mt-9 bg-primary-default w-60 text-secondary-default font-bold font-body text-lg py-2 px-4 rounded-lg self-end text-center"
            >
              Go to app
            </a>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
