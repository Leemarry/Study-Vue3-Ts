<!--
 * @Author: likai 2806699104@qq.com
 * @Date: 2024-07-07 16:10:14
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-12 14:00:55
 * @FilePath: \Study-Vue3-Ts\src\components\Popover\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="al-popover" style="--arrow: 8">
    <!-- 卡片内容 -->
    <slot class='al-popover-content' name="content"></slot>
    <!-- 默认内容插槽 -->
    <div class="al-popover-tooltip" :placement="placement" :style="{ 'min-width': minwidth + 'px' }">
      <div class='al-tooltip-content'>
        <div v-if="title" class="al-popover-title">
          {{ title }}
        </div>
        <div v-else-if="$slots.title" class="al-popover-title">
          <slot name="title"></slot>
        </div>
        <div class='al-popover-solt'>
          <slot></slot>
        </div>
      </div>
      <div class="al-tooltip-arrow"></div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  minwidth: {
    type: Number,
    default: 200
  },
  placement: {
    type: String,
    default: 'centerBottom'
  }
})
</script>
<script lang='ts'>
export default {
  name: 'AlPopover'
}
</script>
<style scoped lang="scss">
.al-popover {
  /* 样式定义 */
  position: relative;
  display: inline-block;
}

.al-popover .al-popover-tooltip {
  position: absolute;
}

.al-popover .al-popover-tooltip .al-tooltip-content {
  /* 根据需要调整宽度 */
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.al-popover .al-popover-tooltip .al-popover-title {
  /* 标题样式 */
  font-weight: bold;
  margin-bottom: 10px;
}

// 内容样式
.al-popover .al-popover-tooltip .al-popover-solt {
  display: inline-block;
}

.al-popover .al-popover-tooltip .al-tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  width: calc(var(--arrow) * 1px);
  /* 使用calc()和变量 */
  height: calc(var(--arrow) * 1px);
  /* 同样设置高度 */
  background: linear-gradient(45deg, #f9f9f9 50%, transparent 50%);
}

.al-popover .al-popover-tooltip[placement='rightBottom'] {
  left: calc(100% - var(--arrow) * 3 * 1px);
  top: calc(100% + var(--arrow) * 2 * 1px);
}

.al-popover .al-popover-tooltip[placement='rightBottom'] .al-tooltip-arrow {
  transform: rotate(135deg) translateX(-50%);
  box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.2);
  top: calc(0%);
  left: calc(0% + var(--arrow) * 1px);
}

.al-popover .al-popover-tooltip[placement='rightTop'] {
  left: calc(100% - var(--arrow) * 3 * 1px);
  bottom: calc(100% + var(--arrow) * 2 * 1px);
}

.al-popover .al-popover-tooltip[placement='rightTop'] .al-tooltip-arrow {
  transform: rotate(-45deg) translateX(-50%);
  box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.2);
  bottom: calc(0%);
  left: calc(0% + var(--arrow) * 1px);
}

.al-popover .al-popover-tooltip[placement='rightCenter'] {
  left: calc(100% + 10px);
  transform: translateY(-50%);
  top: 50%;
}

.al-popover .al-popover-tooltip[placement='rightCenter'] .al-tooltip-arrow {
  transform: rotate(45deg) translateX(0%) translateY(50%);
  box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.2);
  bottom: calc(50%);
  left: calc(0%);
}

.al-popover .al-popover-tooltip[placement='leftTop'] {
  right: calc(100% - var(--arrow)*3px);
  bottom: calc(100% + var(--arrow)*1.5px);
}

.al-popover .al-popover-tooltip[placement='leftTop'] .al-tooltip-arrow {
  transform: rotate(-45deg) translateY(50%);
  box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.2);
  bottom: calc(0%);
  right: calc(0% + var(--arrow) * 1.5px);
}
.al-popover .al-popover-tooltip[placement='leftBottom'] {
  right: calc(100% - var(--arrow) * 3px);
    top: calc(100% + var(--arrow) * 1.5px);
}

.al-popover .al-popover-tooltip[placement='leftBottom'] .al-tooltip-arrow {
  transform: rotate(135deg) translateY(50%) ;
    box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    bottom: calc(100% - var(--arrow)  * 1px);
    right: calc(0% + var(--arrow) * 1px);
}
.al-popover .al-popover-tooltip[placement='leftCenter'] {
  right: calc(100% + 10px);
    top: calc(50%);
    transform: translateY(-50%);
}

.al-popover .al-popover-tooltip[placement='leftCenter'] .al-tooltip-arrow {
  transform: rotate(-135deg) translateX(-50%) ;
    box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    bottom: calc(50%);
    right: calc(0%);
}

.al-popover .al-popover-tooltip[placement='centerTop'] {
  bottom: calc(100% + 10px);
    transform: translateX(-50%);
    left: calc(50%);
}

.al-popover .al-popover-tooltip[placement='centerTop'] .al-tooltip-arrow {
  transform: rotate(-45deg) translateX(-50%) ;
    box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    bottom: calc(0%);
    right: calc(50%);
}

.al-popover .al-popover-tooltip[placement='centerBottom'] {
  left: calc(50%);
    transform: translateX(-50%);
    top: calc(100% + 10px);
}

.al-popover .al-popover-tooltip[placement='centerBottom'] .al-tooltip-arrow {
  transform: rotate(135deg) translateX(-50%) ;
    box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    bottom: calc(100% - var(--arrow) * 1px);
    right: calc(50%);
}
</style>
