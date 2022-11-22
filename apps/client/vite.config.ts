import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
   server: {
      port: 3000,
      // proxy: { '/api': { target: 'http://localhost:3001/api', changeOrigin: true } },
      proxy: {
         '/api': {
            target: 'http://localhost:3001/api',
            changeOrigin: true,
            secure: false,
            rewrite: path => path.replace('/api', ''),
         },
      },
   },
   optimizeDeps: {
      include: ['@online-library/config', '@online-library/core', '@online-library/logic'],
   },
   build: { commonjsOptions: { include: [/config/, /core/, /logic/, /node_modules/] } },
   resolve: { alias: { 'react-native': 'react-native-web' } },
   define: { global: '({})' },
   plugins: [
      tsconfigPaths(),
      react({ babel: { plugins: [['babel-plugin-styled-components']] } }),
      VitePWA({
         devOptions: { enabled: true },
         registerType: 'prompt',
         manifest: {
            short_name: 'Online Library',
            name: 'Online Library',
            description: 'Online Library',
            theme_color: '#0088ff',
            background_color: 'white',
            icons: [
               {
                  src: '/favicons/android-chrome-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
               },
               {
                  src: '/favicons/android-chrome-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
               },
            ],
         },
         includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      }),
   ],
})
