import React from "react";
import { StarIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ReviewSummaryComponent() {
  const reviews = [
    {
      name: "John Doe",

      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      rating: 3,
    },
    {
      name: "John Doe",

      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      rating: 3,
    },
    {
      name: "John Doe",

      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      rating: 3,
    },
    {
      name: "John Doe",

      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      rating: 3,
    },
  ];
  return (
    <div id="reviews" className="py-12 pt-32 bg-secondary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-primary-default font-display font-bold text-4xl tracking-wide uppercase text-left">
            Reviews
          </h2>

          <p className="mt-4 max-w-2xl text-xl text-gray-500  text-left">
            Our customers are way more than a client to us. Sharing their views
            helps us to keeping up what we doing and try harder in this matter.
          </p>
        </div>

        <div className="mt-10">
          <dl className=" flex gap-6 snap-x snap-mandatory overflow-x-auto pb-14">
            <div className="snap-center shrink-0">
              <div className="shrink-0 w-4 sm:w-48"></div>
            </div>
            {reviews.map((review) => (
              <div
                className="snap-start shrink-0 mx-auto relative w-[430px] h-[270px] bg-white rounded-lg overflow-hidden py-7"
                key={review.name}
              >
                <div className="absolute top-12 right-6 ">
                  <img
                    src="/images/quote.svg"
                    alt="quote"
                    className="w-14 h-14 fill-slate-300"
                  />
                </div>
                <div className="flex flex-col justify-start px-7 ">
                  <div className="flex flex-row items-baseline">
                    <img
                      className="h-20 w-20  rounded-full"
                      src={review.image}
                      alt="avatar"
                    />
                    <div className="ml-3 font-display text-xl leading-5 font-normal text-gray-900">
                      {review.name}
                    </div>
                  </div>
                  <div className="flex row justify-start align-middle mt-5">
                    <div className="flex items-center ">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            review.rating > rating
                              ? "text-secondary-default"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold leading-4  text-primary-darker">
                      {review.rating}
                    </span>
                  </div>
                  <p className="mt-3  line-clamp-3">{review.review}</p>
                </div>
              </div>
            ))}
            <div className="snap-center shrink-0">
              <div className="shrink-0 w-4 sm:w-48"></div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
