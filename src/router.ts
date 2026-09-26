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

const notFoundMetadata = {
  title: 'Page Not Found | Propel Up',
  description: 'The page you are looking for does not exist or may have moved.',
}

const updateMeta = (selector: string, attribute: string, attributeValue: string, content: string | null) => {
  let element = document.querySelector<HTMLMetaElement>(selector)

  if (content === null) {
    element?.remove()
    return
  }

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, attributeValue)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

const updateCanonical = (url: string | null) => {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (url === null) {
    element?.remove()
    return
  }

  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }

  element.href = url
}

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
  const metadata = routeMetadata[to.path as keyof typeof routeMetadata] ?? notFoundMetadata
  const isNotFound = !(to.path in routeMetadata)
  const url = `${siteUrl}${to.path === '/' ? '/' : to.path}`

  document.title = metadata.title
  updateMeta('meta[name="description"]', 'name', 'description', metadata.description)
  updateMeta('meta[property="og:title"]', 'property', 'og:title', metadata.title)
  updateMeta('meta[property="og:description"]', 'property', 'og:description', metadata.description)
  updateMeta('meta[property="og:url"]', 'property', 'og:url', isNotFound ? null : url)
  updateMeta('meta[name="robots"]', 'name', 'robots', isNotFound ? 'noindex,nofollow' : null)
  updateCanonical(isNotFound ? null : url)
})

export default router
