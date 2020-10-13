import { createApp } from 'vue'

import App from '/@/App.vue'
import pageTitle from '/@/plugins/page_title'
import router from '/@/router'
import store from '/@/store'

import '/@/main.css'

const app = createApp(App)

app.use(pageTitle)
app.use(router)
app.use(store)

app.mount('#app')
