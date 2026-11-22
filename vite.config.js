import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to duplicate index.html to 404.html for GitHub Pages SPA routing
function copyIndexTo404() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const distPath = path.resolve(import.meta.dirname, 'dist')
      const indexPath = path.resolve(distPath, 'index.html')
      const notFoundPath = path.resolve(distPath, '404.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath)
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), copyIndexTo404()],
  base: '/ecommerce/',
})
