import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Otimizações de build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor chunks para melhor caching
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    // Otimizações do servidor de desenvolvimento
    hmr: {
      overlay: false, // Desabilita overlay de erros para melhor performance
    },
  },
  optimizeDeps: {
    // Pré-bundle de dependências
    include: ['react', 'react-dom'],
  },
  css: {
    // Otimizações de CSS
    devSourcemap: false, // Desabilita sourcemap de CSS em desenvolvimento
  },
})