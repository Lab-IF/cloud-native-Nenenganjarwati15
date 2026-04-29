import { defineConfig } from 'vite'

export default defineConfig({
  // Base path for GitHub Pages deployment
  // Change this to your repo name if deploying to github.io/<repo-name>/
  base: './',
  
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate source maps for debugging
    sourcemap: false,
    
    // Minify output
    minify: 'esbuild',
    
    // Asset handling
    assetsDir: 'assets',
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  
  server: {
    // Development server port
    port: 3000,
    open: true
  },
  
  preview: {
    // Preview server port
    port: 4173
  }
})
