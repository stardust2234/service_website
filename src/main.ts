import { createApp } from 'vue'
import App from './App.vue'
import { createAppRouter } from './router'
import './style.css'

import * as Sentry from '@sentry/vue'

const app = createApp(App)
const router = createAppRouter()

Sentry.init({
  app,
  dsn: 'https://ae300736b822d1c16335efe2bbe32cf4@o4512244812611584.ingest.de.sentry.io/4512248582307920',
})

app.use(router)
app.mount('#app')
