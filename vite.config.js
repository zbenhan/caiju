import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-cname',
      writeBundle() {
        // Copy CNAME file to dist directory
        copyFileSync(
          resolve(__dirname, 'CNAME'),
          resolve(__dirname, 'dist', 'CNAME')
        )
      }
    }
  ],
  base: './', // Use relative path for GitHub Pages deployment
})
