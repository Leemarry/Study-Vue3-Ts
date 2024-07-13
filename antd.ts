/*
 * @Date: 2024-06-26 18:33:51
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-06-26 19:05:30
 * @FilePath: \Study-Vue3-Ts\antd.ts
 * @Description: yarn remove antd  yarn add antd@^4.24.2
 */
// import Icon from '@ant-design/icons-vue'
import * as antDesign from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import "ant-design-vue/dist/reset.css";
import { App } from 'vue'
// import svgIcon from '/@/components/svgIcon.vue'

export const antComponents = {
  install (app: App): void {
    app.use(antDesign)
    // app.component('Icon', Icon)
    // app.component('svg-icon', svgIcon)
  }
}
