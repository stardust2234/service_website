<script setup lang="ts">
import { useCalBooking } from '../../composables/useCalBooking'

const { handleBookingClick } = useCalBooking()
</script>

<template>
  <section id="contact" class="contact-panel">
    <div>
      <p class="eyebrow eyebrow-dark"><span class="eyebrow-line"></span> No pressure, just possibilities</p>
      <h2>Let’s get the<br /><em>weight off.</em></h2>
    </div>
    <div class="contact-action">
      <p>Book a free 20-minute introductory conversation and tell me what’s taking up too much of your time.</p>
      <a
        class="button button-dark"
        href="https://cal.com/propelup/20min"
        @click="handleBookingClick"
        data-cal-link="propelup/20min"
        data-cal-namespace="20min"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      >
        Book your free call <span aria-hidden="true">↗</span>
      </a>
    </div>
  </section>
</template>
