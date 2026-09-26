<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <header class="topbar">
      <nav aria-label="Main navigation">
        <RouterLink class="brand" to="/" aria-label="Propel Up home">
          <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
          <span>propel<span class="brand-dot">.</span>up</span>
        </RouterLink>
      </nav>
      <RouterLink class="legal-home-link" to="/">Back to home</RouterLink>
    </header>

    <main id="main-content" class="legal-content">
      <article class="legal-document">
        <p class="eyebrow"><span class="eyebrow-line"></span> Page not found</p>
        <h1>That page<br /><em>moved on.</em></h1>
        <p>The page you are looking for does not exist or may have moved.</p>
        <RouterLink class="button button-primary" to="/">Return home <span aria-hidden="true">↗</span></RouterLink>
      </article>
    </main>
  </div>
</template>
