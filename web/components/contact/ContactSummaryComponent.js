import React from "react";
import ContactCardComponent from "./ContactCardComponent";

export default function ContactSummaryComponent() {
  return (
    <div id="contact" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-primary-default font-display font-bold text-4xl tracking-wide uppercase">
            CONTACT US
          </h2>

          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We value our customers&apos; insights. Please contact us with any
            questions or feedback.
          </p>
        </div>

        <div className="pt-20 ">
          <div className="flex flex-wrap gap-x-2 gap-y-10 justify-evenly  ">
            <ContactCardComponent
              icon="phone"
              title="Phone"
              description="925 771-0435"
            />
            <ContactCardComponent
              icon="email"
              title="Email"
              description="sani@miloupaw.com"
            />
            <ContactCardComponent
              icon="address"
              title="Address"
              description={`Walnut Creek, CA 94596`}
            />
            <ContactCardComponent
              icon="hours"
              title="Working Hours"
              description={`Mon-Fri: 7am  6pm \nSat: 7am  4pm \nSun: Closed`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
