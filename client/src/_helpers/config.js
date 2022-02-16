
// By default, sever have 3117 port
const SERVER_PORT = 21666


const config = {
    // Url for client side
    apiUrl: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : ''),
    // Url for server side
    serverUrl: `${location.protocol}//${location.hostname}:${SERVER_PORT}`,
};


export default config;