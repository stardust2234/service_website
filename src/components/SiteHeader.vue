<script setup lang="ts">
import { siteConfig } from '../config'
</script>

<template>
  <header class="topbar">
    <nav aria-label="Main navigation">
        <RouterLink class="brand" to="/" :aria-label="`${siteConfig.businessName} home`">
        <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
        <span>propel<span class="brand-dot">.</span>up</span>
      </RouterLink>
    </nav>
    <div class="nav-right">
      <RouterLink class="resources-link" to="/tools">Tools</RouterLink>
      <RouterLink class="resources-link" to="/articles">Articles</RouterLink>
      <span class="availability"><span class="status-dot"></span> Taking on new clients</span>
    </div>
  </header>
</template>
