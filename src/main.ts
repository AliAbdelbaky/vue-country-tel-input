import {createApp} from 'vue'
import App from './App.vue'
import VueCountryPhoneInput from './pluginBuilder.ts'

const app = createApp(App)

app.use(VueCountryPhoneInput)

app.mount('#app')

