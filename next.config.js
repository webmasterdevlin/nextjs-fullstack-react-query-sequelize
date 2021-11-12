module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    postgres: {
      port: process.env.POSTGRES_PORT,
      host: process.env.POSTGRES_HOST,
      name: process.env.POSTGRES_NAME,
      user: process.env.POSTGRES_USER,
      pass: process.env.POSTGRES_PASS,
    },
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
};
