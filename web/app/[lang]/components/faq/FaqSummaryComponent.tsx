"use client";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Image from "next/image";

type FaqSummaryComponentProps = {
  dictionary: any;
  lang: string;
};

type FaqType = {
  question: string;
  answer: string;
};

const FaqSummaryComponent: FunctionComponent<FaqSummaryComponentProps> = ({
  dictionary,
  lang,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  const toggleFAQ = (index: number) => {
    // Update the height of all items
    contentRefs.current.forEach((content, idx) => {
      if (content) {
        content.style.height =
          idx === index ? `${content.scrollHeight}px` : "0px";
      }
    });
    // Set the active index to the current index, or null if it's the same (toggling off)
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    // Set initial height for active item
    contentRefs.current.forEach((content, idx) => {
      if (content) {
        content.style.height =
          activeIndex === idx ? `${content.scrollHeight}px` : "0px";
      }
    });
  }, []);
  return (
    <div id="faq" className="py-12 pt-32 bg-white">
      <dl
        dir={`${lang !== "fa" ? "ltr" : "rtl"}`}
        className="max-w-7xl space-y-10 m-auto md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2
              className={`text-primary-default ${
                lang !== "fa" ? "font-display" : null
              } font-bold text-4xl tracking-wide uppercase text-left`}
            >
              {dictionary.faq_component.additional_text.header}
            </h2>

            <p className="mt-4 max-w-2xl text-xl text-gray-500  text-left">
              {dictionary.faq_component.additional_text.description}
            </p>
          </div>

          <div className="mt-10 flex flex-col">
            {dictionary.faq_component.faqs.map(
              (faq: FaqType, index: number) => (
                <div key={index} className="border-t border-gray-200 px-4 py-4">
                  <div
                    className="py-2 text-lg font-medium text-gray-900 cursor-pointer "
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                  </div>
                  <div
                    ref={(el) => (contentRefs.current[index] = el!)}
                    style={{ height: 0 }}
                    className={`transition-height duration-500 ease-in-out overflow-hidden  `}
                  >
                    <p className="mt-2 text-gray-500">{faq.answer}</p>
                  </div>
                </div>
              )
            )}
            {/* <button className="bg-primary-default w-36 text-secondary-default font-bold font-body text-lg py-2 px-1 rounded-lg self-end">
              See More
            </button> */}
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
};

export default FaqSummaryComponent;
