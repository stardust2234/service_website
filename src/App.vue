<script setup lang="ts">
import SentryTestButton from './components/SentryTestButton.vue'

const showSentryTestButton = import.meta.env.DEV
</script>

<template>
  <RouterView />
  <SentryTestButton v-if="showSentryTestButton" />
</template>
