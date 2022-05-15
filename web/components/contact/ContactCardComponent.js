import React from "react";

export default function ContactCardComponent({ icon, title, description }) {
  const iconHandler = () => {
    switch (icon) {
      case "phone":
        return (
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        );
      case "email":
        return (
          <path
            fillRule="evenodd"
            d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
            clipRule="evenodd"
          />
        );
      case "address":
        return (
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        );

      case "hours":
        return (
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        );

      default:
        return;
    }
  };

  return (
    <div className="snap-start shrink-0  relative w-[280px] h-[190px] bg-secondary-100 rounded-lg  py-7">
      <div className="absolute -top-8 right-[110px] bg-white w-16 h-16 rounded-full flex flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 fill-primary-default"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          {iconHandler()}
        </svg>
      </div>
      <div className="flex flex-col items-center  ">
        <span className="pt-8 text-3xl font-display font-semibold text-primary-default">
          {title}
        </span>

        <p className="pt-4 text-base text-center font-display font-normal text-primary-300 whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </div>
  );
}
