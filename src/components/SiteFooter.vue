<script setup lang="ts">
import { siteConfig } from '../config'
</script>

<template>
  <footer class="footer">
    <span>© {{ new Date().getFullYear() }} {{ siteConfig.businessName }}</span>
    <span>Admin &amp; business support, thoughtfully done.</span>
    <nav class="footer-links" aria-label="Legal information">
      <RouterLink to="/cookies">Cookies</RouterLink>
      <RouterLink to="/privacy">Privacy policy</RouterLink>
      <RouterLink to="/terms">T&amp;C policy</RouterLink>
    </nav>
  </footer>
</template>
