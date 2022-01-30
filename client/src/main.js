import { createApp } from 'vue'
import App from './App.vue'
import router from './_helpers/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'animate.css';


createApp(App)
    .use(router)
    .mount('#app')
