<script setup lang="ts">
import ContactSection from '../components/home/ContactSection.vue'
import HeroSection from '../components/home/HeroSection.vue'
import ServicesSection from '../components/home/ServicesSection.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <SiteHeader />

    <main id="main-content">
      <HeroSection />
      <ServicesSection />
      <ContactSection />
    </main>

    <SiteFooter />
  </div>
</template>
