<template>
<div class='al-mask al-image-preview' :style='{display: visible ? "flex" : "none"}'>
    <!-- 图片处理动作 -->
     <div class="al-image-preview-action">
        <ul class="al-image-preview-action-list">
            <li id="al-icon-content">
                <i class=" iconfont icon-jiantouzuoyou"  ></i>
            </li>
            <li id="al-icon-content">
                <i class=" iconfont icon-jiantoushangxia"  ></i>
            </li>
            <li id="al-icon-content">
                <i class=" iconfont icon-youxuanzhuan"  ></i>
            </li>
            <li id="al-icon-content">
                <i class=" iconfont icon-zuoxuanzhuan"  ></i>
            </li>
            <li id="al-icon-content">
                <i class=" iconfont icon-suoxiao"  ></i>
            </li>
            <li id="al-icon-content">
                <i class=" iconfont icon-fangda"  ></i>
            </li>
            <li id="al-icon-content">
                <i class=" iconfont icon-quxiao"  ></i>
            </li>
        </ul>
     </div>
     <div class="al-image-preview-content">
        <!-- 向左、中间图片、向右 -->
         <div class="al-image-left">
            <span class=" al- iconfont icon-zuo"></span>
         </div>
         <div class="al-image-body"></div>
         <div class="al-image-right"></div>
     </div>
</div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
defineOptions({
    name: 'AlImagePreview'
})
defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})

</script>


<style lang='scss' scoped>
//@import url(); 引入公共css类

.al-image-preview{
    flex-direction: column;
    display:flex;
    .al-image-preview-action{
        position: absolute;
        top: 0%;
        width: 100%;
        background-color: rgba(0,0,0,.1);
        display: flex;
        flex-direction: row-reverse;
        .al-image-preview-action-list{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
    }
    .al-image-left{
        position: absolute;
        top: 5%;
        right: 5%;
        width: 3rem;
    height: 3rem;
        padding: 1rem;
        font-size: 1.2rem;
        border-radius: 50%;
        background-color: #606266ba;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .al-image-preview-content{
        flex: 1;
    }
}
</style>