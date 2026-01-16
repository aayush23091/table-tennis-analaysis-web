const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')

module.exports = defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'recharts': ['recharts'],
          'react-vendor': ['react', 'react-dom']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts']
  }
})