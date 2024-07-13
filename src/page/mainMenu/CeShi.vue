<!--
 * @Date: 2024-06-27 13:53:29
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-06-28 12:57:45
 * @FilePath: \Study-Vue3-Ts\src\page\mainMenu\CeShi.vue
 * @Description:homeMenu
-->
<!--   -->
<!-- <template>
  <div class="">
      <div v-for='(route) of sortRouting' :key='route.meta.menuOrder' @click='goto(route)'>{{ route.meta.title }} </div>
  </div>
  <KeepAlive>
    <RouterView />
  </KeepAlive>
</template> -->
<template>

    <div>
      <div>
        <button @click='switcha'>去切换</button>
      </div>
        <KeepAlive>
           <Home v-if='show'/>
          <About v-else/>
        </KeepAlive>
    </div>

  
  </template>
  
  <!-- setup语法糖-defineProps是编译器宏，无需引入 -->
  <script setup lang="ts">
  import { onMounted, computed,ref } from "vue"

import Home from '@/components/Home.vue'
import About from '@/components/About.vue'

const show =ref(true)
 
const switcha = () => {
  show.value = !show.value
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
  