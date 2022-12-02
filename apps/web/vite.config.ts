import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
   const env = loadEnv(mode, process.cwd())

   const htmlPlugin = () => ({
      name: 'html-transform',
      transformIndexHtml: (html: string) => html.replace(/%(.*?)%/g, (_, p1) => env[p1]),
   })

   return {
      server: {
         host: true,
         port: 3000,
         proxy: {
            '/api': { target: 'http://localhost:3001' },
            '/graphql': { target: 'http://localhost:3001/graphql' },
            '/socket.io': { target: 'http://localhost:3001/socket.io' },
         },
      },
      resolve: { alias: { 'react-native': './node_modules/react-native-web/dist/index.js' } },
      optimizeDeps: {
         include: ['@online-library/config', '@online-library/core', '@online-library/logic'],
      },
      build: {
         commonjsOptions: {
            // a "must have" to fix builds (it fails probably due to the hoisted packages)
            include: [/node_modules/, /config/, /core/, /logic/, /react-native-web/],
         },
      },
      plugins: [
         htmlPlugin(),
         tsconfigPaths(),
         react({ babel: { plugins: [['babel-plugin-styled-components']] } }),
         VitePWA({
            workbox: { importScripts: ['sw.ts'] },
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
   }
})
