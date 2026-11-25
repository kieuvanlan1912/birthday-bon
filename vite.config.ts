import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
export default defineConfig({ base: '/birthday-bon/', plugins: [react(),legacy({targets:['Chrome >= 53','not IE 11'],modernPolyfills:true})], resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }, build: { target: 'es2017', cssCodeSplit: true, chunkSizeWarningLimit: 1000, rollupOptions: { output: { manualChunks: { 'react-vendor':['react','react-dom','react-router-dom'], 'three-vendor':['three','@react-three/fiber','@react-three/drei'], 'motion-vendor':['framer-motion','gsap'] } } } } })
