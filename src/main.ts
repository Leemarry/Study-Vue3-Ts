/*
 * @Date: 2024-06-26 18:05:42
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-15 18:29:35
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
import {registerGlobComp} from '@/directive/registerGlobComp'
import useDirectives from '@/directive'
const app = createInstance(App)

app.use(antComponents) // ant-dis
// registerGlobComp(app)
// app.component('SvgIcon', SvgIcon)
app.use(registerGlobComp)
app.use(useDirectives)

app.use(router).use(antComponents).mount('#demo-app')
