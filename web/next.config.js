/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
  env: {
    APP_STORE_ID: "1620724992",
    APP_STORE_LINK: "https://apps.apple.com/us/app/miloupaw/id1620724992",
  },
};

module.exports = nextConfig;
