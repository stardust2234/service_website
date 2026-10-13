import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), sentryVitePlugin({
    org: "libranode",
    project: "propelup-website"
  })],

  envPrefix: ['VITE_', 'BUSINESS_EMAIL', 'BUSINESS_NAME', 'WEBSITE_URL', 'OWNER_NAME', 'LOCATION'],

  build: {
    sourcemap: true
  }
})
