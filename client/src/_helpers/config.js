
// TODO: Here may be some problem with access, need to test it
let serverUrl = `${location.protocol}//${location.hostname}:3117`;

const config = {
    apiUrl: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : ''),
    serverUrl: serverUrl,
};


export default config;