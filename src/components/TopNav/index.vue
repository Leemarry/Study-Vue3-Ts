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
      <li v-for="(icon, index) in icons" :key=index class="flex-row flex-align-center flex-justify-center gap">
        <i class=" iconfont" :class="icon.icon" style="font-size: 14px;"></i>
      </li>
      <li class="flex-row flex-align-center flex-justify-center gap">
        <i class=" iconfont icon-a-huaban2fuben9" style="font-size: 14px;" @click="openColorSelector"></i>
      </li>
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
import { ref, reactive, PropType, onMounted, computed } from "vue"
import { useRouter } from "vue-router";
import mainRoutes from "@/router/mainRouter.ts"
import { MyRouteRecord } from "@/router/routesType";
const sortRouting = mainRoutes.sort((a, b) => a.meta.menuOrder - b.meta.menuOrder)
const router = useRouter();
const goto = (route: MyRouteRecord) => {
  // console.log('switchRoute', router, route.path);
  router.push(route.path) //  router.push('/Blog')
}

const icons = [{
  icon: 'icon-sousuo1',
  title: '搜索'
},
{
  icon: 'icon-maoyan',
  title: '猫眼'
},
{
  icon: 'icon-GitHub',
  title: 'GitHub'
}
]

const currentTheme = ref(localStorage.getItem('theme') === 'dark' ? 'dark' : 'highlight')

function changehighlight() {
  document.documentElement.setAttribute('theme', 'highlight');
  currentTheme.value = 'highlight'
}
function changeDark() {
  document.documentElement.setAttribute('theme', 'dark');
  currentTheme.value = 'dark'
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
let originalGetOsColor: (() => void) | null = null;

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
</style>
