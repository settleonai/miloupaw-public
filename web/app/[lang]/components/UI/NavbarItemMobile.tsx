import React from "react";
import { Disclosure } from "@headlessui/react";
import { useWindowScrollPositions } from "../../../../hooks/useWindowScrollPositions";

type NavbarItemMobileProps = {
  item: {
    name: string;
    href?: string;
    localName?: string;
    action?: () => void;
  };
  setActive?: (activeItem: string) => void;
  activeItem: string | undefined;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NavbarItemMobile: React.FC<NavbarItemMobileProps> = ({
  item,
  setActive,
  activeItem,
}) => {
  const { scrollX, scrollY } = useWindowScrollPositions();

  const isActive = item?.localName
    ? item.localName === activeItem
    : item.name === activeItem;

  return (
    <Disclosure.Button
      key={item.name}
      as="a"
      href={item.href}
      onClick={() => {
        if (item.action) {
          item.action();
        } else {
          setActive && setActive(item.name);
        }
      }}
      className={classNames(
        isActive
          ? scrollY > 65
            ? "text-secondary-default"
            : "text-primary-default"
          : "text-primary-100  hover:text-secondary-default",
        "px-3 py-2 block relative rounded-md text-sm font-medium"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {item.name}
    </Disclosure.Button>
  );
};

export default NavbarItemMobile;
