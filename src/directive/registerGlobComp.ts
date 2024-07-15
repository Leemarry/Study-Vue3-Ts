

import { install } from 'ant-design-vue'
import { App } from 'vue'
import AlSvgIcon from '@/components/AlSvgIcon/index.vue'
// import * as ElIconModules from '@element-plus/icons'
export const registerGlobComp = {
    install(app: App) {
        app.component('AlSvgIcon', AlSvgIcon)
        // for (const iconName in ElIconModules) {
        //     if (Reflect.has(ElIconModules, iconName)) {
        //       app.component(iconName, ElIconModules[iconName])
        //     }
        //   }
    }

}