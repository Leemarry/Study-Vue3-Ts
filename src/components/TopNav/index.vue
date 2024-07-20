<!--   -->
<template>
  <div class="top-nav flex-row  flex-align-center padding-aside">
    <div class="logo padding-aside" @click="getOsColor"><span>ler</span> <span>百宝箱</span></div>
    <div class="nav padding-aside flex-row gap ">
      <div v-for='(route) of sortRouting' :key='route.meta.menuOrder' @click='goto(route)' class="list-item">{{
        route.meta.title }}
      </div>
    </div>

    <div class="flex-row flex-align-center">
      <li class="flex-row flex-align-center flex-justify-center li-con">
        <input type="text" class="al-input">
        <i class=" iconfont icon-sousuo1" style="font-size: 14px;" @click="openColorSelector"></i>
      </li>
      <li class="flex-row flex-align-center flex-justify-center gap">
        <i class=" iconfont icon-maoyan" style="font-size: 14px;" @click="openColorSelector"></i>
      </li>
      <li class="flex-row flex-align-center flex-justify-center gap">
        <i class=" iconfont icon-GitHub" style="font-size: 14px;"
          @click="openLinkByBlank('https://github.com/Leemarry')"></i>
      </li>


      <AlPopover  :title="''"  :minWidth='200' >  
      <!-- <template #title>  
        <div>标题</div>  
      </template>   -->
      <template #content >
        <li class="flex-row flex-align-center flex-justify-center gap">
        <i class=" iconfont icon-a-huaban2fuben9" style="font-size: 14px;" @click="openColorSelector"></i>
      </li>
      </template>

        <div class="solt-panel flex-column gap">   
          <div class="slot-content ">
            <div class="panel-title">Primary</div>
          <div class="panel-content flex-row gap05 flex-wrap flex-justify-between">
            <div class="color-btn" v-for="(color,index) in colorMap" :style="{backgroundColor:color.backgroundColor}" :title="index" :key="index" @click="switchColor(color,$event)" >
            </div>
          </div>
          </div>
          <div class="slot-content ">
            <div class="panel-title">Primary</div>
          <div class="panel-content flex-row gap05 flex-wrap flex-justify-start">
            <input type="color">
            <input type="color">
          </div>
          </div>

      
      
        
        </div>  

    </AlPopover> 
      <li class="flex-row flex-align-center flex-justify-center gap">
        <i v-if="currentTheme === 'highlight'" class=" iconfont icon-sun" style="font-size: 14px;"
          @click="changeDark"></i>
        <i v-else class=" iconfont icon-moon" style="font-size: 14px;" @click="changehighlight"></i>
      </li>
    </div>


    <input type="color">


  </div>
</template>
<!-- setup语法糖-defineProps是编译器宏，无需引入 -->
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router";
import mainRoutes from "@/router/mainRouter.ts"
import { MyRouteRecord } from "@/router/routesType";
import AlPopover from "@/components/Popover/index.vue"
const sortRouting = mainRoutes.sort((a, b) => a.meta.menuOrder - b.meta.menuOrder)
const router = useRouter();
const goto = (route: MyRouteRecord) => {
  // console.log('switchRoute', router, route.path);
  router.push(route.path) //  router.push('/Blog')
}

const colorMap= {
  'noir':{
   backgroundColor:'#415B61',
    color:'#000'
  },
  'green':{
    backgroundColor:'#10b981',
    color:'#000'
  },
  'lime':{
    backgroundColor:'#Ef55ff',
    color:'#fff'
  },
  'orange':{
    backgroundColor:'#000',
    color:'#fff'
  },
  'noirs':{
   backgroundColor:'#415B61',
    color:'#000'
  },
  'greens':{
    backgroundColor:'#10b981',
    color:'#000'
  },
  'limes':{
    backgroundColor:'#Ef55ff',
    color:'#fff'
  },
  'oranges':{
    backgroundColor:'#000',
    color:'#fff'
  },
  'noira':{
   backgroundColor:'#415B61',
    color:'#000'
  },
  'greena':{
    backgroundColor:'#10b981',
    color:'#000'
  },
  'limea':{
    backgroundColor:'#Ef55ff',
    color:'#fff'
  },
  'orangea':{
    backgroundColor:'#000',
    color:'#fff'
  }
  }
  




const currentTheme = ref(localStorage.getItem('theme') === 'dark' ? 'dark' : 'highlight')

function changehighlight() {
  document.documentElement.setAttribute('theme', 'highlight');
  currentTheme.value = 'highlight'
}
function changeDark() {
  document.documentElement.setAttribute('theme', 'dark');
  currentTheme.value = 'dark'
}

