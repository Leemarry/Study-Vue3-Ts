<!--
 * @Date: 2024-06-26 18:19:07
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-20 10:08:13
 * @FilePath: \Study-Vue3-Ts\src\views\Main-Page\Blog\index.vue
 * @Description: 
-->

<template>
<div>
  <div>
    博客
  </div>
<div>
  <button  @click='goto'>最外层</button>
  <button @click='goBlog'>前往博客</button>

  <div class="Al-Image">
    <img src="http://pic.bizhi360.com/litimg/11676.jpg" alt="" srcset="" class="All-Image Small-Image">
    <img src="http://pic.bizhi360.com/litimg/11676.jpg" alt="" srcset="" class="All-Image Small-Image">
    <img @load="handleLoaded" src="https://s4.aconvert.com/convert/p3r68-cdx67/tf9py-uy0mo.jpg" alt="" srcset="" class="All-Image  Origin-Image">
  </div>
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


  const handleLoaded = (e:any) => {
    e.target.classList.add('loaded')
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
  .Al-Image{
   display: inline-block;
    position: relative;
    width: 500px;
    height: 500px;;
  }
  .All-Image {
    position:absolute;
    inset: 0px;
    height: 100%;
    width: 100%;;
    object-fit: cover;
    transition: 0.6s;
  }
  .Small-Image{
    z-index: 1;
  }
  .Origin-Image{
    z-index: 2;
    opacity: 0;
    filter: blur(10px);  
  }
  .loaded.Origin-Image{
    opacity: 1;
    filter: blur(0px);
  }
  </style>
  