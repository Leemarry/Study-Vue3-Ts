<!--
 * @Date: 2024-06-26 18:19:07
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-13 12:18:34
 * @FilePath: \Study-Vue3-Ts\src\views\Main-Page\index.vue
 * @Description: 
-->

<template>
  <section style="height: 5000px;" class="px-3rem py-5rem">
    <div class='flex-column flex-align-center '>
      <h1 class="fz-3rem">前端天地技无穷，尽在吾博一览中</h1>
      <p>描述：这句诗强调了您的博客涵盖了广泛的前端技术，就像大海容纳无数江河一样，各种精妙的方法和隐藏的玄机都能在其中找到。</p>
      <div class="flex-row gap">
        <a class="invert-theme "><span>Get Started </span></a>
        <a><span>Give a Start</span></a>
      </div>
    </div>

    <div class="flex-column flex-align-center py-2rem">
      <div class="seamless-rolling" v-for="(index) in 4" :style="{ '--t': Math.floor(Math.random() * (35 - 25 + 1)) + 25 + 's' }" :key="index">
      <div>
        <span>HTML1</span>
        <span>CSS</span>
        <span>JS</span>
        <span>PHP</span>
        <span>VUE</span>
        <span>VITE</span>
        <span>THREEJS1</span>
      </div>
      <div>
        <span>HTML2</span>
        <span>CSS</span>
        <span>JS</span>
        <span>PHP</span>
        <span>VUE</span>
        <span>VITE</span>
        <span>THREEJS2</span>
      </div>
    </div>
    </div>
    <button >点击显示1</button>
    <AlPopover  :title="'标题'"  :minwidth='300'>  
      <!-- <template #title>  
        <div>标题</div>  
      </template>   -->
      <template #content >
        <button >点击显示</button>
      </template>

        <div class="solt-panel">   
          <li>1</li>  
          <li>1</li>  
        </div>  

    </AlPopover> 





  </section>
</template>

<script setup lang="ts">
import AlPopover from "@/components/Popover/index.vue"
import { title } from "process";
import { ref, onMounted, reactive } from 'vue'
</script>



<style scoped lang="scss">

:deep(.al-popover .al-popover-tooltip .al-tooltip-arrow ){

  // background: linear-gradient(45deg, rgb(247, 247, 247) 50%, transparent 50%);
}
section {
  padding-top: 5rem;

  h1 {
    font-weight: 700;
    font-family: 'MaoKenWangXingYuan', sans-serif;

  }
}

.seamless-rolling {
  position: relative;
  width: 600px;
  display: flex;
  overflow: hidden;
  // background-color: red;
  mask-image: linear-gradient(90deg, transparent, #fff, 20%, #fff, 80%, transparent);


  &>div {
    white-space: nowrap;
    transform: translateX(100%);
    animation: animate var(--t) linear infinite;
  }

  &>div:nth-child(2) {
    animation: animate2 var(--t) linear infinite;
    animation-delay: calc(var(--t)/-2);
  }

  &>div span {
    display: inline-flex;
    margin: 10px;
    letter-spacing: .2rem;
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
  }
}

@keyframes animate {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes animate2 {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-200%);
  }
}
</style>