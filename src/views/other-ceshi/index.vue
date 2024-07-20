<!--
 * @Date: 2024-06-26 18:19:07
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-07-20 10:08:25
 * @FilePath: \Study-Vue3-Ts\src\views\other-ceshi\index.vue
 * @Description: 
-->

<template>
    <h1>{{ msg }}</h1>
    <button>Add</button> 
    <button>main</button>
    <div :id="MapContainerId" class="cesiumViewer"></div>
    <!-- <img src="/image/14.jpg" alt="" srcset=""> -->
  </template>
  
  <script setup lang="ts">
  import { ref ,onMounted,reactive} from 'vue'
  import * as Cesium from 'cesium'
  const msg = ref('Hello Vue 3 + TypeScript + Vite')
  const props = defineProps({
  MapContainerId: {
    type: String,
    default: 'cesiumViewer',
  },
  tiandituKey: {
    type: String,
    default: '9bd7a023aac6866eb11ddbff04f9d5da',
  },
  isBigMap: {
    type: Boolean,
    default: true
  },
  defaultAccessToken: {
    type: String,
    default:
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ODBiMzY4OS1iYmIwLTQwM2UtYjRmOS05NmE4ZTRlNDdhYWEiLCJpZCI6MTUyMTEwLCJpYXQiOjE3MDk3NzI2MzJ9.PwUC2tyDTy4MCHzRspKzCvAJgZuvN9z2sjcQCC_iLJs',
  },
})
// 创建一个响应式的 Viewer 对象
const cesiumContainer = reactive<any>({
  Viewer: null,
  WebMapTileServiceImageryProvider: null,
})
  
onMounted(() => {
  init()

})
function init () {
  const elem = document.getElementById(props.MapContainerId)
  if (elem) {
    const viewer = createMap(cesiumContainer, props.MapContainerId)
    //  const toolbarElement = document.querySelector('.cesium-viewer-toolbar') as HTMLElement
    //  console.log('toolbarElement', toolbarElement.offsetWidth)
  }
}

function createMap (cesiumContainer, nameId: string) {
  Cesium.Ion.defaultAccessToken = props.defaultAccessToken
  cesiumContainer.Viewer = new Cesium.Viewer(nameId, {
    animation: false, // 动画小组件
    baseLayerPicker: true, // 底图组件，选择三维数字地球的底图（imagery and terrain）。
    fullscreenButton: false, // 全屏组件
    vrButton: false, // VR模式
    geocoder: true, // 地理编码（搜索）组件
    homeButton: true, // 首页，点击之后将视图跳转到默认视角
    infoBox: false, // 信息框
    sceneModePicker: true, // 场景模式，切换2D、3D 和 Columbus View (CV) 模式。
    selectionIndicator: false, // 是否显示选取指示器组件
    timeline: false, // 时间轴 是否显示时间线控件
    navigationHelpButton: false, // 帮助提示，如何操作数字地球。
    // 如果最初应该看到导航说明，则为true；如果直到用户明确单击该按钮，则该提示不显示，否则为false。
    navigationInstructionsInitiallyVisible: false,
  })

  // 修改homeButton的默认返回位置
  cesiumContainer.Viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
    function (e: any) {
      if (cesiumContainer.Viewer !== null) {
        e.cancel = true
        cesiumContainer.Viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            116.404269,
            39.922793,
            100000
          ),
        })
      } else {
        console.log('cesiumContainer.Viewer is null')
      }
    }
  )
  cesiumContainer.Viewer.cesiumWidget.creditContainer.setAttribute(
    'style',
    'display: none'
  ) // 取消版权信息

  return cesiumContainer.Viewer
}

  </script>
  
  
  
  <style scoped>
  .read-the-docs {
    color: #888;
  }
  </style>
  