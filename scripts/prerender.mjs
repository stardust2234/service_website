import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const projectRoot = dirname(root)
const dist = join(projectRoot, 'dist')
const template = await readFile(join(dist, 'index.html'), 'utf8')
const { render } = await import(pathToFileURL(join(projectRoot, '.prerender/entry-server.js')).href)
const appScript = template.match(/<script type="module"[^>]+><\/script>/)?.[0]
const stylesheetPath = template.match(/<link rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/)?.[1]
const stylesheet = stylesheetPath
  ? await readFile(join(dist, stylesheetPath.replace(/^\//, '')), 'utf8')
  : ''

const siteUrl = 'https://propelup.co.uk'
const businessName = 'Propel Up'
const articles = [
  ['drowning-in-business-admin', "Drowning in business admin? 12 tasks you don't need to do yourself"],
  ['bookkeeper-vs-accountant', 'Bookkeeper vs accountant: which do you actually need?'],
  ['chase-an-unpaid-invoice', 'How to chase an unpaid invoice without making it awkward'],
  ['do-i-need-a-virtual-assistant', "Do I need a virtual assistant? 8 signs it's time"],
  ['diy-bookkeeping', 'DIY bookkeeping: what a sole trader actually needs to keep track of'],
  ['virtual-assistant-cost-uk', 'How much does a virtual assistant cost in the UK?'],
  ['what-should-you-delegate-first', 'What should you delegate first?'],
  ['organise-business-receipts', 'How to organise your business receipts without the paperwork nightmare'],
]

const routes = [
  '/',
  '/tools',
  '/articles',
  ...articles.map(([slug]) => `/articles/${slug}`),
  '/cookies',
  '/privacy',
  '/terms',
]

const metadata = (route) => {
  const article = articles.find(([slug]) => route === `/articles/${slug}`)
  if (article) {
    return {
      title: `${article[1]} | ${businessName}`,
      description: article[1],
      type: 'article',
    }
  }

  const pages = {
    '/': ['Propel Up | Business support that keeps you moving', 'Flexible admin, customer support, invoicing and bookkeeping for busy small businesses.'],
    '/tools': [`Tools | ${businessName}`, `Practical tools from ${businessName} to help busy business owners understand and reduce their admin workload.`],
    '/articles': [`Articles | ${businessName}`, `Practical articles from ${businessName} about business admin, bookkeeping and delegation.`],
    '/cookies': [`Cookie Policy | ${businessName}`, `Read the ${businessName} cookie policy and learn how cookies and similar technologies are used on our website.`],
    '/privacy': [`Privacy Policy | ${businessName}`, `Read the ${businessName} privacy policy and learn how personal information is collected, used and protected.`],
    '/terms': [`Terms & Conditions | ${businessName}`, `Read the terms and conditions governing ${businessName} administrative, bookkeeping and virtual business support services.`],
  }
  const [title, description] = pages[route]
  return { title, description, type: 'website' }
}

const escapeAttribute = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')

for (const route of routes) {
  const page = metadata(route)
  const canonical = `${siteUrl}${route === '/' ? '/' : route}`
  const body = await render(route)
  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttribute(page.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttribute(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttribute(page.description)}" />`)
    .replace(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${page.type}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeAttribute(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeAttribute(page.description)}" />`)
    .replace(/<link rel="stylesheet"[^>]+>/, `<style data-inlined-styles>${stylesheet}</style>`)
    .replace(appScript ?? '', '')
    .replace('<div id="app"></div>', `<div id="app">${body}</div>`)
    .replace('</body>', `${appScript?.replace('></script>', ' fetchpriority="low"></script>') ?? ''}\n  </body>`)

  const output = join(dist, route === '/' ? 'index.html' : `${route.slice(1)}/index.html`)
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

await rm(join(projectRoot, '.prerender'), { recursive: true, force: true })
