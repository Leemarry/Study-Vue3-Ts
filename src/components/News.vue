<!--
 * @Date: 2024-06-27 19:41:29
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-06-27 19:41:58
 * @FilePath: \Study-Vue3-Ts\src\components\News.vue
 * @Description: Do not edit
-->
<template>
    <div class="news">
        <ul>
            <li><a href="#"> 新闻------001</a></li>
            <li><a href="#"> 新闻------002</a></li>
            <li><a href="#"> 新闻------003</a></li>
            <li><a href="#"> 新闻------004</a></li>
            <li><a href="#"> 新闻------005</a></li>
            <li><a href="#"> 新闻------006</a></li>
        </ul>
    </div>
</template>

<script setup lang="ts" name="About">

</script>

<style scoped>
.news {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    height: 100%;
}
.news ul {
    margin-top: 30px;
    list-style: none;
    padding-left: 10px
}
.news li>a {
    font-size: 18px;
    line-height: 40px;
    text-decoration: none;
    color: #333;
    text-shadow: 0 0 1px rgb(0, 84, 0);
}
.news-content{
    width: 70%;
    height: 90%;
    border: 1px solid;
    margin-top: 20px;
    border-radius: 10px;
}
</style>