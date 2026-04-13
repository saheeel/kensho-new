import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor bundle
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          // Animation libs — large, separate for caching
          'vendor-gsap': ['gsap'],
          'vendor-lenis': ['@studio-freight/lenis'],
          // Markdown processing
          'vendor-markdown': ['gray-matter', 'react-markdown', 'buffer'],
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
