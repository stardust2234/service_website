<script setup lang="ts">
import { siteConfig } from '../config'
</script>

<template>
  <footer class="footer">
    <span>© {{ new Date().getFullYear() }} {{ siteConfig.businessName }}</span>
    <a href="https://ellie.libranode.dev/" target="_blank" rel="noopener noreferrer">website made by me</a>
    <nav class="footer-links" aria-label="Legal information">
      <a href="/cookies">Cookies</a>
      <a href="/privacy">Privacy policy</a>
      <a href="/terms">T&amp;C policy</a>
    </nav>
  </footer>
</template>
