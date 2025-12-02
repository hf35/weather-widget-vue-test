import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [vue({ customElement: true }), tailwindcss()],

  server: {
    port: 5173,
  },


  compilerOptions: {
    "jsx": "preserve",
    "types": ["vite/client"]
  },

  build: {
    lib: {
      entry: 'src/widget.js',
      name: 'WeatherWidget',
      fileName: () => 'app.js',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false
  },

});
