import { FunctionComponent } from "react";
import Link from "next/link";

type FooterComponentProps = {
  dictionary: any;
  language: string;
};

const FooterComponent: FunctionComponent<FooterComponentProps> = (
  props: FooterComponentProps
) => {
  return (
    <footer
      className="py-5 lg:py-12 bg-secondary-100"
      dir={props.language === "en" ? "ltr" : "rtl"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <Link
            href="/"
            className="text-lg md:text-xl font-bold text-primary-200"
          >
            {props.dictionary.footer.name}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-6">
          <div>
            <h5 className="text-md md:text-lg font-bold text-primary-200">
              {props.dictionary.footer.quick_links}
            </h5>
            <ul className="list-none mt-4">
              <li>
                <Link
                  href="/#faq"
                  className="text-sm md:text-md text-primary-200"
                >
                  {props.dictionary.footer.faq}
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-sm md:text-md text-primary-200"
                >
                  {props.dictionary.footer.services}
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-sm md:text-md text-primary-200"
                >
                  {props.dictionary.footer.contact_us}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-md md:text-lg font-bold text-primary-200">
              {props.dictionary.footer.contact}
            </h5>
            <ul className="list-none mt-4">
              <li className="text-sm md:text-md text-primary-200">
                Walnut Creek, CA 94596
              </li>
              <li className="text-sm md:text-md text-primary-200">
                (925) 771-0435
              </li>
              <li>
                <a
                  href="mailto:info@miloupaw.com"
                  className="text-sm md:text-md text-primary-200"
                >
                  sani@miloupaw.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            {/* <h5 className="text-md md:text-lg font-bold text-primary-200">
              Follow Us
            </h5>
            <div className="flex justify-center mt-4">
              <a href="your-facebook-link" className="mr-4">
                FB icon
              </a>
              <a href="your-twitter-link" className="mr-4">
                Twitter icon
              </a>
              <a href="your-instagram-link">Instagram icon</a>
            </div> */}
          </div>
        </div>

        <div className="text-center">
          <span className="text-sm md:text-md text-primary-200">
            miloupaw © all rights reserved - Copyrights 2023
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
