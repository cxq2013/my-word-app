import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '刷题背单词小助手',
        short_name: '刷题助手',
        description: '一款帮助你刷题背单词的小程序',
        theme_color: '#3eaf7c',
        icons: [
          {
            src: 'https://cdn.jsdelivr.net/gh/hustcc/vite-plugin-mkdocs-theme@main/docs/assets/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/hustcc/vite-plugin-mkdocs-theme@main/docs/assets/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ]
      },
      workbox: {
        // 定义需要预缓存的文件类型
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,gif}'],
        // 运行时缓存策略配置
        runtimeCaching: [
          {
            // 匹配所有以 /api 开头的请求
            urlPattern: ({ url }) => url.pathname.startsWith('/api'),
            // 使用 NetworkFirst 策略：优先从网络获取，失败时使用缓存
            handler: 'NetworkFirst',
          }
        ]
      },
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
