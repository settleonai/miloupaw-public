import Image from "next/image";
import React from "react";

export default function GallerySummaryComponent() {
  const photos = [
    "https://res.cloudinary.com/fnel/image/upload/v1656480880/miloupaw/gallery/IMG_3445_ty99ha.jpg",
    "https://res.cloudinary.com/fnel/image/upload/v1652659076/miloupaw/gallery/269896251_3179723159018646_2393617246546797896_n.jpg_u7nqy9.jpg",
    "https://res.cloudinary.com/fnel/image/upload/v1652659122/miloupaw/gallery/160814966_3843442299042613_2518706462714947177_n.jpg_rthep5.jpg",
    "https://res.cloudinary.com/fnel/image/upload/v1652659159/miloupaw/gallery/77332376_497204600912174_1942975307265331340_n.jpg_cuohg4.jpg",
    "https://res.cloudinary.com/fnel/image/upload/v1652659188/miloupaw/gallery/67638885_359229855014595_515169509779982159_n.jpg_qygo6z.jpg",
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
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-6 md:gap-y-6">
            {photos.map((photo) => (
              <div
                className="mx-auto relative w-80 h-80 rounded-md overflow-hidden"
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
