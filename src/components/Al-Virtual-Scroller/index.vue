<template>
    <!-- <div  
      v-for="item in visibleItems"  
      :key="item.id"  
      class="item"  
      :style="{ height: itemHeight + 'px' }"  
    >  
      {{ item.text }}  
    </div>   -->
    <div class="al-scroller" ref="scroller" :style="{ height: scrollerHeight + 'px' }" @scroll="handleScroll">
        <div class="al-list" :style="{ top: listTop + 'px' }">
            <div class="item" v-for="(item, index) in showData" :key="index" :style="{ height: size + 'px' }">
                {{ item }}
            </div>
            <div class="bar" :style="{ height: barHeight + 'px' }">

            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { Item } from 'ant-design-vue/es/menu';
import { ref, computed } from 'vue'
const prop = defineProps({
    scrollerHeight: {
        type: Number,
        default: 250,
    },
    items: {
        // 条目
        type: Array,
        default: () => {
            return []
        },
    },
    size: {
        // 条目的高度
        type: Number,
        required: true,
    },
    showNumber: {
        // 显示的条目数量
        type: Number,
        required: true,
    },
    bufferSize: {
        // 缓冲区大小，用于在滚动时提前加载更多条目  
        type: Number,
        default: 10,
    },
})

const scroller = ref(null);

// 使用ref来跟踪哪些条目是可见的  
// 设置最大只能是items长度
const startIndex = ref(0); 
const endIndex = ref(prop.showNumber);
const showData = computed(() => {
    return prop.items.slice(startIndex.value, endIndex.value)
})
//     const endIndex = computed(() => {  
// //   if (!scroller.value || !itemHeight.value || startIndex.value === undefined) {  
// //     // 如果scroller、itemHeight或startIndex不可用，则返回一个默认值（例如0）  
// //     return 0;  
// //   }  

//   const visibleCount = Math.ceil(scroller.value.clientHeight / itemHeight.value) + bufferSize * 2;  
//   return Math.min(startIndex.value + visibleCount, items.value.length - 1);  
// });
//
// const conHeight = computed(() => {
//     return prop.size * prop.showNumber
// })
//
const listTop = computed(() => {
    return prop.size * Math.min(startIndex.value ,prop.items.length)
})
const barHeight = computed(() => {
    return prop.size * (prop.items.length - endIndex.value)
})


function handleScroll() {
    if (!scroller.value) return;

    const { scrollTop, clientHeight, scrollHeight } = scroller.value;
    console.log('handleScroll', scrollTop);

    //   // 计算新的startIndex，考虑缓冲区  
    const newStartIndex = Math.max(0, Math.floor(scrollTop / prop.size));

    // 如果startIndex发生变化，则更新它  
    if (newStartIndex !== startIndex.value) {
        startIndex.value =   Math.min(newStartIndex,prop.items.length-prop.showNumber); 
      
        endIndex.value = Math.min(newStartIndex + prop.showNumber, prop.items.length - 1);
        // 在某些情况下，你可能需要等待DOM更新后再执行某些操作  
        // nextTick(() => {  
        //   // 可以在这里执行依赖于DOM更新的操作  
        // });  
    }
}

</script>


<style lang='scss' scoped>
.al-scroller {
    height: 300px;
    /* 视口高度 */
    overflow-y: auto;
    /* 启用滚动 */
    position: relative;
}

.al-list {
    position: absolute;
    top: 0;
    width: 100%;

}
</style>