
/*
 * @Date: 2024-06-26 18:09:52
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-03 13:55:01
 * @FilePath: \Study-Vue3-Ts\src\router\mainRouter.ts
 * @Description: Do not edit
 */
import { RouteMeta} from 'vue-router'
import { MyRouteRecord } from './routesType'


export const mainVue = import.meta.glob(['../views/Main-Page/**/*.vue'],{
  eager: true,
  import: 'default'
}) 
console.log('mainVue',mainVue);

export const mainPages=  import.meta.glob(['../views/Main-Page/**/*.ts'],{
  eager: true,
  import: 'default'
})

const mainRoutes :MyRouteRecord[] = Object.entries(mainPages).map(([path,meta])=>{
  const components = path.replace('/page.ts','/index.vue')
 path  = path.replace('../views/Main-Page','').replace('/page.ts','') || '/'
  return  {
    path,
    name: path.replace(/^\//, '').replace(/\//g, '-') || 'main', // 根据 path 生成一个 name（可选，取决于你的需求）,
    component:  mainVue[components]  , //About,
    meta:meta as RouteMeta  
  } as MyRouteRecord; // 这里我们使用了类型断言  
})

export default mainRoutes

                        
// 原文链接：https://blog.csdn.net/weixin_43025343/article/details/131793988