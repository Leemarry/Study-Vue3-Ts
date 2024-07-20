<!--
 * @Date: 2024-06-27 19:40:59
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-20 10:09:46
 * @FilePath: \Study-Vue3-Ts\src\components\About.vue
 * @Description: Do not edi
-->

<template>
    <div class="about">
        <h2>About 关于我们 </h2>
        <button type="button" @click="count++">count is {{ count }}</button>
        <input v-model="value" placeholder="Basic usage" />
    </div>
</template>

<script setup lang="ts" >
import {ref,onMounted,onUnmounted,onActivated,onDeactivated} from 'vue'




    const count = ref(0)
const value = ref<string>('');

onMounted(()=>{
    console.log('onMountedAbout');
    
})

onUnmounted(()=>{
    console.log('onUnmountedAbout');
    
})

//使用 keeplive 
onActivated(()=>{
    console.log('onActivatedAbout');   
})
onDeactivated(()=>{
    console.log('onDeactivatedAbout');  
})


    

</script>

<style scoped>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: rgb(85, 84,84);
    font-size: 18px;
}
</style>
