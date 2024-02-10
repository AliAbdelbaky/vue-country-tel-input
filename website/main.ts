import {createApp} from 'vue'
import App from './App.vue'

import VueCountryTelInput from '@/index.ts'

const app = createApp(App)
app.use(VueCountryTelInput,{showRequired:false,showLabel:false,phonePlaceholder:'aa7a'})


app.mount('#app')

