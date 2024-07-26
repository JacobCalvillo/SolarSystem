// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'
import path from 'path'

// Este import puede ser necesario para ciertas transformaciones de CommonJS
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({  
    plugins: [commonjs()],
    base:'https://JacobCalvillo.github.io/SolarSystem/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                earth: resolve(__dirname, 'src/js/earth.js'),
                index: resolve(__dirname, 'src/js/main.js'),
            },
        }
    }   
})
