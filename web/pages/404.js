import Image from "next/image";
import React from "react";
import GeneralHead from "../components/heads/GeneralHead";
import FooterComponent from "../components/UI/FooterComponent";

export default function BusinessError() {
  return (
    <>
      <GeneralHead title={`page not found`} />
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
                Page not found!
              </h1>
              <p className="mt-12 text-primary-400 font-light font-body text-lg text-left">
                The page you are looking for does not exist. Or you may have
                typed the address incorrectly 🤨.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent extraClassName={"md:-mt-16"} />
    </>
  );
}
