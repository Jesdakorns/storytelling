module.exports = {
    serverRuntimeConfig: {
        // Will only be available on the server side
        mySecret: 'secret'
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        API_BASE: 'http://7f39c3a9b8c2.ngrok.io/',
        API_HOST: 'http://7f39c3a9b8c2.ngrok.io/api/',
    },
}