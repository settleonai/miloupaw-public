import React from "react";
import IconComponent from "../UI/IconComp";

export default function ServiceSummaryComponent() {
  const features = [
    {
      name: "Dog Walking",
      icon: "dog_walking",
      description: `Dog walking sessions are available for dogs of all sizes. Each session is a minimum of 30 minutes and is designed to provide a safe and enjoyable experience for your dog. The fee for a single dog session is $23.`,
    },
    {
      name: "Pet Sitting",
      icon: "pet_sitting",
      description: `Pet sitting services, with a minimum duration of 30 minutes, include meal serving, water refilling, administering medication, and potty breaks. This service accommodates up to three dogs at a time. The fee for a single dog session is $27.`,
    },
    {
      name: "Boarding",
      icon: "boarding",
      description: `We offer boarding for dogs of all sizes, housing each dog individually in a colleague's home. Our all-inclusive, crate-free, and pet-friendly stays ensure your pet is well cared for. The fee for boarding is $60 per day, with discounts available for long-term stays.`,
    },
    {
      name: "Potty Break",
      icon: "potty_break",
      description: `The potty break service is a 10-minute session, offered at a fee of $20 per single dog session.`,
    },
    // { name: "Pet Taxi", icon: "pet_taxi" },
    // { name: "Pet Training", icon: "pet_training" },
    // { name: "Meet and Great", icon: "meet_and_greet" },
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
