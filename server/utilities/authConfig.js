const baseUrl = require("./baseUrl");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.OAUTH_SECRET || "secret",
  baseURL: baseUrl,
  clientID: process.env.OAUTH_CLIENT_ID || "clientID",
  issuerBaseURL: "https://dev-uewzgiti.us.auth0.com",
};

module.exports = config;
