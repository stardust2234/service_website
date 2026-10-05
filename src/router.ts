import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import LegalPage from './views/LegalPage.vue'
import NotFoundView from './views/NotFoundView.vue'
import ArticlesPage from './views/ArticlesPage.vue'
import ArticlePage from './views/ArticlePage.vue'
import ToolsPage from './views/ToolsPage.vue'
import cookies from './content/cookies.md?raw'
import privacy from './content/privacy.md?raw'
import terms from './content/terms.md?raw'
import { siteConfig } from './config'
import { articles } from './content/articleIndex'

const siteUrl = siteConfig.websiteUrl

const routeMetadata = {
  '/': {
    title: `${siteConfig.businessName} | Business support that keeps you moving`,
    description: 'Flexible admin, customer support, invoicing and bookkeeping for busy small businesses.',
  },
  '/tools': {
    title: `Tools | ${siteConfig.businessName}`,
    description: `Practical tools from ${siteConfig.businessName} to help busy business owners understand and reduce their admin workload.`,
  },
  '/articles': {
    title: `Articles | ${siteConfig.businessName}`,
    description: `Practical articles from ${siteConfig.businessName} about business admin, bookkeeping and delegation.`,
  },
  '/cookies': {
    title: `Cookie Policy | ${siteConfig.businessName}`,
    description: `Read the ${siteConfig.businessName} cookie policy and learn how cookies and similar technologies are used on our website.`,
  },
  '/privacy': {
    title: `Privacy Policy | ${siteConfig.businessName}`,
    description: `Read the ${siteConfig.businessName} privacy policy and learn how personal information is collected, used and protected.`,
  },
  '/terms': {
    title: `Terms & Conditions | ${siteConfig.businessName}`,
    description: `Read the terms and conditions governing ${siteConfig.businessName} administrative, bookkeeping and virtual business support services.`,
  },
} as const

const notFoundMetadata = {
  title: `Page Not Found | ${siteConfig.businessName}`,
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
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/', component: HomeView },
    { path: '/tools', component: ToolsPage },
    { path: '/articles', component: ArticlesPage },
    {
      path: '/articles/:slug',
      component: ArticlePage,
      props: true,
      beforeEnter: (to) => articles.some((article) => article.slug === to.params.slug) || { name: 'not-found' },
    },
    { path: '/cookies', component: LegalPage, props: { content: cookies } },
    { path: '/privacy', component: LegalPage, props: { content: privacy } },
    { path: '/terms', component: LegalPage, props: { content: terms } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

router.afterEach((to) => {
  const article = to.path.startsWith('/articles/')
    ? articles.find((item) => item.slug === to.params.slug)
    : undefined
  const metadata = routeMetadata[to.path as keyof typeof routeMetadata]
    ?? (article
      ? {
          title: `${article.title} | ${siteConfig.businessName}`,
          description: article.title,
        }
      : notFoundMetadata)
  const isNotFound = !(to.path in routeMetadata) && !article
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
