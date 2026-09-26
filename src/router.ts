import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import LegalPage from './views/LegalPage.vue'
import NotFoundView from './views/NotFoundView.vue'
import cookies from './content/cookies.md?raw'
import privacy from './content/privacy.md?raw'
import terms from './content/terms.md?raw'

const siteUrl = 'https://propelup.co.uk'

const routeMetadata = {
  '/': {
    title: 'Propel Up | Business support that keeps you moving',
    description: 'Flexible admin, customer support, invoicing and bookkeeping for busy small businesses.',
  },
  '/cookies': {
    title: 'Cookie Policy | Propel Up',
    description: 'Read the Propel Up cookie policy and learn how cookies and similar technologies are used on our website.',
  },
  '/privacy': {
    title: 'Privacy Policy | Propel Up',
    description: 'Read the Propel Up privacy policy and learn how personal information is collected, used and protected.',
  },
  '/terms': {
    title: 'Terms & Conditions | Propel Up',
    description: 'Read the terms and conditions governing Propel Up administrative, bookkeeping and virtual business support services.',
  },
} as const

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/cookies', component: LegalPage, props: { content: cookies } },
    { path: '/privacy', component: LegalPage, props: { content: privacy } },
    { path: '/terms', component: LegalPage, props: { content: terms } },
    { path: '/:pathMatch(.*)*', component: NotFoundView },
  ],
})

router.afterEach((to) => {
  const metadata = routeMetadata[to.path as keyof typeof routeMetadata] ?? routeMetadata['/']
  const url = `${siteUrl}${to.path === '/' ? '/' : to.path}`

  document.title = metadata.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description)
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
})

export default router
