<template>
  <button  
    :class="[  
      'al-button',  
      type && `al-button--${type}`,  
      round && 'al-button--round',  
      circle && 'al-button--circle' ,
      ghost && 'al-button--ghost' // 添加 ghost 类名  
    ]"  
  >  
    <slot></slot>  
    <i v-if="icon" :class="icon" class="iconfont"></i>  
  </button>  
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
defineOptions({
    name: 'AlButton'
})
defineProps({  
  type: {  
    type: String,  
    default: ''  
  },  
  round: {  
    type: Boolean,  
    default: false  
  },  
  circle: {  
    type: Boolean,  
    default: false  
  },  
  ghost:{   
    type: Boolean,  
    default: false
  },
  icon: {  
    type: String,  
    default: ''  
  }  
})

</script>


<style lang='scss' scoped>
.al-button {  
  /* 基础样式 */  
  padding: 8px 16px;  
  border: none;  
  background-color: #f0f0f0;  
  cursor: pointer;  
}  
  
.al-button--primary {  
  background-color: #42b983;  
  color: white;  
}  
  
.al-button--round {  
  border-radius: 50px; /* 圆角 */  
}  
  
.al-button--circle {  
  width: 32px;  
  height: 32px;  
  padding: 0;  
  border-radius: 50%; /* 圆形 */  
}  
  
.al-button--ghost {  
  background-color: transparent; /* 透明背景 */  
  border: 1px solid #ccc; /* 示例边框颜色，可以根据需要调整 */  
  color: #666; /* 示例文字颜色，也可以根据需要调整 */  
  /* 其他幽灵按钮样式... */  
}  
/* 如果需要icon样式，也在这里定义 */  
</style>