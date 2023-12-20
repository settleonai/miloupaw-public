import React from "react";
import IconComponent from "../UI/IconComp";

export default function ServiceSummaryComponent() {
  const features = [
    {
      name: "Dog Walking",
      icon: "dog_walking",
      description: `Offering dog walking sessions for all sizes, we ensure a safe and enjoyable experience. Choose from a variety of walks, including 'Senior Dog Special Walks' and 'Puppy Energy Burners', starting at $28 for 30 minutes and $35 for an hour.`,
    },
    {
      name: "Pet Sitting",
      icon: "pet_sitting",
      description: `Our pet sitting service provides comprehensive care, including meal serving, medication, and potty breaks for up to three dogs, at $35 for a 30-minute session. Ideal for busy pet parents seeking attentive care for their dogs.`,
    },
    {
      name: "Boarding",
      icon: "boarding",
      description: `Our boarding service offers a home-like environment for your dog, with individual attention. The fee for small pets is $70 per day and $100 per day for large pets, ensuring a comfortable and tailored stay for each dog.`,
    },
    {
      name: "Potty Break",
      icon: "potty_break",
      description: `Our quick and efficient 10-minute potty break service, available for $20, is designed to fit into busy schedules, providing comfort and convenience for your pet.`,
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
    <div id="services" className="py-12 pt-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-primary-default font-display font-bold text-4xl tracking-wide uppercase">
            Our Services
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-primary-300 sm:text-4xl">
            Our commitment is to provide stress-free care for your pets.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our services are delivered by a team of highly qualified and
            experienced professionals. Your pet will receive specialized care
            through our services.
          </p>
        </div>

        <dl className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-default ">
                  <IconComponent
                    name={feature.icon}
                    className="fill-secondary-default p-1"
                  />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-primary-200">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-col ">
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            are you ready?
          </p>
          <a
            target="_blank"
            href={process.env.APP_STORE_LINK}
            rel="noreferrer"
            className="my-4 bg-primary-default w-60 text-secondary-default font-bold font-body text-lg py-2 px-4 rounded-lg self-center text-center"
          >
            {`let's get started`}
          </a>
        </div>
      </div>
    </div>
  );
}
