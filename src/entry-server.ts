import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'
import { createAppRouter } from './router'

export async function render(url: string) {
  const app = createSSRApp(App)
  const router = createAppRouter(true)

  app.use(router)
  await router.push(url)
  await router.isReady()

  return renderToString(app)
}
