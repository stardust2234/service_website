<script setup lang="ts">
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'
import { articles } from '../content/articleIndex'
</script>

<template>
  <div class="site-shell support-shell">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />

    <main id="main-content" class="support-content">
      <div class="support-intro">
        <p class="eyebrow"><span class="eyebrow-line"></span> Articles</p>
        <h1>Practical notes for <em>busy owners.</em></h1>
        <p>Useful, no-fuss guidance for making business admin, bookkeeping and delegation feel more manageable.</p>
      </div>

      <section class="article-preview" aria-labelledby="article-preview-title">
        <div class="article-grid">
          <article v-for="(article, index) in articles.slice(0, 2)" :key="article.slug" class="article-card">
            <span class="article-number">0{{ index + 1 }}</span>
            <h3>{{ article.title }}</h3>
            <RouterLink v-if="index === 0" class="article-link" :to="`/articles/${article.slug}`">Read article <span aria-hidden="true">↗</span></RouterLink>
            <p v-else>Coming soon <span aria-hidden="true">↗</span></p>
          </article>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
