import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  envPrefix: ['VITE_', 'BUSINESS_EMAIL', 'BUSINESS_NAME', 'WEBSITE_URL', 'OWNER_NAME', 'LOCATION'],
})
