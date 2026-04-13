import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-core';
            }
            if (id.includes('gsap') || id.includes('lenis')) {
              return 'vendor-animation';
            }
            if (id.includes('gray-matter') || id.includes('react-markdown') || id.includes('buffer')) {
              return 'vendor-markdown';
            }
            return 'vendor'; // all other node_modules
          }
        },
      },
    },
    // Inline small assets directly into HTML
    assetsInlineLimit: 4096,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify
    minify: 'esbuild',
    // Target modern browsers for smaller output
    target: 'es2020',
    // Warn on large chunks
    chunkSizeWarningLimit: 600,
  },
})
