<script setup lang="ts">
import { Calculator, Handshake, ListChecks, Workflow } from '@lucide/vue'

const services = [
  {
    icon: ListChecks,
    title: 'Make room',
    label: 'Productivity & delegation',
    detail: 'Move the jobs that keep interrupting your best work off your plate and into capable hands.',
    tasks: ['Inbox and calendar triage', 'Follow-ups and recurring tasks', 'Research, data entry and light project support'],
  },
  {
    icon: Workflow,
    title: 'Keep things organised',
    label: 'Admin & systems',
    detail: 'Create simple, reliable ways of working so information is easy to find and nothing gets missed.',
    tasks: ['Customer records and CRM updates', 'Document templates and file organisation', 'Practical workflows for everyday admin'],
  },
  {
    icon: Calculator,
    title: 'Know your numbers',
    label: 'Bookkeeping',
    detail: 'Stay on top of the financial admin and get a clearer view of how your business is doing.',
    tasks: ['Invoices, bills and expense tracking', 'Bank reconciliations and record keeping', 'Accounts information prepared for your accountant'],
  },
  {
    icon: Handshake,
    title: 'Behind the business',
    label: 'Working with me',
    detail: 'A dependable extra pair of hands, shaped around what your business needs right now.',
    tasks: ['Flexible ongoing or one-off support', 'Clear communication and agreed priorities', 'Thoughtful, no-fuss support that grows with you'],
  },
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
          <span>
            <h3 class="service-title">{{ service.title }}</h3>
            <span class="service-label">{{ service.label }}</span>
          </span>
          <span class="service-arrow" aria-hidden="true">↗</span>
        </summary>
        <p class="service-detail">{{ service.detail }}</p>
        <ul class="service-tasks">
          <li v-for="task in service.tasks" :key="task">{{ task }}</li>
        </ul>
      </details>
    </div>
  </section>
</template>
