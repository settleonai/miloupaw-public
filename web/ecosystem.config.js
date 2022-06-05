module.exports = {
  apps: [
    {
      name: "miloupawWebServer",
      watch: true,
      script: "yarn",
      args: "start",
      interpreter: "/bin/bash",
      env: {
        PORT: 3000,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
  ],
};
