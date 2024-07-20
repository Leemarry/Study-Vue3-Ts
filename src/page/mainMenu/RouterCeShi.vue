<!--
 * @Date: 2024-06-28 13:09:21
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-20 09:56:13
 * @FilePath: \Study-Vue3-Ts\src\page\mainMenu\RouterCeShi.vue
 * @Description: Do not edit
-->

<template>
    <div class="">
      <!-- 会跳转到path 为 /about -->
        <router-link to="/home"> home </router-link> 
        <router-link to="/about"> about </router-link>
    </div>
    <transition name="fade">
        <router-view v-slot="{ Component }">
            <keep-alive >
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </transition>

  
  </template>
  
  <!-- setup语法糖-defineProps是编译器宏，无需引入 -->
  <script setup lang="ts">
  import { onMounted, computed } from "vue"
  import mainRoutes from "@/router/mainRouter.ts"
  import {  useRouter } from "vue-router";
  import { MyRouteRecord } from "@/router/routesType";
  
  
  // const sortRouting = mainRoutes.sort((a,b)=>a.meta.menuOrder - b.meta.menuOrder)
  const router = useRouter();
  
defineProps({
    props1: {
      type: Boolean,
      default: true,
    },
    props2: {
      // type: Array as PropType<RouteRecordRaw[]>,  // 注意这里的类型声明
      default: () => []
    },
    prop3: String,
  })
  

  // const goto = (route:MyRouteRecord) => {
  //   console.log('switchRoute', route);
  //   router.push(route.path) //  router.push('/Blog')
  // }
  // const reback = () => {
  //   router.go(-1)
  // }
  // const goback=(num:number)=>{
  //   router.back()
  // }
  onMounted(() => {
  
  })
  
  
  function gotos() {
    router.push('/child')
  }
  
  
  </script>
  <style lang="scss" scoped>
  
  /* 添加你的过渡动画样式，例如： */  
  .fade-enter-active, .fade-leave-active {  
    transition: opacity .5s;  
  }  
  .fade-enter, .fade-leave-to {  
    opacity: 0;  
  }  </style>
  