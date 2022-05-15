import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import Image from "next/image";

export default function FaqSummaryComponent() {
  const faqs = [
    {
      question: "Why Miloupaw?",
      answer:
        "What makes miloupaw so unique? Miloupaw does not operate in bulk like many other existing service providers. We treat each client as an individual with unique needs that require a customized care package. As a company, we do not handle bulk services or provide one-stop shopping. Our pet care agency provides a safe and loving environment for your pet. In our journey with you, we begin with a personal meet and greet. After meticulously examining your pet's needs, we prepare a custom care package for your pet. In other words, you won't have to worry about any nitty-gritty details.",
    },
    {
      question: "Where do I start?",
      answer:
        "Getting started is very easy. First you need to connect to our system. Currently we are offering our services only to apple products users which includes both iPhone and iPad devices. Miloupaw made this process very smooth by providing you different social connections such as Apple ID and Google ID. This is a very secure way of signing up and you don’t have to remember any additional username and password. Just download the miloupaw app and start using it.",
    },

    {
      question: "How do I request an appointment?",
      answer:
        "As a client, you will have access to all of our services once your account has been verified, which is the meet-and-greet session. The app will then allow you to request future appointments.",
    },
    {
      question: "Who would look after my pet?",
      answer:
        "A primary professional familiar with your pet's needs will take care of it. It is our belief that a professional pet care provider who is friendly and familiar with your pet will reduce stress on their body and mind. In the case of emergency and unexpected situations, one of our colleagues will take care of the session.",
    },
  ];
  return (
    <div id="faq" className="py-12 pt-32 bg-white">
      {/* set two column */}
      <dl className="max-w-7xl space-y-10 m-auto md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-primary-default font-display font-bold text-4xl tracking-wide uppercase text-left">
              FREQUENTLY ASKED QUESTIONS
            </h2>

            <p className="mt-4 max-w-2xl text-xl text-gray-500  text-left">
              We understand that you have questions about our services. We have
              compiled a list of frequently asked questions to help you get the
              most out of our services.
            </p>
          </div>

          <div className="mt-10 flex flex-col">
            {faqs.map((faq, index) => (
              <Disclosure
                as="div"
                className="border-t border-gray-200 px-4 py-6"
                key={index}
              >
                <Disclosure.Button className="py-2">
                  {faq.question}
                </Disclosure.Button>

                <Disclosure.Panel className="text-gray-500">
                  {faq.answer}
                </Disclosure.Panel>
              </Disclosure>
            ))}
            <button className="bg-primary-default w-36 text-secondary-default font-bold font-body text-lg py-2 px-1 rounded-lg self-end">
              See More
            </button>
          </div>
        </div>
        <div className="mx-auto relative w-full max-h-[600px]">
          <Image
            src="/images/faq.jpg"
            alt="homepage header"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </dl>
    </div>
  );
}
