import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)

app.component('Button', Button)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Dropdown', Dropdown)
app.component('Textarea', Textarea)
app.component('Toast', Toast)

app.mount('#app')
