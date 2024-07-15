<!--
 * @Descripttion:
 * @version:
 * @Author: Eugene
 * @Date: 2024-04-15 10:47:39
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-15 18:24:16
-->
<template>
    <svg :class="svgClass" :aria-hidden="true" :style="{ color: color, width: computedWidth, height: computedWidth }">
       <use :xlink:href="iconName" :fill="color" :style="{ color: color + ' !important', fill: color + ' !important' }" />
    </svg>
 </template>
 
 <script setup>
 import { defineProps, computed } from 'vue'
 const props = defineProps({
   name: {
     type: String,
     required: true
   },
   color: {
     type: String,
     default: ''
   },
   size: {
     type: Number,
   },
 })
 const iconName = computed(() => `#icon-${props.name}`)
 const svgClass = computed(() => {
   if (props.name) {
     return `svg-icon icon-${props.name}`
   }
   return 'svg-icon'
 })
 const computedWidth = computed(() => {
   const result = props.width || props.size
   return result ? result + 'px' : '1em'
 })
 </script>
 <style lang='scss'>
 .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: middle;
 
    use {
       transition: fill 0.5s;
    }
 }
 </style>
 