<script setup lang="ts">
import { Calculator, ClipboardList, Headset } from '@lucide/vue'

const services = [
  { icon: ClipboardList, title: 'Admin', detail: 'Inboxes, scheduling, data entry, documents and customer records.' },
  { icon: Calculator, title: 'Bookkeeping', detail: 'Invoices, expenses, reconciliations and record keeping.' },
  { icon: Headset, title: 'Virtual support', detail: 'Customer enquiries, follow-ups, research, CRM updates and other flexible tasks.' },
]
</script>

<template>
  <section class="services" aria-labelledby="services-heading">
    <div class="section-heading">
      <p class="eyebrow"><span class="eyebrow-line"></span> The useful stuff</p>
      <h2 id="services-heading">Support that<br /><em>makes room.</em></h2>
    </div>
    <div class="service-list">
      <details v-for="service in services" :key="service.title" class="service-item">
        <summary class="service-summary">
          <span class="service-icon"><component :is="service.icon" :size="20" :stroke-width="1.6" aria-hidden="true" /></span>
          <span class="service-title" role="heading" aria-level="3">{{ service.title }}</span>
          <span class="service-arrow" aria-hidden="true">↗</span>
        </summary>
        <p class="service-detail">{{ service.detail }}</p>
      </details>
    </div>
  </section>
</template>
