import { FunctionComponent } from "react";

import IconComponent from "../UI/IconComp";

type HomeComponentProps = {
  dictionary: any;
  lang: string;
};

const ServiceSummaryComponent: FunctionComponent<HomeComponentProps> = ({
  dictionary,
  lang,
}) => {
  const features = [
    {
      name: dictionary["service-component"].dog_walking.name,
      icon: "dog_walking",
      description: dictionary["service-component"].dog_walking.description,
    },
    {
      name: dictionary["service-component"].pet_sitting.name,
      icon: "pet_sitting",
      description: dictionary["service-component"].pet_sitting.description,
    },
    {
      name: dictionary["service-component"].boarding.name,
      icon: "boarding",
      description: dictionary["service-component"].boarding.description,
    },
    {
      name: dictionary["service-component"].potty_break.name,
      icon: "potty_break",
      description: dictionary["service-component"].potty_break.description,
    },

    // {
    //   name: "Bundle Offers",
    //   description: `Our 'Weekly Dog Care Bundle' combines walks, sitting, and more, tailored for regular customers at a discounted rate. Contact us for custom package pricing and details.`,
    // },
    // {
    //   name: "Loyalty Program",
    //   description: `Join our loyalty program for free and enjoy earning points with each service. This program is perfect for our frequent customers, offering discounts and special perks as a token of our appreciation.`,
    // },
    // {
    //   name: "Seasonal Promotions",
    //   description: `Experience our themed services like 'Summer Splash Walks' and 'Holiday Pet Care', with special promotions and seasonal specials tailored to bring extra joy to your pet's routine. Contact us for current offers.`,
    // },
  ];

  return (
    <div id="services" className={`py-12 pt-32 bg-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="lg:text-center"
          dir={`${lang !== "fa" ? "ltr" : "rtl"}`}
        >
          <h2
            className={`text-primary-default  font-bold text-4xl tracking-wide uppercase `}
          >
            {dictionary["services"].title}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-primary-300 sm:text-4xl">
            {dictionary["services"].subtitle}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {dictionary["services"].description}
          </p>
        </div>

        <dl className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
          {features.map((feature) => (
            <div
              dir={`${lang !== "fa" ? "ltr" : "rtl"}`}
              key={feature.name}
              className="relative"
            >
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-default ">
                  <IconComponent
                    name={feature.icon}
                    className="fill-secondary-default p-1"
                  />
                </div>
                <p
                  className={`${
                    lang == "fa" ? "mr-16" : "ml-16"
                  } text-lg leading-6 font-medium text-gray-900`}
                >
                  {feature.name}
                </p>
              </dt>
              <dd
                className={`${
                  lang == "fa" ? "mr-16" : "ml-16"
                } mt-2  text-base text-primary-200`}
              >
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-col ">
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {dictionary["services"].cta}
          </p>
          <a
            target="_blank"
            href={process.env.APP_STORE_LINK}
            rel="noreferrer"
            className={`my-4 bg-primary-default w-60 text-secondary-default font-bold ${
              lang !== "fa" ? "font-body" : null
            } text-lg py-2 px-4 rounded-lg self-center text-center`}
          >
            {dictionary["services"].cta_button}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceSummaryComponent;
