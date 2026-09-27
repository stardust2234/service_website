<script setup lang="ts">
import { siteConfig } from '../config'
</script>

<template>
  <header class="topbar">
    <nav aria-label="Main navigation">
        <a class="brand" href="#top" :aria-label="`${siteConfig.businessName} home`">
        <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
        <span>propel<span class="brand-dot">.</span>up</span>
      </a>
    </nav>
    <div class="nav-right">
      <span class="availability"><span class="status-dot"></span> Taking on new clients</span>
    </div>
  </header>
</template>
