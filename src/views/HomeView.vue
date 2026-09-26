<script setup lang="ts">
import { Calculator, ClipboardList, Headset } from '@lucide/vue'

type CalFunction = ((...args: unknown[]) => void) & {
  config?: { forwardQueryParams?: boolean }
  loaded?: boolean
  ns?: Record<string, CalFunction>
  q?: unknown[]
}

declare global {
  interface Window {
    Cal?: CalFunction
  }
}

const services = [
  { icon: ClipboardList, title: 'Admin', detail: 'Inboxes, scheduling, data entry, documents and customer records.' },
  { icon: Calculator, title: 'Bookkeeping', detail: 'Invoices, expenses, reconciliations and record keeping.' },
  { icon: Headset, title: 'Virtual support', detail: 'Customer enquiries, follow-ups, research, CRM updates and other flexible tasks.' },
]

let calLoadPromise: Promise<void> | undefined
let calReady = false

function loadCal() {
  if (calLoadPromise) return calLoadPromise

  calLoadPromise = new Promise((resolve, reject) => {
    const cal = ((...args: unknown[]) => {
      cal.q ??= []

      if (args[0] === 'init' && typeof args[1] === 'string') {
        cal.ns ??= {}
        const namespace = args[1]
        const api = cal.ns[namespace] ?? (((...apiArgs: unknown[]) => {
          api.q ??= []
          api.q.push(apiArgs)
        }) as CalFunction)
        api.q ??= []
        cal.ns[namespace] = api
        api.q.push(args)
        cal.q.push(['initNamespace', namespace])
      } else {
        cal.q.push(args)
      }
    }) as CalFunction

    cal.q = []
    cal.ns = {}
    window.Cal = cal
    cal('init', '20min', { origin: 'https://app.cal.com' })
    cal.config = { forwardQueryParams: true }
    cal.ns['20min']?.('ui', { hideEventTypeDetails: false, layout: 'month_view' })

    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    script.onload = () => {
      calReady = true
      resolve()
    }
    script.onerror = () => {
      calLoadPromise = undefined
      reject(new Error('Cal.com failed to load'))
    }
    document.head.appendChild(script)
  })

  return calLoadPromise
}

async function handleBookingClick(event: MouseEvent) {
  if (calReady) return

  event.preventDefault()
  const link = event.currentTarget as HTMLAnchorElement

  try {
    await loadCal()
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
  } catch {
    window.location.assign(link.href)
  }
}
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <header class="topbar">
      <nav aria-label="Main navigation">
        <a class="brand" href="#top" aria-label="Propel Up home">
          <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
          <span>propel<span class="brand-dot">.</span>up</span>
        </a>
      </nav>
      <div class="nav-right">
        <span class="availability"><span class="status-dot"></span> Taking on new clients</span>
      </div>
    </header>

    <main id="main-content">
      <section id="top" class="hero">
      <div>
        <p class="eyebrow"><span class="eyebrow-line"></span> Admin · books · breathing room</p>
        <h1>Less admin.<br /><em>More space</em><br />to move forward.</h1>
        <p class="hero-intro">Flexible business support for busy small businesses, from everyday admin and customer support to invoicing and bookkeeping.</p>
        <a class="button button-primary" href="#contact">Book a free chat <span aria-hidden="true">↗</span></a>
      </div>

      <div class="hero-art" aria-hidden="true">
        <div class="art-orbit orbit-one"></div>
        <div class="art-orbit orbit-two"></div>
        <div class="sun-shape"></div>
        <div class="art-note note-one"><span class="note-check">✓</span><span>inbox<br /><strong>cleared</strong></span></div>
        <div class="art-note note-two"><span class="note-number">£</span><span>books<br /><strong>balanced</strong></span></div>
        <div class="art-label">A little<br /><em>lighter.</em></div>
        <div class="plant plant-left"><i></i><i></i><i></i><b></b></div>
        <div class="plant plant-right"><i></i><i></i><i></i><b></b></div>
        <div class="desk-line"></div>
      </div>
      </section>

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
    </main>

    <footer class="footer">
      <span>© {{ new Date().getFullYear() }} Propel Up</span>
      <span>Admin &amp; business support, thoughtfully done.</span>
      <nav class="footer-links" aria-label="Legal information">
        <RouterLink to="/cookies">Cookies</RouterLink>
        <RouterLink to="/privacy">Privacy policy</RouterLink>
        <RouterLink to="/terms">T&amp;C policy</RouterLink>
      </nav>
      <details class="privacy-notice">
        <summary>Privacy notice</summary>
        <p>
          When you book a call, your details are processed by Cal.com to manage the appointment,
          reminders and calendar booking. This site also loads fonts from Google Fonts. These
          services may process technical information such as your IP address. UK and EU visitors
          can request access to, correction or deletion of their personal data. <a href="mailto:contact@propelup.co.uk">Contact</a> Propel Up about a booking or privacy question.
        </p>
      </details>
    </footer>
  </div>
</template>
