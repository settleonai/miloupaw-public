"use client";
import React, { useState } from "react";
import NavbarItem from "./NavbarItem";
import NavbarItemMobile from "./NavbarItemMobile";
import { Disclosure } from "@headlessui/react";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { useWindowScrollPositions } from "../../../../hooks/useWindowScrollPositions";
import { usePathname } from "next/navigation";
import { i18n } from "../../../../i18n-config";

type NavigationItem = {
  name: string;
  href: string;
};

type NavbarProps = {
  dictionary: any;
  currentLocale: string;
};

const Navbar: React.FC<NavbarProps> = ({ dictionary, currentLocale }) => {
  const [activeMenuItem, setActiveMenuItem] = useState<string>(
    dictionary.menu.home
  );

  const navigation: NavigationItem[] = [
    { name: dictionary.menu.home, href: "#home" },
    { name: dictionary.menu.services, href: "#services" },
    { name: dictionary.menu.faq, href: "#faq" },
    { name: dictionary.menu.gallery, href: "#gallery" },
    { name: dictionary.menu.reviews, href: "#reviews" },
    { name: dictionary.menu.contact, href: "#contact" },
  ];

  const languages = i18n.locales.map((item) => ({
    name: item,
    href: item,
    action: (item: string) => redirectedPathName(item),
  }));

  const { scrollX, scrollY } = useWindowScrollPositions();

  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

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
            className={`max-w-4xl mx-auto  ${
              scrollY <= 65 ? "py-2 lg:py-10 " : null
            } px-2 sm:px-6 lg:px-8`}
          >
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">{dictionary.menu.open}</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars4Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="max-w-7xl flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Image
                    src={
                      scrollY > 65 ? "/images/logo-w.svg" : "/images/logo.svg"
                    }
                    className={`hidden lg:block ${
                      scrollY <= 65 ? "h-20" : "h-10"
                    } rounded-lg`}
                    alt="miloupaw Logo"
                    width={scrollY > 65 ? 40 : 80}
                    height={scrollY > 65 ? 40 : 80}
                  />
                  <span
                    className={`block ml-20 lg:ml-0 lg:hidden h-8 w-auto rounded-full ${
                      currentLocale !== "fa" ? "font-display" : ""
                    } text-secondary-default`}
                  >
                    {dictionary.common.name}
                  </span>
                </div>
                <div className="hidden sm:flex sm:ml-6 justify-end w-full ">
                  <div className="flex justify-around space-x-4 ">
                    {navigation.map((item) => (
                      <NavbarItem
                        key={item.name}
                        item={item}
                        activeItem={activeMenuItem}
                        setActive={setActiveMenuItem}
                      />
                    ))}
                  </div>
                  <div className="block w-10"></div>
                  <div className="flex justify-around space-x-4 ">
                    <NavbarItem
                      key={languages[0].name}
                      item={languages[0]}
                      activeItem={currentLocale}
                    />

                    <div className="relative ">
                      <span>|</span>
                    </div>
                    <NavbarItem
                      key={languages[1].name}
                      item={languages[1]}
                      activeItem={currentLocale}
                    />
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                <NavbarItem
                  key={languages[0].name}
                  item={languages[0]}
                  activeItem={currentLocale}
                />

                <div className="relative ">
                  <span>|</span>
                </div>
                <NavbarItem
                  key={languages[1].name}
                  item={languages[1]}
                  activeItem={currentLocale}
                />
              </div>
              {/* insert right section here later */}
              <div className="hidden sm:flex sm:ml-6 justify-end "></div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden shadow-2xl">
            <div
              className={`px-2 pt-2 pb-3 space-y-1 ${
                scrollY > 65 ? "bg-primary-default" : "bg-orange-50"
              }`}
            >
              {navigation.map((item) => (
                <NavbarItemMobile
                  key={item.name}
                  item={item}
                  activeItem={activeMenuItem}
                  setActive={setActiveMenuItem}
                />
              ))}

              <div className="flex justify-around space-x-4 ">
                {/* <NavbarItemMobile
                  key="english"
                  item={languages.english}
                  activeItem={"en"}
                />

                <NavbarItemMobile
                  key="farsi"
                  item={languages.farsi}
                  activeItem={"en"}
                /> */}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
