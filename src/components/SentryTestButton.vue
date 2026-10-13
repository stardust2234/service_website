<script setup lang="ts">
function triggerError() {
  throw new Error('Sentry Test Error')
}
</script>

<template>
  <button type="button" @click="triggerError">Break the world</button>
</template>
