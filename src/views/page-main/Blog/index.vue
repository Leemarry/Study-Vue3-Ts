<!--
 * @Date: 2024-06-26 18:19:07
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-06-28 14:28:59
 * @FilePath: \Study-Vue3-Ts\src\views\page-main\Blog\index.vue
 * @Description: 
-->

<template>
<div>
  <a-button type="primary" @click='goto'>博客</a-button>
    <router-view/>
</div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goto = () => {
    router.push('/')
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
  