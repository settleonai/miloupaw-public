const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000"
    : "https://www.fnel.live";

module.exports = baseUrl;
