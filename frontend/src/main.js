import { createApp } from 'vue'
import App from './App.vue'

import router from './router' // importing the router created in src if u manually created this...

import './assets/css/style.css' // importing the css tailwind directives

const app = createApp(App)
app.use(router) // using the router you've imported...
app.mount('#app')
