<!--
 * @Date: 2024-06-27 13:53:29
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-20 09:55:03
 * @FilePath: \Study-Vue3-Ts\src\page\mainMenu\HomeMenu.vue
 * @Description:homeMenu
-->
<!--   -->
<template>
  <div class='占满 full-container'>
    <div v-if='showTag'>
    <div>{{ `welcome to www` }}</div> 
    <div @click='closeTag'>x</div>
  </div>
    <div class="相对定位 flex-row  menu-container ">
      <div v-for='(route) of sortRouting' :key='route.meta.menuOrder' @click='goto(route)' class="list-item">{{ route.meta.title }} </div>
    </div>
    <!-- <div class=''>
      <button @click='goback(-1)'>返回</button>
      <button @click='goback(1)'>前进</button>
    </div> -->
 <!-- 使用 data-theme 属性而不是 theme 属性 -->  
<!-- <div data-theme="highlight">你好（高亮）</div>  
<div data-theme="dark">你好（暗黑色）</div>   -->

<!-- <div theme="dark">
  <div class="item">dark</div>
</div>

<div  id="myDiv" theme="highlight">你好</div>
<button id="switchTheme">切换主题</button>  

<div class="theme-highlight">你好</div> -->
<!-- https://static001.geekbang.org/infoq/bd/bd68529cb25e50a8244325c300911c4d.jpeg -->
      <RouterView v-slot='{ Component }' class='路由组件 占满 component-container'>
        <transition name='fade'  mode="in-out">
          <KeepAlive>
            <component :is="Component"></component>
          </KeepAlive>
        </transition>
      </RouterView>
  </div>
</template>
<!-- setup语法糖-defineProps是编译器宏，无需引入 -->
<script setup lang="ts">
import { onMounted, computed, ref } from "vue"
import mainRoutes from "@/router/mainRouter.ts"
import {  useRouter } from "vue-router";
import { MyRouteRecord } from "@/router/routesType";
const showTag = ref<boolean>(localStorage.getItem('showTag') ? false : true)
const closeTag = () => {
  localStorage.setItem('showTag', 'false')
  showTag.value = false
}

const sortRouting = mainRoutes.sort((a, b) => a.meta.menuOrder - b.meta.menuOrder)
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



const goto = (route: MyRouteRecord) => {
  console.log('switchRoute', router, route.path);
  router.push(route.path) //  router.push('/Blog')
}


onMounted(() => {






// // 获取所有带有 data-theme 属性的 div 元素  
// var themedDivs = document.querySelectorAll('div[data-theme]');  
  
// // 遍历这些元素并应用相应的样式  
// themedDivs.forEach(function(div) {  
//   var theme = div.getAttribute('data-theme') as string; // 获取 data-theme 属性的值  
//   div.classList.add(theme); // 将该值作为类名添加到元素上  
// });

// var switchThemeButton = document.getElementById('switchTheme') as  HTMLElement;  
// // 为按钮添加点击事件监听器  
// switchThemeButton.addEventListener('click', switchTheme);
  
})

// // 切换主题的函数  
// function switchTheme() {  
//   // 切换theme属性的值  
//   var myDiv = document.getElementById('myDiv') as HTMLElement;  
//   var currentTheme = myDiv.getAttribute('theme');  
//   var newTheme = currentTheme === 'highlight' ? 'dark' : 'highlight';  
    
//   // 设置新的theme属性值并应用相应的样式  
//   myDiv.setAttribute('theme', newTheme);  

// }  



</script>
<style lang="scss" scoped>



.full-container {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: var(--theme_bgColor);

  .menu-container {
    position: absolute;
    z-index: 9;
    top:20%;
    right:5%;

    .list-item{
      color:aliceblue;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .component-container {
    position: absolute;
    inset: 0;
  }
}
 
// /* 高亮类样式 */  
// .highlight {  
//   color: white;  
//   background-color: yellow;  
// }  
  
// /* 暗黑色类样式 */  
// .dark {  
//   color: white;  
//   background-color: black;  
// }

// div[theme="highlight"] {
//   color: rgb(35, 208, 23);
//   background-color: yellow;
// }

// div[theme="dark"] {
//   color: white;
//   background-color: black;
// }

// // 定义theme样式map  
// $themes: (  
//   "highlight": (  
//     color: rgb(35, 208, 23),  
//     background-color: yellow  
//   ),  
//   "dark": (  
//     color: white,  
//     background-color: black  ,
//     // font-size:20px,
//   ),  
//   // ... 可以继续添加其他theme  
// );  

// @mixin useTheme(){

// div[theme="highlight"] &{
//   @content;

// }
// div[theme="dark"] &{
//   @content;

// }
// }
// .item{
// font-size: 14px;
// @include useTheme {
//   color: rgb(35, 208, 23);
//   background-color: yellow  
// };
// }
// // 定义一个函数来生成样式规则  
// @function theme-styles($theme-name) {  
//   @return map-get(map-get($themes, $theme-name), color) + ", " + map-get(map-get($themes, $theme-name), background-color);  
// }  
  
// // 使用@each遍历map来生成静态的CSS类  
// @each $theme-name, $theme-styles in $themes {  
//   .theme-#{$theme-name} {  
//     color: map-get($theme-styles, color);  
//     background-color: map-get($theme-styles, background-color);  
//   }  
// }  

// .theme-highlight {  
//   color: rgb(35, 208, 23);  
//   background-color: yellow;  
// }  
  
// .theme-dark {  
//   color: white;  
//   background-color: black;  
// }  

  
</style>
