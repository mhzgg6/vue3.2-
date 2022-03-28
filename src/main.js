import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import SvgIcon from '@/icons'
import '@/router/premission'

const app = createApp(App)
SvgIcon(app)
app.use(store).use(router).mount('#app')
