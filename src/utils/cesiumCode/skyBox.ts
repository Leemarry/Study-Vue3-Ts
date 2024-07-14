// /*
//  * @Author: likai 2806699104@qq.com
//  * @Date: 2024-07-13 20:32:20
//  * @LastEditors: likai 2806699104@qq.com
//  * @LastEditTime: 2024-07-13 20:34:28
//  * @FilePath: \Study-Vue3-Ts\src\utils\cesiumCode\skyBox.ts
//  * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
//  */
// import * as Cesium from 'cesium'
// import { viewer } from './BaseCesium';
// //天空盒子
// let defaultSkybox:any = new Cesium.SkyBox({ 
//     sources:{ 
//         positiveX: '/skyBox/px.jpg', 
//         negativeX: '/skyBox/nx.jpg', 
//         positiveY: '/skyBox/py.jpg', 
//         negativeY: '/skyBox/ny.jpg', 
//         positiveZ: '/skyBox/pz.jpg', 
//         negativeZ: '/skyBox/nz.jpg' 
//     } 
// }); 
// //近地天空盒子
// let currSkyBox:any = new Cesium.SkyBox({ 
//     sources:{ 
//         positiveX: '/skyBoxNear/px.png', 
//         negativeX: '/skyBoxNear/nx.png', 
//         positiveY: '/skyBoxNear/py.png',
//         negativeY: '/skyBoxNear/ny.png', 
//         positiveZ: 'skyBoxNear/pz.png', 
//         negativeZ: 'skyBoxNear/nz.png' 
//     } 
// }); 

// //场景渲染事件，获取相机高度 
// const postRender = () => { 
//     let position = viewer.camera.position; 
//     let height = Cesium.Cartographic.fromCartesian(position).height; 
//     if (height < 230000) { 
//         if (currSkyBox) viewer.scene.skyBox = currSkyBox; 
//         viewer.scene.skyAtmosphere.show = false; 
//     } else { 
//         if (defaultSkybox) viewer.scene.skyBox = defaultSkybox; 
//         viewer.scene.skyAtmosphere.show = true; 
//     } 
// } 
// //监听场景渲染事件 
// const addPostRender = () => { 
//     viewer.scene.skyBox.show = true; 
//     viewer.scene.postRender.addEventListener(postRender); 
// } 
// //移除场景渲染事件 
// const removePostRender = () => { 
//     viewer.scene.postRender.removeEventListener(postRender);
//     viewer.scene.skyBox.show = false; 
// }
// export{
//     addPostRender,
//     removePostRender
// }