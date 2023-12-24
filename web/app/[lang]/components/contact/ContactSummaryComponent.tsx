import { FunctionComponent } from "react";
import ContactCardComponent from "./ContactCardComponent";

type ContactSummaryComponentProps = {
  dictionary: any;
  lang: string;
};

const ContactSummaryComponent: FunctionComponent<
  ContactSummaryComponentProps
> = ({ dictionary, lang }) => {
  return (
    <div
      id="contact"
      className="py-12 bg-white"
      dir={lang === "fa" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2
            className={`text-primary-default ${
              lang !== "fa" ? "font-display" : ""
            } font-bold text-4xl tracking-wide uppercase`}
          >
            {dictionary.contact_component.title}
          </h2>

          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {dictionary.contact_component.subtitle}
          </p>
        </div>

        <div className="pt-20 " dir={lang !== "fa" ? "rtl" : "ltr"}>
          <div className="flex flex-wrap gap-x-2 gap-y-10 justify-evenly  ">
            <ContactCardComponent
              icon="phone"
              title={dictionary.contact_component.phone}
              description="925 771-0435"
              language={lang}
            />
            <ContactCardComponent
              icon="email"
              title={dictionary.contact_component.email}
              description="sani@miloupaw.com"
              language={lang}
            />
            <ContactCardComponent
              icon="address"
              title={dictionary.contact_component.address}
              description={`Walnut Creek, CA 94596`}
              language={lang}
            />
            <ContactCardComponent
              icon="hours"
              title={dictionary.contact_component.working_hours}
              description={`Mon-Fri: 7am  6pm \nSat: 7am  4pm \nSun: Closed`}
              language={lang}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSummaryComponent;
