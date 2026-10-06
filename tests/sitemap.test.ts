import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { XMLParser } from 'fast-xml-parser'
import { describe, expect, it } from 'vitest'

const sitemap = readFileSync(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8')
const parsedSitemap = new XMLParser().parse(sitemap)
const routes = new Set(parsedSitemap.urlset.url.map(({ loc }: { loc: string }) => loc))

describe('sitemap', () => {
  it('includes every public route', () => {
    expect(routes).toEqual(new Set([
      'https://propelup.co.uk/',
       'https://propelup.co.uk/tools',
       'https://propelup.co.uk/articles',
       'https://propelup.co.uk/articles/drowning-in-business-admin',
       'https://propelup.co.uk/articles/bookkeeper-vs-accountant',
       'https://propelup.co.uk/articles/chase-an-unpaid-invoice',
       'https://propelup.co.uk/articles/do-i-need-a-virtual-assistant',
       'https://propelup.co.uk/articles/diy-bookkeeping',
       'https://propelup.co.uk/articles/virtual-assistant-cost-uk',
       'https://propelup.co.uk/articles/what-should-you-delegate-first',
       'https://propelup.co.uk/articles/organise-business-receipts',
      'https://propelup.co.uk/cookies',
      'https://propelup.co.uk/privacy',
      'https://propelup.co.uk/terms',
    ]))
  })
})
