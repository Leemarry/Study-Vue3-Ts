<template>
  <!-- 如果有 circle 才在button 添加 circle 属性 button 添加 circle 属性 <button circle ></button> -->

  <button  
    :class="[  
      'al-button',  
      type && `al-button--${type}`,  
      round && 'al-button--round',  
      circle && 'al-button--circle' ,
      ghost && 'al-button--ghost' ,
      size && `al-button--${size}`
    ]"  

  >  
  <!-- :circle='circle'  -->

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
  size:{
    type: String,  
    default: 'default' 
  } ,
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

  
.al-button--primary {  
  background-color: #42b983;  
  color: white;  
}  
  
.al-button--round {  
  border-radius: 50px; /* 圆角 */  
}  
.al-button--ghost {  
  background-color: transparent; /* 透明背景 */  
  border: 1px solid #ccc; /* 示例边框颜色，可以根据需要调整 */  
  color: #666; /* 示例文字颜色，也可以根据需要调整 */  
  /* 其他幽灵按钮样式... */  
}  
/* 如果需要icon样式，也在这里定义 */  
</style>