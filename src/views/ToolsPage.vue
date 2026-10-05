<script setup lang="ts">
import AdminCalculator from '../components/AdminCalculator.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'
</script>

<template>
  <div class="site-shell support-shell">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />

    <main id="main-content" class="support-content">
      <div class="support-intro">
        <p class="eyebrow"><span class="eyebrow-line"></span> Tools</p>
        <h1>Useful tools for <em>busy owners.</em></h1>
        <p>Simple ways to get a clearer view of your time, your admin and the jobs that could be made lighter.</p>
      </div>

      <AdminCalculator />

      <RouterLink class="button button-primary support-cta" to="/#contact">Let’s talk about what you need <span aria-hidden="true">↗</span></RouterLink>
    </main>

    <SiteFooter />
  </div>
</template>
