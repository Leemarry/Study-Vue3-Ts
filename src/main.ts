/*
 * @Date: 2024-06-26 18:05:42
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-06-28 14:26:05
 * @FilePath: \Study-Vue3-Ts\src\main.ts
 * @Description: Do not edit
 */
import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import { antComponents } from '../antd'
import { createInstance } from '@/root'
import '@/styles/index.scss'
import '@/assets/icon/iconfont/iconfont.css'
const app = createInstance(App)

app.use(router).use(antComponents).mount('#demo-app')
