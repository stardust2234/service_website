<template>
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
</template>
