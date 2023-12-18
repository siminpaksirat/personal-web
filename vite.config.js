import glsl from 'vite-plugin-glsl'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import gsap from 'gsap';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],

  define: {
    'window.gsap': gsap,
  },
})
