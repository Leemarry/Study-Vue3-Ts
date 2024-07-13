/*
 * @Date: 2024-06-26 18:05:42
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-06-28 17:24:30
 * @FilePath: \Study-Vue3-Ts\vite.config.ts
 * @Description: Do not edit
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
import path from 'path' // 这个语句是将整个 path 模块作为默认导出引入，因此在内部文件中可以直接使用 path 对象的方法和属性，例如：


const resolve = (dir:string)=>path.resolve(__dirname,'.',dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    cesium(), // 使用cesium插件 npm uninstall
  ],
  server: {
    open: true,
    host: "0.0.0.0",
    port: 9099,
    //vue3 vite配置热更新不用手动刷新
    hmr: true,
    proxy: {

      // '/api': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
      //    target: 'https://172.20.9.153:8085', // 目标地址 --> 服务器地址
      //    changeOrigin: true, // 允许跨域
      //    ws: true,  // 允许websocket代理
      //    // 重写路径 --> 作用与vue配置pathRewrite作用相同
      //    rewrite: (path) => path.replace(/^\/api/, "")
      // }
      '/image': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: 'http://127.0.0.1:9090/ceshi', // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
        ws: true,  // 允许websocket代理
        // 重写路径 --> 作用与vue配置pathRewrite作用相同
        rewrite: (path) => path.replace(/^\/image/, ''),
        bypass (req, res, options: any) {
          const proxyURL = options.target + options.rewrite(req.url)
          console.log('proxyURL', proxyURL)
          req.headers['x-req-proxyURL'] = proxyURL // 设置未生效
          res.setHeader('x-req-proxyURL', proxyURL) // 设置响应头可以看到
        },
      }



    },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    // alias: [
    //   {
    //     // https://github.com/vitejs/vite/issues/279#issuecomment-635646269
    //     find: '@/',
    //     replacement: path.resolve(__dirname, './src/'),
    //   },
    // ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/design/styles/variables";`
        // dont need include file extend .scss
        additionalData: '@import "./src/styles/variables";',
      },
    },
  },
  base: '/',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    // 禁用 gzip 压缩大小报告，可略微减少打包时间
    reportCompressedSize: false,
    // 规定触发警告的 chunk 大小
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      // 配置rollup
      output: {
        // 配置rollup输出选项
        // Static resource classification and packaging//静态资源分类打包
        chunkFileNames: 'assets/js/[name]-[hash].js', // 代码块文件名
        entryFileNames: 'assets/js/[name]-[hash].js', // 入口文件名
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // 资源文件名
        manualChunks (id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
  },
})
