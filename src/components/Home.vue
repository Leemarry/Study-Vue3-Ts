<!--
 * @Date: 2024-06-27 19:42:14
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-06-28 13:54:03
 * @FilePath: \Study-Vue3-Ts\src\components\Home.vue
 * @Description: Do not edit
-->
<template>
    <div class="home">
        这是home，按钮到about
        <button type="button" @click="count++">count is {{ count }}</button>
        <a-input v-model:value="value" placeholder="Basic usage" />
        <button @click='goto'>/about</button>
        <!-- <div>
            <router-view />
        </div> -->
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {  useRouter } from "vue-router";

const router = useRouter();
const goto = () => {
    router.push({
        path: '/child'
    })
}
const count = ref(0)
const value = ref<string>('');


</script>
<script lang='ts'>
export default {
    name:'login'
}
</script>

<style scoped>

</style>
