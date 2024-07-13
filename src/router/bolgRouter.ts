
/*
 * @Date: 2024-06-26 18:09:52
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-04 19:43:22
 * @FilePath: \Study-Vue3-Ts\src\router\BolgRouter.ts
 * @Description: Do not edit
 */
import { RouteMeta} from 'vue-router'
import { MyRouteRecord } from './routesType'

 // 
// 定义命名空间常量  
const namespace = 'Bolg';  
export const comVue = import.meta.glob([`../views/Bolgs-Page/**/*.vue`],{
  eager: true,
  import: 'default'
}) 


export const pages=  import.meta.glob(['../views/Bolgs-Page/**/*.ts'],{
  eager: true,
  import: 'default'
})

const routers :MyRouteRecord[] = Object.entries(pages).map(([path,meta])=>{
  const components = path.replace('/page.ts','/index.vue')
 path  = path.replace('../views','').replace('/page.ts','') || '/' ///Bolg
 
  return  {
    path,
    name: path.replace(/^\//, '').replace(/\//g, '-') || namespace, // 根据 path 生成一个 name（可选，取决于你的需求）,
    component:  comVue[components]  , //About,
    meta:meta as RouteMeta  
  } as MyRouteRecord; // 这里我们使用了类型断言  
})

export default routers

                        
// 原文链接：https://blog.csdn.net/weixin_43025343/article/details/131793988