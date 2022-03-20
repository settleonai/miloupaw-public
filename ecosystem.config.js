module.exports = {
  apps: [
    {
      name: "fnelNext",
      script: "./server/server.js",
      watch: true,
      env: {
        PORT: 5000,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 5000,
        NODE_ENV: "production",
        NODE_OPTIONS: "--openssl-legacy-provider",
      },
    },
  ],
};
