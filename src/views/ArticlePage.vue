<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'
import { articles, getArticleContent } from '../content/articleIndex'

const props = defineProps<{ slug: string }>()
const article = computed(() => articles.find((item) => item.slug === props.slug))
const content = computed(() => article.value ? getArticleContent(article.value.slug) : undefined)
const renderedContent = computed(() => content.value ? marked.parse(content.value) : '')
</script>

<template>
  <div class="site-shell support-shell">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />

    <main id="main-content" class="article-reader">
      <RouterLink class="article-back-link" to="/articles">← All articles</RouterLink>
      <p class="eyebrow"><span class="eyebrow-line"></span> Article</p>
      <h1>{{ article?.title ?? 'Article not found' }}</h1>
      <div class="article-body" v-html="renderedContent"></div>

      <template v-if="article?.slug === 'drowning-in-business-admin'">
        <RouterLink class="article-tool-link" to="/tools">Try the Admin calculator <span aria-hidden="true">↗</span></RouterLink>
        <div class="article-cta">
          <p>A 20-minute introduction is enough to talk through what's currently taking up your time and where support could make things easier.</p>
          <a class="button button-primary" href="https://cal.com/propelup/20min">Book a 20-minute introduction <span aria-hidden="true">↗</span></a>
        </div>
      </template>
    </main>

    <SiteFooter />
  </div>
</template>
