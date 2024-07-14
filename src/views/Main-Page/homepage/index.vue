<!--
 * @Date: 2024-06-26 18:19:07
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-14 16:30:39
 * @FilePath: \Study-Vue3-Ts\src\views\Main-Page\homepage\index.vue
 * @Description: 
-->

<template>
  <div class="scrollable-content" style="height: 5000px;">
    1
  </div>

  <!-- <div>
    <h3>类型一:逐帧渲染</h3>
    <div class="card-container">
      <template v-for="(item, index) in items " :key="index">
        <div class="Al-Card" v-if="defer(item.id)">
          <div class="Full-Card">
            <div class="Al-Card-Title">{{ item.id }}</div>
            <div class="Al-Card-content">{{ item.text }}</div>
          </div>
        </div>
      </template>
    </div>
    <h3>类型二:虚拟滚动</h3>
        <AlVirtualList :items="items" :size="60" :showNumber="10" :bufferSize="2">
      </AlVirtualList>
  </div> -->


</template>
<!-- 设计思路：第一步将10000条数据渲染到页面上，然后使用虚拟滚动技术来优化性能;第二步：使用display:none隐藏超出视口外的元素，这样可以减少渲染开销。 第三步:使用IntersectionObserver 来监听滚动事件，当滚动到可见区域时，才显示对应的条目。 -->
<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue'
import { useDefer } from '@/utils/loading/userDefer'
import AlVirtualList from '@/components/Al-Virtual-Scroller/index.vue'
const items = ref(Array.from({ length: 1000 }, (_, index) => ({
  id: index,
  text: `Item ${index + 1}`,
})));
const defer = useDefer(items.value.length); // 逐帧渲染
const itemHeight = ref(50); // 假设每个条目的高度是固定的  
const scroller = ref(null);
const bufferSize = 10; // 缓冲区大小，用于在滚动时提前加载更多条目  

// 使用ref来跟踪哪些条目是可见的  
const startIndex = ref(0);
const endIndex = computed(() => {
  if (!scroller.value || !itemHeight.value || startIndex.value === undefined) {
    // 如果scroller、itemHeight或startIndex不可用，则返回一个默认值（例如0）  
    return 0;
  }

  const visibleCount = Math.ceil(scroller.value.clientHeight / itemHeight.value) + bufferSize * 2;
  return Math.min(startIndex.value + visibleCount, items.value.length - 1);
});

// 计算当前应该渲染的条目  
const visibleItems = computed(() => {
  return items.value.slice(startIndex.value, endIndex.value + 1);
});

function handleScroll() {
  if (!scroller.value) return;

  const { scrollTop, clientHeight, scrollHeight } = scroller.value;

  // 计算新的startIndex，考虑缓冲区  
  const newStartIndex = Math.max(0, Math.floor(scrollTop / itemHeight.value) - bufferSize);

  // 如果startIndex发生变化，则更新它  
  if (newStartIndex !== startIndex.value) {
    startIndex.value = newStartIndex;

    // 在某些情况下，你可能需要等待DOM更新后再执行某些操作  
    // nextTick(() => {  
    //   // 可以在这里执行依赖于DOM更新的操作  
    // });  
  }
}

onMounted(() => {


  
})

</script>



<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1;
  overflow: auto;
  height: 300px;
}

.Al-Card {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  margin: 20px;
  background-color: aquamarine;
  flex-grow: 1
}

.Full-Card {}

.Al-Card-Title {}

.Al-Card-content {}

.scroller {
  height: 300px;
  /* 视口高度 */
  overflow-y: auto;
  /* 启用滚动 */
  position: relative;
}

.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
  /* 确保padding不会增加元素的总高度 */
}
</style>