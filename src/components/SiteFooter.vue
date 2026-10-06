<script setup lang="ts">
import { siteConfig } from '../config'
</script>

<template>
  <footer class="footer">
    <span>© {{ new Date().getFullYear() }} {{ siteConfig.businessName }}</span>
    <span>Admin &amp; business support, thoughtfully done.</span>
    <nav class="footer-links" aria-label="Legal information">
      <a href="/cookies">Cookies</a>
      <a href="/privacy">Privacy policy</a>
      <a href="/terms">T&amp;C policy</a>
    </nav>
  </footer>
</template>
