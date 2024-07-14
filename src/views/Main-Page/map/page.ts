export default {
    title:'地图',
    menuOrder: 3,
}


  // 修改homeButton的默认返回位置
  // cesiumContainer.Viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
  //   function (e: any) {
  //     if (cesiumContainer.Viewer !== null) {
  //       e.cancel = true
  //       cesiumContainer.Viewer.camera.flyTo({
  //         destination: Cesium.Cartesian3.fromDegrees(
  //           116.404269,
  //           39.922793,
  //           100000
  //         ),
  //       })
  //     } else {
  //       console.log('cesiumContainer.Viewer is null')
  //     }
  //   }
  // )

  //你要飞的位置	
  // cesiumContainer.Viewer.camera.flyTo({
	// 			destination: Cesium.Cartesian3.fromDegrees(117.16, 32.71, 15000.0)
	// 		});

//       cesiumContainer.Viewer.camera.setView({
//     destination : Cesium.Cartesian3.fromDegrees(116.404269, 39.922793, 15000.0)
// });