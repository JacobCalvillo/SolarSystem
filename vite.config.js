// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'
import path from 'path'

// Este import puede ser necesario para ciertas transformaciones de CommonJS
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  build: {
    rollupOptions: {
        input: {
            main: resolve(__dirname, './src/index.html')
          },
          external: ['/three/examples/jsm/Addons.js'],
      plugins: [
        commonjs(), // Asegúrate de incluir este plugin si usas módulos CommonJS
      ],
    },
    outDir: 'dist', // Asegúrate de que esta ruta sea correcta para tu proyecto
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Cambia según tu estructura de carpetas
    }
  }, base:'https://JacobCalvillo.github.io/'
})
