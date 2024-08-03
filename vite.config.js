// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'


// Este import puede ser necesario para ciertas transformaciones de CommonJS

export default defineConfig({
    server: {
        port: 3000,
    },  
    base:'https://JacobCalvillo.github.io/SolarSystem/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                nested: resolve(__dirname, 'src/earth.html'),
                index: resolve(__dirname, 'src/js/main.js'),
            },
        }
    }   
})
