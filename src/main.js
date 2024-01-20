import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { createI18n } from 'vue-i18n'
import router from '@/router/index'

// create the store
const pinia = createPinia()

// import languages files
// import enUS from '@/i18n/en-US.js'
// import esES from '@/i18n/es-ES.js'
// import caES from '@/i18n/ca-ES.js'

import App from './App.vue'

// const i18n = createI18n({
//     locale: localStorage.getItem('userLanguage') ? localStorage.getItem('userLanguage') : Intl.DateTimeFormat().resolvedOptions().locale || 'en-US',
//     messages: {
//         en: enUS,
//         es: esES,
//         // ca: caES
//     }
// })

createApp(App)
    .use(pinia)
    // .use(i18n)
    .use(router)
    .mount('#app')