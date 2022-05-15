import Image from "next/image";
import React from "react";
import FooterComponent from "../components/UI/FooterComponent";

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
              Page not found!
            </h1>
            <p className="mt-12 text-primary-400 font-light font-body text-lg text-left">
              The page you are looking for does not exist. Or you may have typed
              the address incorrectly 🤨.
            </p>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
