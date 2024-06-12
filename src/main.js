import './assets/main.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import {createPersistedState} from "pinia-persistedstate-plugin";

const app = createApp(App)
const pinia = createPinia()
const persistedState = createPersistedState()
pinia.use(persistedState)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
