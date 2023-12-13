import React from "react";
import { classNames } from "../../utils/classNames";

export default function FooterComponent({ extraClassName }) {
  return (
    <footer class="py-5 lg:py-12 bg-secondary-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-6">
          <a href="/" class="text-lg md:text-xl font-bold text-primary-200">
            miloupaw
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-6">
          <div>
            <h5 class="text-md md:text-lg font-bold text-primary-200">
              Quick Links
            </h5>
            <ul class="list-none mt-4">
              <li>
                <a href="/about" class="text-sm md:text-md text-primary-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" class="text-sm md:text-md text-primary-200">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" class="text-sm md:text-md text-primary-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 class="text-md md:text-lg font-bold text-primary-200">
              Contact
            </h5>
            <ul class="list-none mt-4">
              <li class="text-sm md:text-md text-primary-200">
                123 Pet Street, Petville, PV 12345
              </li>
              <li class="text-sm md:text-md text-primary-200">
                (123) 456-7890
              </li>
              <li>
                <a
                  href="mailto:info@miloupaw.com"
                  class="text-sm md:text-md text-primary-200"
                >
                  info@miloupaw.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 class="text-md md:text-lg font-bold text-primary-200">
              Follow Us
            </h5>
            <div class="flex justify-center mt-4">
              {/* <!-- Insert social media icons with links --> */}
              <a href="your-facebook-link" class="mr-4">
                FB icon
              </a>
              <a href="your-twitter-link" class="mr-4">
                Twitter icon
              </a>
              <a href="your-instagram-link">Instagram icon</a>
            </div>
          </div>
        </div>

        <div class="text-center">
          <span class="text-sm md:text-md text-primary-200">
            miloupaw © all rights reserved - Copyrights 2023
          </span>
        </div>
      </div>
    </footer>
  );
}
