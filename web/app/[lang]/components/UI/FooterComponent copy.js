import React from "react";
import { classNames } from "../../utils/classNames";

export default function FooterComponent({ extraClassName }) {
  return (
    <footer
      className={classNames("py-5 lg:py-12 bg-secondary-100", extraClassName)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-sm md:text-md text-primary-200">{`miloupaw © all rights reserved - Copyrights ${new Date().getFullYear()}`}</span>
      </div>
    </footer>
  );
}
