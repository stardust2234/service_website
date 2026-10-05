<script setup lang="ts">
import { ChevronDown, ChevronUp } from '@lucide/vue'
import { computed, ref } from 'vue'

const tasks = ref([
  { name: 'Email', hours: 3 },
  { name: 'Scheduling', hours: 2 },
  { name: 'Invoicing', hours: 2 },
  { name: 'Bookkeeping', hours: 3 },
  { name: 'Customer follow-up', hours: 2 },
])

const weeklyTotal = computed(() => tasks.value.reduce((total, task) => {
  const hours = Math.min(168, Math.max(0, Number(task.hours) || 0))
  return total + hours
}, 0))
const monthlyTotal = computed(() => Math.round(weeklyTotal.value * 4.33))

const adjustHours = (task: { hours: number }, amount: number) => {
  task.hours = Math.min(168, Math.max(0, Number(task.hours || 0) + amount))
}

const normalizeHours = (task: { hours: number }) => {
  task.hours = Math.min(168, Math.max(0, Number(task.hours) || 0))
}
</script>

<template>
  <section class="admin-calculator" aria-labelledby="calculator-title">
    <div class="calculator-intro">
      <p class="eyebrow"><span class="eyebrow-line"></span> Admin calculator</p>
      <h2 id="calculator-title">How much time is hiding in your <em>admin?</em></h2>
      <p>Add up the hours you spend on regular business support tasks each week. The result shows what could potentially be freed up.</p>
    </div>

    <div class="calculator-card">
      <div class="calculator-fields">
        <div v-for="task in tasks" :key="task.name" class="calculator-field">
          <label :for="`hours-${task.name}`">{{ task.name }}</label>
          <div class="number-input">
            <input :id="`hours-${task.name}`" v-model.number="task.hours" type="number" min="0" max="168" step="0.5" inputmode="decimal" @change="normalizeHours(task)" />
            <div class="spinner-controls">
              <button type="button" :aria-label="`Increase ${task.name} hours`" @click="adjustHours(task, 0.5)"><ChevronUp :size="12" aria-hidden="true" /></button>
              <button type="button" :aria-label="`Decrease ${task.name} hours`" @click="adjustHours(task, -0.5)"><ChevronDown :size="12" aria-hidden="true" /></button>
            </div>
            <span>hrs</span>
          </div>
        </div>
      </div>

      <div class="calculator-result" aria-live="polite">
        <p>You spend approximately</p>
        <strong>{{ weeklyTotal }} <span>hours/week</span></strong>
        <p>on business support tasks.</p>
        <div class="monthly-result">That’s around <strong>{{ monthlyTotal }} hours</strong> every month that could potentially be freed up.</div>
      </div>
    </div>
  </section>
</template>
