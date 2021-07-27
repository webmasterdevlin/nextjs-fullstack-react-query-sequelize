module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    postgres: {
      port: "5432",
      host: "localhost",
      name: "mydb",
      user: "postgres",
      pass: "pass",
    },
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    postgres: {
      port: "5432",
      host: "localhost",
      name: "mydb",
      user: "postgres",
      pass: "pass",
    },
  },
};
