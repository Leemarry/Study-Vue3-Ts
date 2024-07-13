<!--
 * @Date: 2024-06-26 18:05:42
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-07 11:55:58
 * @FilePath: \Study-Vue3-Ts\src\App.vue
 * @Description: Do not edit
-->
<script setup lang="ts">
// import HomeMenu from './page/mainMenu/HomeMenu.vue'
import HomeMenu from '@/page/mainMenu/HomeMenu.vue'
import CeShi from '@/page/mainMenu/CeShi.vue'
import RouterCeShi from '@/page/mainMenu/RouterCeShi.vue'
import { useRouter } from "vue-router";
import mainRoutes from "@/router/mainRouter.ts"
import { MyRouteRecord } from "@/router/routesType";
import TopTag from '@/components/TopTag/index.vue'
import TopNav from '@/components/TopNav/index.vue'
import BottomTag from '@/components/BottomTag/index.vue'

</script>

<template>
  <div class='demo-app container'>
    <div class="top-div ">
      <TopTag class="top-tag invert-theme" />
      <TopNav class="top-nav crrent-theme " />
    </div>
    <div class="main-container   main-div">
      <!-- 路由 -->
      <RouterView v-slot='{ Component }' class='路由组件 占满 component-container'>
        <transition name='fade'>
          <KeepAlive>
            <component :is="Component"></component>
          </KeepAlive>
        </transition>
      </RouterView>
    </div>
    <BottomTag class="bottom-tag bottom-div" />
  </div>
</template>

<style lang="scss" scoped>
.demo-app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.container{
  position: relative;
  overflow: auto;
}

.main-container {
  flex: 1;
  .component-container {
    // position: absolute;
    // inset: 0;
    height: 100%;
  }
}

.bottom-tag{
    height:20px;
    opacity: 0.3;
    // background-color: #cfe7bb;
      position: sticky;
      bottom:0;
      cursor: pointer;
}

.top-tag, .main-div {
  transition: height 0.5s ease, margin-top 0.5s ease;
  /* 过渡效果 */
}

.top-div {
  position: sticky;
  top: 0;
  z-index: 9;
  .top-tag {
  height: 28px;
}
.top-nav{
  height: 3.6rem;
  min-height: 56px;
  // background-color:  $ic-selected;//var(--topbar-sticky-background);
}

  
}




// /* 当.top-tag被隐藏时，.main-div的样式 */
// .container.hide-top .top-tag {
//   overflow: hidden;
//   height: 0;
//   /* 使元素高度变为0 */
//   margin-top: 0;
//   /* 防止margin导致的跳跃 */
// }

// .container.hide-top .main-div {
//   margin-top: 0;
//   /* 填补上面的空白 */
// }
</style>

<style lang="scss">
#demo-app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}


html {
  height: 100%;
  // background-image: linear-gradient(to right top, #8e44ad 0%, #3498db 100%);
}
</style>
