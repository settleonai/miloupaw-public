import React, { Fragment, useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

import { useWindowScrollPositions } from "../../hooks/useWindowScrollPositions";
import { classNames } from "../../utils/classNames";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const navigation = [
    { name: "Home", href: "#home", current: active === "Home" },
    { name: "Services", href: "#services", current: active === "Services" },
    { name: "f&q", href: "#faq", current: active === "f&q" },
    { name: "Gallery", href: "#gallery", current: active === "Gallery" },
    {
      name: "Reviews",
      href: "#reviews",
      current: active === "Reviews",
    },
    // { name: "About", href: "/about", current: active === "About" },
    { name: "Contact", href: "#contact", current: active === "Contact" },
  ];
  const { scrollX, scrollY } = useWindowScrollPositions();

  return (
    <Disclosure
      as="nav"
      className={`${
        scrollY > 65 ? "bg-gray-800" : "bg-secondary-100"
      } fixed top-0 w-full z-10 ${scrollY > 65 ? "h-14" : "h-24"}`}
    >
      {({ open }) => (
        <>
          <div
            className={`max-w-4xl mx-auto ${
              scrollY <= 65 ? "py-10" : null
            } px-2 sm:px-6 lg:px-8`}
          >
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="max-w-7xl flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    src={
                      scrollY > 65 ? "/images/logo-w.svg" : "/images/logo.svg"
                    }
                    className={`hidden lg:block ${
                      scrollY <= 65 ? "h-20" : "h-10"
                    } w-auto rounded-lg `}
                    alt="miloupaw Logo"
                  />
                  <span className="block lg:hidden h-8 w-auto rounded-full font-display text-secondary-default">
                    miloupaw
                  </span>
                </div>
                <div className="hidden sm:flex sm:ml-6 justify-end w-full ">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (
                      <NavbarItem
                        key={item.name}
                        item={item}
                        setActive={setActive}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* insert right section here later */}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div
              className={`px-2 pt-2 pb-3 space-y-1 ${
                scrollY > 65 ? "bg-primary-default" : "bg-orange-50"
              }`}
            >
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

// <nav className="sm:px-4 py-2.5 bg-secondary-100">
//   <div className="container flex flex-wrap justify-between items-center mx-auto max-w-3xl h-32">
//     <a href="#" className="flex items-center">
//       <img
//         src="/images/logo.svg"
//         className="mr-3 sm:h-16"
//         alt="miloupaw Logo"
//       />
//     </a>
//     <button
//       data-collapse-toggle="mobile-menu"
//       type="button"
//       className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//       aria-controls="mobile-menu"
//       aria-expanded="false"
//     >
//       <span className="sr-only">Open main menu</span>
//       <svg
//         className="w-6 h-6"
//         fill="currentColor"
//         viewBox="0 0 20 20"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           fillRule="evenodd"
//           d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//           clipRule="evenodd"
//         ></path>
//       </svg>
//       <svg
//         className="hidden w-6 h-6"
//         fill="currentColor"
//         viewBox="0 0 20 20"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           fillRule="evenodd"
//           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//           clipRule="evenodd"
//         ></path>
//       </svg>
//     </button>
//     <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
//       <ul className="flex flex-col mt-4  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
//         <NavbarItem title="Home" href="#home" active={true} />
//         <NavbarItem title="Services" href="#services" />
//         <NavbarItem title="Gallery" href="#gallery" />
//         <NavbarItem title="About" href="/about" />
//         <NavbarItem title="Contact" href="#contact" />
//         <NavbarItem title="f&q" href="#faq" />
//       </ul>
//     </div>
//   </div>
// </nav>
