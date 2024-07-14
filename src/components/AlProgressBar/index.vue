<!--
 * @FilePath: \Study-Vue3-Ts\src\components\AlProgressBar\index.vue
 * @Author: likai 2806699104@qq.com
 * @Version: 0.0.1
 * @LastEditors: likai 2806699104@qq.com
 * @Description:  
-->
<template>
    <div class="al-progress-bar al-hide-scrollbar" :id="id">
        <div class="al-progress-before" :style="{'background-color': color}"></div>
        <slot name="content"></slot>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onUnmounted } from 'vue'
const prop = defineProps ({
    id: {
        type: String,
        default: 'progressbar'
    },
    color: {
        type: String,
        default: 'yellowgreen'
    }
})


onMounted(() => {
  const scrollableContainer = document.getElementById(prop.id) as HTMLElement;
  console.log(scrollableContainer);

  scrollableContainer.addEventListener('scroll', function() {
    // 计算滚动比例
    const scrollTop = scrollableContainer.scrollTop; 
    const scrollHeight = scrollableContainer.scrollHeight; 
    const clientHeight = scrollableContainer.clientHeight; 
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    // 限制滚动比例在0到1之间
    const clampedScrollRatio = Math.min(Math.max(scrollRatio, 0.01), 1);

    // 更新显示
    scrollableContainer.style.setProperty('--progressbar', clampedScrollRatio.toString());
  });
})
onUnmounted(() => {
    // 卸载 上述滚动
    console.log('onUnmounted');
    
    const scrollableContainer = document.getElementById(prop.id) as HTMLElement;
    scrollableContainer.removeEventListener('scroll', function() {});
})

</script>
<script lang="ts">
export default {
    name: "AlProgressBar"
}
</script>


<style lang='scss' scoped>

// 滚动条隐藏 添加 demo
.al-hide-scrollbar::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
 }
 
 .al-hide-scrollbar {
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
 }
 .al-progress-bar{
    --progressbar: 0.01;
 }
 .al-progress-bar .al-progress-before {

    background-color: yellowgreen;
    height: 2px;
    position: sticky;
    width: 100%;
    top: 0;
    /* 固定在#scrollable-container的顶部 */
    left: 0;
    /* 可选，但明确指定通常是个好习惯 */
    z-index: 1;
    /* 确保它位于内容之上 */
    /* 如果您想让它有动画效果（如进度条），可以使用transform等属性 */
    transform-origin: 0% 50%; // 默认就是这样，可以省略 
    transform: scaleX(var(--progressbar)); // 如果需要，可以取消注释并调整值 
}
</style>