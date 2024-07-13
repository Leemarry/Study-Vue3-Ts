<!--
 * @Date: 2024-06-26 18:19:07
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-04 19:52:18
 * @FilePath: \Study-Vue3-Ts\src\views\Main-Page\Blog\index.vue
 * @Description: 
-->

<template>
<div>
  <div>
    博客
  </div>
<div>
  <a-button type="primary" @click='goto'>最外层</a-button>
  <button @click='goBlog'>前往博客</button>
    <!-- <router-view/> -->
</div>
</div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goto = () => {
    router.push('/')
  }
  const goBlog = () => {
    router.push('/Bolgs-Page/Bolg1')
  }
  </script>
  <script lang='ts'>
  // export default {
  //     name:'Bolg',
  //     keepAlive: true,
  // }
  </script>
  
  
  <style scoped>
  .read-the-docs {
    color: #888;
  }
  </style>
  