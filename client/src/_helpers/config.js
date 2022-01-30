
let serverUrl = 'http://127.0.0.1:3117'

if (process.env.IS_PROD){
    serverUrl = `${location.protocol}//${location.hostname}:3117`
}
const config = {
    apiUrl: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : ''), // 'http://localhost:8080',
    serverUrl: serverUrl,
};


export default config;