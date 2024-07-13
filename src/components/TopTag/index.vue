<!--
 * @Date: 2024-07-04 19:54:04
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-07 11:29:26
 * @FilePath: \Study-Vue3-Ts\src\components\TopTag\TopTag.vue
 * @Description: Do not edit
-->
<!--   -->
<template>
     <div class="top-tag ">
          <div class="box">
               <p class="animate">
                    本站管理员于今日下午三时将对本系统进行更新，届时将停止服务器运行，所带来不便，尽请谅解！
               </p>
          </div>
          <span class="btn"><i>X</i></span>
     </div>
</template>
<!-- setup语法糖-defineProps是编译器宏，无需引入 -->
<script setup lang="ts">
import { onMounted } from "vue"

onMounted(() => {
     document.querySelector('.btn')?.addEventListener('click', function () {
          document.querySelector('.container')?.classList.toggle('hide-top');
     });
})



</script>
<script lang="ts">
export default {
     name: 'TopTag'
}
</script>

<style lang="scss" scoped>
.top-tag {
     display: flex;
     align-items: center;
     font-weight: 700;
     span {
          margin-right: auto;
          padding-left: 20px;
          line-height: 23px;
     }

     .box {
          margin-left: auto;
          color-scheme: light dark
     }
}



//css样式
.box {
     width: 300px;
     overflow: hidden;
     display: flex;
}

.animate {
     padding-left: 20px;
     line-height: 23px;
     font-size: 12px;
     display: inline-block;
     white-space: nowrap;
     animation: 10s wordsLoop linear infinite normal;
}

@keyframes wordsLoop {
     0% {
          transform: translateX(200px);
          -webkit-transform: translateX(200px);
     }

     100% {
          transform: translateX(-100%);
          -webkit-transform: translateX(-100%);
     }
}

@-webkit-keyframes wordsLoop {
     0% {
          transform: translateX(200px);
          -webkit-transform: translateX(200px);
     }

     100% {
          transform: translateX(-100%);
          -webkit-transform: translateX(-100%);
     }
}
</style>
