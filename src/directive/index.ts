/*
 * @Descripttion:
 * @version:
 * @Author: Eugene
 * @Date: 2024-04-15 10:47:39
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-15 18:40:32
 */
// import { App } from "vue";
// import useDragWindowDirective from "./drag-window";
// import useClickWindowDirective from "./click-window";
// import panel from "./panel-border";

// export function useDirectives (app: App): void {
//   useDragWindowDirective(app)
//   useClickWindowDirective(app)
//   panel(app)
// }

import { App, Directive } from 'vue'
import hightlight from './hightlight'
// import drag from './drag'

// 定义指令类型
interface Directives {
   [key: string]: Directive<any, any>;
}

const directives: Directives = {
  // 汇总自定义指令
  hightlight,
}

export default {
  // 导出自定义指令
  install (app: App<Element>) {
    // 以安装的方式插到app中
    Object.keys(directives).forEach((key) => {
      // 遍历directives对象的key
      app.directive(key, directives[key]) // 将每个directive注册到app中
    })
  },
}
