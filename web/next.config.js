/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "play.google.com",
      },
    ],
  },

  env: {
    APP_STORE_ID: "1620724992",
    APP_STORE_LINK: "https://apps.apple.com/us/app/miloupaw/id1620724992",
    GOOGLE_STORE_LINK:
      "https://play.google.com/store/apps/details?id=com.fnel.miloupaw",
  },
};

module.exports = nextConfig;
