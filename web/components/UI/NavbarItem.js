import React from "react";
import { useWindowScrollPositions } from "../../hooks/useWindowScrollPositions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function NavbarItem({ item, setActive }) {
  const { scrollX, scrollY } = useWindowScrollPositions();

  return (
    <div className="relative">
      {item.current && (
        <svg
          className="w-6 h-6 fill-secondary-default absolute top-7 left-4 ml-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="3"></circle>
        </svg>
      )}
      <a
        key={item.name}
        href={item.href}
        onClick={() => setActive(item.name)}
        className={classNames(
          item.current
            ? scrollY > 65
              ? "text-secondary-default"
              : "text-primary-default"
            : "text-primary-100  hover:text-secondary-default",
          "px-3 py-2 rounded-md text-sm font-medium"
        )}
        aria-current={item.current ? "page" : undefined}
      >
        {item.name}
      </a>
    </div>
  );
}
