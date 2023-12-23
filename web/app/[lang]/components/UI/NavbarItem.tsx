import React from "react";
import { useWindowScrollPositions } from "../../../../hooks/useWindowScrollPositions";
import Link from "next/link";

type NavbarItemProps = {
  item: {
    name: string;
    href: string;
    localName?: string;
    action?: (locale: string) => string;
  };
  setActive?: (activeItem: string) => void;
  activeItem: string | undefined;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  item,
  setActive,
  activeItem,
}) => {
  const { scrollX, scrollY } = useWindowScrollPositions();

  const isActive = item?.localName
    ? item.localName === activeItem
    : item.name === activeItem;

  return (
    <div className="hover:cursor-pointer">
      <Link
        href={item.action ? item.action(item.name) : item.href}
        onClick={() => {
          setActive && setActive(item.name);
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
        {isActive && (
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 -mb-1 w-2 h-2 bg-secondary-default rounded-full"></span>
        )}
      </Link>
    </div>
  );
};

export default NavbarItem;
