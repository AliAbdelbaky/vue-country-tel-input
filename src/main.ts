import {createApp} from 'vue'
import App from './App.vue'
import VueCountryTelInput from './pluginBuilder.ts'

const app = createApp(App)

app.use(VueCountryTelInput)

app.mount('#app')

