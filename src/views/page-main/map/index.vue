<!--
 * @Date: 2024-06-26 18:19:07
 * @LastEditors: likai 2806699104@qq.com
 * @LastEditTime: 2024-06-28 17:54:23
 * @FilePath: \Study-Vue3-Ts\src\views\page-main\map\index.vue
 * @Description: 
-->

<template>
    <div id="cesiumViewer" class="cesiumViewer" ></div>
     <!-- <div>
      <iframe src="https://demos.cesium.com/HomepageDemo/index.html" tabindex="-1"></iframe>
     </div> -->
  </template>
  
  <script setup lang="ts">
  import { ref ,onMounted,reactive} from 'vue'
  import * as Cesium from 'cesium'
  const msg = ref('Hello Vue 3 + TypeScript + Vite')
  const props = defineProps({
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
    default:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ODBiMzY4OS1iYmIwLTQwM2UtYjRmOS05NmE4ZTRlNDdhYWEiLCJpZCI6MTUyMTEwLCJpYXQiOjE3MDk3NzI2MzJ9.PwUC2tyDTy4MCHzRspKzCvAJgZuvN9z2sjcQCC_iLJs',
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
  const elem = document.getElementById('cesiumViewer')
  if (elem) {
    const viewer = createMap(cesiumContainer, 'cesiumViewer')
    //  const toolbarElement = document.querySelector('.cesium-viewer-toolbar') as HTMLElement
    //  console.log('toolbarElement', toolbarElement.offsetWidth)
  }
}

function createMap (cesiumContainer:any, nameId: string) {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNzk0MmRlZS1iNWEyLTQ4NTctYjNkOC0wNGRiM2VkYjk2OTciLCJpZCI6MTUyMTEwLCJpYXQiOjE3MTk1Njg5MTF9.rdPZTei0zBtnrtjQQ5q3044_bAwNmTwez_Imp5k8jqU'
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

     // 禁用OIT机制设置透明度
     orderIndependentTranslucency:false, //去掉大气层黑圈
        contextOptions: {
            webgl:{
                alpha:true,
            }
          }

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

  //你要飞的位置	
  // cesiumContainer.Viewer.camera.flyTo({
	// 			destination: Cesium.Cartesian3.fromDegrees(117.16, 32.71, 15000.0)
	// 		});

//       cesiumContainer.Viewer.camera.setView({
//     destination : Cesium.Cartesian3.fromDegrees(116.404269, 39.922793, 15000.0)
// });


// 如果为真，则允许用户旋转相机。如果为假，相机将锁定到当前标题。此标志仅适用于2D和3D。
// cesiumContainer.Viewer.scene.screenSpaceCameraController.enableRotate = false;
    // 如果为true，则允许用户平移地图。如果为假，相机将保持锁定在当前位置。此标志仅适用于2D和Columbus视图模式。
    // cesiumContainer.Viewer.scene.screenSpaceCameraController.enableTranslate = false;
    // 如果为真，允许用户放大和缩小。如果为假，相机将锁定到距离椭圆体的当前距离
    cesiumContainer.Viewer.scene.screenSpaceCameraController.enableZoom = false;
    // 如果为真，则允许用户倾斜相机。如果为假，相机将锁定到当前标题。这个标志只适用于3D和哥伦布视图。
    // cesiumContainer.Viewer.scene.screenSpaceCameraController.enableTilt = false;


    // 设置颜色
    cesiumContainer.Viewer.scene.skyBox.show = false; //隐藏天空盒
    cesiumContainer.Viewer.scene.backgroundColor = new Cesium.Color(0,0,0,0); //设置背景透明

    // cesiumContainer.Viewer.scene.skyBox.show = false;
    // cesiumContainer.Viewer.scene.backgroundColor = Cesium.Color.RED;
    // cesiumContainer.Viewer.scene.sun.show = false; 
    // cesiumContainer.Viewer.scene.moon.show = false;

                        
// 原文链接：https://blog.csdn.net/caozl1132/article/details/96971390


                        
// 原文链接：https://blog.csdn.net/GISuuser/article/details/79408165


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

  #cesiumViewer { 

    background-repeat: no-repeat; 
    background-image: url(https://img.shetu66.com/2022/08/31/1661927045435713.jpg);
    background-size: 100% 100%; 
}


/* 链接：https://juejin.cn/post/7235092403329204261 */

  </style>
  