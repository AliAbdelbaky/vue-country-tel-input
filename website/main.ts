import {createApp} from 'vue'
import App from './App.vue'

import CountryTelInput from '@/index.ts'

const app = createApp(App)
app.use(CountryTelInput,{showRequired:false,showLabel:false,phonePlaceholder:'aa7a'})


app.mount('#app')

