<!--
 * @Author: likai 2806699104@qq.com
 * @Date: 2024-07-05 19:27:12
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-20 09:57:05
 * @FilePath: \Study-Vue3-Ts\src\components\BottomTag\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--   -->
<template>
  <div class="bottom-tag invert-theme-10">
    <div class="copy flex flex-justify-center flex-align-center" >@Copy 皖ICP备2021014106号</div>
  </div>
</template>
<!-- setup语法糖-defineProps是编译器宏，无需引入 -->
<script setup lang="ts">
import {  onMounted } from "vue"

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


onMounted(() => {

})



</script>


<style lang="scss" scoped>
.bottom-tag {
  transition: height 0.5s ease, opacity 0.5s ease;
  .copy {
    opacity: 0;
    transition: height 0.5s ease-in-out, opacity 0.3s ease;
  }
}

.bottom-tag:hover {
  height: 25px;
  opacity: 1;

  .copy {
    height: 25px;
    opacity: 1;
  }
}

.height-20 {
  height: 20px
}

.height-5 {
  height: 5px
}
</style>
