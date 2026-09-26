import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const sitemap = readFileSync(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8')

describe('sitemap', () => {
  it('includes every public route', () => {
    expect(sitemap).toContain('<loc>https://propelup.co.uk/</loc>')
    expect(sitemap).toContain('<loc>https://propelup.co.uk/cookies</loc>')
    expect(sitemap).toContain('<loc>https://propelup.co.uk/privacy</loc>')
    expect(sitemap).toContain('<loc>https://propelup.co.uk/terms</loc>')
  })
})
