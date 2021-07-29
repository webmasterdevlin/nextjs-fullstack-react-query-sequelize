module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    postgres: {
      port: process.env.PORT,
      host: process.env.HOST,
      name: process.env.NAME,
      user: process.env.USER,
      pass: process.env.PASS,
    },
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
};
