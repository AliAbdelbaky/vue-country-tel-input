import {createApp} from 'vue'
import App from './App.vue'
import VueCountryTelInput from './vue_country_telI_input.ts'

const app = createApp(App)

app.use(VueCountryTelInput)

app.mount('#app')

