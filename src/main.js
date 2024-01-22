import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import router from '@/router/index'

// create the store
const pinia = createPinia()

// import languages files
import enUS from '@/i18n/enUS.js'
import esES from '@/i18n/esES.js'
import caES from '@/i18n/caES.js'
import ptPT from '@/i18n/ptPT.js'
import deDE from '@/i18n/deDE.js'
import frFR from '@/i18n/frFR.js'

import App from './App.vue'
const i18n = createI18n({
    locale: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).language : 'en-US' ,
    messages: {
        en: enUS,
        ca: caES,
        es: esES,
        pt: ptPT,
        de: deDE,
        fr: frFR
    }
})

createApp(App)
    .use(pinia)
    .use(i18n)
    .use(router)
    .mount('#app')