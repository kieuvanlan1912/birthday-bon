import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
export default defineConfig({ base: '/birthday-bon/', plugins: [react()], resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }, build: { target: 'es2020', cssCodeSplit: true, chunkSizeWarningLimit: 1000, rollupOptions: { output: { manualChunks: { 'react-vendor':['react','react-dom','react-router-dom'], 'three-vendor':['three','@react-three/fiber','@react-three/drei'], 'motion-vendor':['framer-motion','gsap'] } } } } })