const switchColor =(color:any,e:MouseEvent)=>{
  console.log('switchColor',color,e);
  const el = e.target as HTMLElement
  el.style.outlineColor= color.backgroundColor  
}

const openColorSelector = () => {
  // const input = document.querySelector('input[type="color"]');
  // if (input) {
  //   input.click();
  // }
}

// const getOsColor=()=>{
//   if (!window.EyeDropper ) {
//     resultElement.textContent = "你的浏览器不支持 EyeDropper API";
//     return;
//   }
//   // const eyeDropper = new EyeDropper();
//   const picker =  new EyeDropper();
//   console.log(picker);


// picker.open().then((result: any) => {
//   const color = result?.sRGBHex;
//   console.log(color);

//   // ...
// });
// }
// let originalGetOsColor: (() => void) | null = null;

// 这个返回的函数就是我们的惰性函数  

// let getOsColor = () => {
//   console.log('get');

//   if (!('EyeDropper' in window)) {
//     // 随笔将函数修改
//     getOsColor = () => {
//       console.log("你的浏览器不支持 EyeDropper API");
//       return;
//     }
//     getOsColor()

//   } else {

//     getOsColor = () => {
//       const picker = new EyeDropper(); // 注意：这里假设EyeDropper已经全局可用  

//       picker.open().then((result: any | null) => {
//         if (result) {
//           const color = result.sRGBHex; // 假设result有一个sRGBHex属性  
//           console.log(color);
//           // 这里可以更新UI或执行其他操作  
//         } else {
//           console.log("未选择颜色");
//         }
//       }).catch((error: any) => {
//         console.error('EyeDropper API 出错:', error);
//       });

//     }
//     getOsColor()
//   }
// };

// 定义一个立即执行的函数表达式（IIFE），它返回一个函数  
// 这个返回的函数就是我们的惰性函数  
const getOsColor = (() => {
  let isSupported: boolean | undefined; // 用来保存是否支持EyeDropper API的结果  

  // 这是一个内部函数，用于实际执行颜色选择逻辑  
  const selectColor = () => {
    if (!isSupported) {
      isSupported = 'EyeDropper' in window; // 检查浏览器是否支持EyeDropper API  
    }

    if (!isSupported) {
      console.log("你的浏览器不支持 EyeDropper API");
      return;
    }

    const picker = new EyeDropper(); // 注意：这里假设EyeDropper已经全局可用  

    picker.open().then((result: any | null) => {
      if (result) {
        const color = result.sRGBHex; // 假设result有一个sRGBHex属性  
        console.log(color);
        // 这里可以更新UI或执行其他操作  
      } else {
        console.log("未选择颜色");
      }
    }).catch((error: any) => {
      console.error('EyeDropper API 出错:', error);
    });
  };

  // 返回一个函数，该函数在首次调用时检查支持性，并在后续调用中直接使用结果  
  return () => {
    selectColor();
  };
})();





const openLinkByBlank = (src: string) => {
  window.open(src, '_blank')
}


onMounted(() => {

})



</script>
<style lang="scss" scoped>
.top-nav {
  container-type: inline-size; // cqw

  .logo {
    font-family: 'MaoKenWangXingYuan', sans-serif;
    // font-size: 2cqw;
    font-weight: bold;

    span {
      white-space: nowrap;
    }
  }
}


.nav {
  margin-right: auto;
  font-weight: 700;

  // 子元素 
  &>div {
    cursor: pointer;
  }
}

.li-con {
  // width 动画
  width: 28px;
  transition: width 0.3s ease-in-out;

  .al-input {
    border: none;
    outline-style: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    /* 确保padding和border不会增加额外宽度 */
    min-width: 0;
    /* 允许input收缩到更小 */
    // width: 100%;
    /* 如果需要，可以在这里设置宽度，但在这个flex布局中可能不是必需的 */
    // flex: 1;
    margin: 0 0 0 8px; /* 为i元素留出空间，防止被input覆盖 */  
    flex: 1 1 auto; /* flex-grow, flex-shrink, flex-basis */  
  }

  i {
    font-size: 14px;
    margin: 0 8px 0 0; /* 为i元素留出空间，防止被input覆盖 */  
  }

  &:hover {
    width: 150px;
    i{
      color:aqua
  }
}

}
/**自定义颜色面版 */
.solt-panel{
  .panel-title{
    margin: 0px 0px .5rem 0px;

  }
  .panel-content{
    .color-btn{
      border-radius: 50%;
      cursor: pointer;
      height: 1.25rem;
      outline-color:transparent;
      outline-offset: 1px;
      outline-style: solid;
      outline-width: 2px;
      padding: 0px;
      width: 1.25rem;;
    }

  }

}
</style>
