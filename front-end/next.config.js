module.exports = {
   serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret'
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_HOST: 'http://127.0.0.1:8000/api/',
  },
  }