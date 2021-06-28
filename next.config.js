module.exports = {
    serverRuntimeConfig: {
        // Will only be available on the server side
        mySecret: 'secret'
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        API_BASE: 'https://8e9cd47204b1.ngrok.io/',
        API_HOST: 'https://8e9cd47204b1.ngrok.io/api/',
    },
}