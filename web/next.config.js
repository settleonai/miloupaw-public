/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  env: {
    APP_STORE_ID: "1568172168",
    APP_STORE_LINK: "https://apps.apple.com/us/app/fnel/id1568172168",
  },
};

module.exports = nextConfig;
