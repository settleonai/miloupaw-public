module.exports = {
  apps: [
    {
      name: "miloupawWebServer",
      watch: true,
      script: "yarn start",
      env: {
        PORT: 3000,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: "production",
        NODE_OPTIONS: "--openssl-legacy-provider",
      },
    },
  ],
};
