import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import LegalPage from './views/LegalPage.vue'
import cookies from './content/cookies.md?raw'
import privacy from './content/privacy.md?raw'
import terms from './content/terms.md?raw'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/cookies', component: LegalPage, props: { content: cookies } },
    { path: '/privacy', component: LegalPage, props: { content: privacy } },
    { path: '/terms', component: LegalPage, props: { content: terms } },
  ],
})

export default router
