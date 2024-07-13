
/*
 * @Date: 2024-06-26 18:09:52
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-04 19:50:18
 * @FilePath: \Study-Vue3-Ts\src\router\index.ts
 * @Description: Do not edit
 */
import { createRouter, createWebHistory ,RouteRecordRaw} from 'vue-router'
import mainRoutes from './mainRouter'
import bolgRouter from './bolgRouter'


import login from '@/components/Home.vue'
import About from '@/components/About.vue'
import News from '@/components/News.vue'
import Child from '@/components/Child.vue'
// 初始每一个的菜单列表 


const routeArr:RouteRecordRaw[] = [
  {
    path:'/',
    "name": "main",
    "meta": {
      "title": "首页",
      "menuOrder": 0
  },
  component:()=>import('@/views/Main-Page/index.vue')
  
  },
  {
    path:'/homepage',
    "name": "homepage",
    "meta": {
        "title": "主页",
        "menuOrder": 1
    },
    component:()=>import('@/views/Main-Page/homepage/index.vue')
  },
  {
    "path": "/Blog",
    "name": "Blog",
    "meta": {
        "title": "博客",
        "menuOrder": 2
    },
    component:()=>import('@/views/Main-Page/Blog/index.vue'),
        // redirect:'/Bolg/Bolg1',
        children:[
            {
                path:'/Bolg/Bolg1',
                "name": "Blog1",
                "meta": {
                    "title": "博客1",
                    "menuOrder": 0
                },
                component:()=>import('@/views/Bolgs-Page/Bolg1/index.vue')
            },
            {
                path:'/Blog2',
                "name": "Blog2",
                "meta": {
                    "title": "博客2",
                    "menuOrder": 2
                },
                component:()=>import('@/views/Bolgs-Page/Bolg2/index.vue')
            },
        ]
  },
  {
    "path": "/map",
    "name": "map",
    component:()=>import('@/views/Main-Page/map/index.vue'),
    "meta": {
        "title": "地图",
        "menuOrder": 3
    }
},
]

   // 配置路由规则



// 使用扩展运算符合并数组  
const mergedRoutes = [...bolgRouter, ...mainRoutes];  
console.log('BolgRouter',bolgRouter,mainRoutes,mergedRoutes);
 const router = createRouter({
  history: createWebHistory(),
  routes:mergedRoutes , //mainRoutes 再次使用类型断言，如果你需要完全匹配 Vue Router 的类型定义  
});

export default router

                        
// 原文链接：https://blog.csdn.net/weixin_43025343/article/details/131793988