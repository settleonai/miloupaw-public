require("dotenv").config();

const port = process.env.PORT || 2000;

module.exports = {
  apps: [
    {
      name: "projectX-Server",
      script: "./server.js",
      watch: true,
      env: {
        PORT: port,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: port,
        NODE_ENV: "production",
        // NODE_OPTIONS: "--openssl-legacy-provider",
      },
    },
  ],
};
