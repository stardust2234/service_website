<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import { siteConfig } from '../config'

const props = defineProps<{ content: string }>()
const renderedContent = computed(() => {
  const variables: Record<string, string> = {
    BUSINESS_EMAIL: siteConfig.businessEmail,
    BUSINESS_NAME: siteConfig.businessName,
    WEBSITE_URL: siteConfig.websiteUrl,
    OWNER_NAME: siteConfig.ownerName,
    LOCATION: siteConfig.location,
  }

  const content = props.content.replace(/\{\{(BUSINESS_EMAIL|BUSINESS_NAME|WEBSITE_URL|OWNER_NAME|LOCATION)\}\}/g, (_, key: string) => variables[key])
  return marked.parse(content) as string
})
</script>

<template>
  <div class="site-shell legal-shell">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <header class="topbar">
      <nav aria-label="Main navigation">
        <RouterLink class="brand" to="/" :aria-label="`${siteConfig.businessName} home`">
          <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
          <span>propel<span class="brand-dot">.</span>up</span>
        </RouterLink>
      </nav>
      <RouterLink class="legal-home-link" to="/">Back to home</RouterLink>
    </header>

    <main id="main-content" class="legal-content">
      <article class="legal-document" v-html="renderedContent"></article>
    </main>

    <footer class="footer">
      <span>© {{ new Date().getFullYear() }} {{ siteConfig.businessName }}</span>
      <nav class="footer-links" aria-label="Legal information">
        <RouterLink to="/cookies">Cookies</RouterLink>
        <RouterLink to="/privacy">Privacy policy</RouterLink>
        <RouterLink to="/terms">T&amp;C policy</RouterLink>
      </nav>
    </footer>
  </div>
</template>
