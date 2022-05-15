import Image from "next/image";
import React from "react";

export default function GallerySummaryComponent() {
  const photos = [
    "https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBldHxlbnwwfHwwfHw%3D",
    "https://images.unsplash.com/photo-1532202802379-df93d543bac3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBldHxlbnwwfHwwfHw%3D",
    "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGV0fGVufDB8fDB8fA%3D%3D",
  ];

  return (
    <div id="gallery" className="py-12 pt-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-primary-default font-display font-bold text-4xl tracking-wide uppercase">
            Our Gallery
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            moments we have made together
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our fluffy friends are great. We love sharing a glimpse of those
            great moment we spend with them. Please don’t forget to like and
            share these cuties. They demand attention!
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-6">
            {photos.map((photo) => (
              <div
                className="mx-auto relative w-96 h-96 rounded-md overflow-hidden"
                key={photo}
              >
                <Image
                  src={photo}
                  alt="homepage header"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
