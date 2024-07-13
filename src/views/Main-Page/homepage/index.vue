<!--
 * @Date: 2024-06-26 18:19:07
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-06-27 19:13:40
 * @FilePath: \Study-Vue3-Ts\src\views\page-main\homepage\index.vue
 * @Description: 
-->

<template>
    <a-button>Homepage </a-button> 
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  defineProps<{ msg: string }>()
  
  const count = ref(0)
  </script>
  
  
  
  <style scoped>
  .read-the-docs {
    color: #888;
  }
  </style>
  