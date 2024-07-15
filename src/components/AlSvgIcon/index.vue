<!--
 * @Date: 2024-07-15 17:55:12
 * @LastEditors: likai 2806699104@qq.com
 * @FilePath: \Study-Vue3-Ts\src\components\AlSvgIcon\index.vue
 * @Description: Do not edit
-->
<template>
  <svg :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const iconName = computed(() => `#icon-${props.name}`)

const svgClass = computed(() => {
  if (props.name) {
    return `wb-icon svg icon-${props.name}`
  }
  return 'wb-icon svg'
})
</script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  vertical-align: middle;
}
</style>
