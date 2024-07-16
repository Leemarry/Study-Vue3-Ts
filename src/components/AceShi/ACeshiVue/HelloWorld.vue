<!-- cesium.js  组件面
<template>
  <div class='cesiumOutdiv'>
      <div id="cesiumContainer">
          <el-button size="mini"  type="primary" @click="show3dModel('http://127.0.0.1:9090/cheshi/entitiesModel/wrji.glb',114.2808,37.5413,300.05766199658808,0,0,0,0.5,true,0,0,25)">创建模型</el-button>
          <el-button size="mini" type="primary" @click="delete3dModel('http://127.0.0.1:9090/cheshi/entitiesModel/wrji.glb')">移除模型</el-button>
          <el-button size="mini" type="primary" @click="showTitles(value)">加载简单瓦片</el-button>
          <el-button size="mini" type="primary" @click="showTitlesOffset(value)">加载瓦片</el-button>
          <el-button size="mini" type="primary" @click="delete3dTitles(value)">移除瓦片</el-button>
          <el-button size="mini" type="primary" @click="showImageryProvider('http://127.0.0.1:9090/cheshi/ImageryProvider/2DMap/YingDeMap/result/{z}/{x}/{y}.png','UrlTemplateImageryProvider')">添加二维影像</el-button>
          <el-button size="mini" type="primary" @click="deleteImageryProvider('http://127.0.0.1:9090/cheshi/ImageryProvider/2DMap/YingDeMap/result/{z}/{x}/{y}.png')">移除二维影像</el-button>
          <el-button size="mini" type="primary" @click="deleteAllImageryProvider">模式</el-button>
          
          <el-select size="mini" v-model="value" placeholder="请选择"> <el-option v-for="item in options" :key="item.value" :label="item.label"  :value="item.value"> </el-option>
    </el-select>
      </div>
  </div>
  </template>
  
  <script>
  //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
  //例如：import 《组件名称》 from '《组件路径》';
  var palaceTileset = null; //3DTilest模型
  let imagelayer;
  export default {
    name: 'CesiumMap',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
  //这里存放数据
  return {
    options: [{
            value: 'http://127.0.0.1:9090/cheshi/YingDeModel/Production_1.json',
            label: '医德'
          }, {
            value: 'http://127.0.0.1:9090/cheshi/kowloonCityModel/tileset.json',
            label: '九龙'
          }, {
            value: 'http://127.0.0.1:9090/cheshi/ceshimodel/HBSJZZH00001/tileset.json',
            label: '光伏'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '',
      
      signProvider:null, //标记图层
      imageryProvider:null, //影像图层
      terrainProvider:null, //地形图层
      entityMap :{}, //实体对象
      TitlesMap :{}, // 瓦片
      imageryLayersMap:{}, // 影像 用于二维
      index:0,
  };
  },
  //让组件接收外部传来的数据
   props: {
      // 2D/3D ，值改变后则改变地图为2d或3d
      MapType: {
        type: String,
        default: '3D',
      },
      // 高德/百度/天地图 等，值改变后改变地图类型(url,服务接口,图层类型)
      MapProvider:{
          type:Array,
          default:function(){
              return [{
              MapProviderUrl:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer", 
              MapProviderDrive:"ArcGisMapServerImageryProvider",
              MapProviderType:"imageryProvider"
          },{
              MapProviderUrl:"http://data.mars3d.cn/terrain",
              MapProviderDrive:"CesiumTerrainProvider",
              MapProviderType:"terrainProvider"
          },{
              MapProviderUrl:"http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
              MapProviderDrive:"UrlTemplateImageryProvider",
              MapProvidertype:"signProvider"
          }
      ]
          }
      },
      //客户密钥 
      CesiumAccessToken:{
          type:String, 
          default:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNzRiNzNkYS0zZTRmLTRhOTMtODFlNS0zOWFhN2FmYzZmYjkiLCJpZCI6MTUyMTEwLCJpYXQiOjE2ODg2OTYyMDl9.sWkoSUmLFPfbMTMFgAZeQKjBQERg-TZPBBtIN34sDNQ",
  
      }
      
  
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
  // #region
      // 实例Cesium
      CreateCesium(){
          if (window.viewer) { window.viewer.destroy(); } // 初始时，判断视口是否存在
          Cesium.Ion.defaultAccessToken = this.CesiumAccessToken //密钥 否则页面提示
          // 将窗口设置为cesiumshiko
          window.viewer = new Cesium.Viewer("cesiumContainer", {  
          selectionIndicator: false, //关闭绿色点击框
          //需要进行可视化的数据源的集合
          animation: false, //是否显示动画控件
          timeline: false, //是否显示时间线控件
          shouldAnimate: false,
          homeButton: false, //是否显示Home按钮
          fullscreenButton: false, //是否显示全屏按钮
          baseLayerPicker: false, //是否显示图层选择控件
          geocoder: false, //是否显示地名查找控件
          sceneModePicker: false, //是否显示投影方式控件
          navigationHelpButton: false, //是否显示帮助信息控件
          infoBox: false, //是否显示点击要素之后显示的信息
          // requestRenderMode: true, //启用请求渲染模式
          scene3DOnly: false, //每个几何实例将只能以3D渲染以节省GPU内存
          sceneMode: 3, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
          fullscreenElement: document.body, //全屏时渲染的HTML元素 暂时没发现用处
          //1.加载天地图影像地图，WebMapTileServiceImageryProvider该接口是加载WMTS服务的接口
          // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          //   url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
          // }),
  
              // imageryProvider : new Cesium.UrlTemplateImageryProvider({
          //         url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
      // 		layer: "tdtVecBasicLayer",
      // 		style: "default",
      // 		format: "image/png",
      // 		tileMatrixSetID: "GoogleMapsCompatible",
      // 		show: false
          //     }),
          // // 天地图地形
          // terrainProvider: new Cesium.CesiumTerrainProvider({
          //   url: "http://data.mars3d.cn/terrain",
          // }),
          // 2.加载百度高德地图（加载高德/百度影像地图，UrlTemplateImageryProvider该接口是加载谷歌地图或者其他互联网地图的接口，只需要将这段替换上面的天地图就行）
          // imageryProvider : new Cesium.UrlTemplateImageryProvider({
          //         url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
      // 		layer: "tdtVecBasicLayer",
      // 		style: "default",
      // 		format: "image/png",
      // 		tileMatrixSetID: "GoogleMapsCompatible",
      // 		show: false
          //     }),
          // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          //   url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
          // }),
        });
        window.viewer.cesiumWidget.creditContainer.style.display = "none"; // 去除logo
        window.viewer.scene.globe.depthTestAgainstTerrain = true; //解决地形遮挡entity问题
       // 影像
        this.imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
          url:this.MapProvider[0].MapProviderUrl
        })
        window.viewer.imageryLayers.addImageryProvider(this.imageryProvider);
       // 地形
      this.terrainProvider =new Cesium.createWorldTerrain({
          url: this.MapProvider[1].MapProviderUrl
      });
      window.viewer.terrainProvider = this.terrainProvider;
      //  高德路网中文注记
        this.signProvider = new Cesium.UrlTemplateImageryProvider({
                  url: this.MapProvider[2].MapProviderUrl,
                  minimumLevel: 3,
                  maximumLevel: 18
              })
       window.viewer.imageryLayers.addImageryProvider(this.signProvider);
      },
      
       // 修改地图中心纬度，参数为纬度，经度，层级 
      updateMapCenter(lat,lng,alt,heading , pitch){
          let viewer = window.viewer; // 
          let Position = Cesium.Cartesian3.fromDegrees( lat,lng,alt );
          var duration = 2.0; // 动画过渡时间，单位秒
           // 设置默认相机视角
           viewer.camera.setView({
            destination:Position,
            // 方向，俯视和仰视的视角
            orientation:{
                heading:Cesium.Math.toRadians(heading),//坐标系旋转90度，将水平方向的旋转角度设置为 90 度，即顺时针旋转 90 度。
                pitch:Cesium.Math.toRadians(pitch) ,//设置俯仰角度为-45度
              }
            })
          },
      //移除所有的实体对象
      deleteAll3dModel(){
          let viewer = window.viewer ;
          viewer.entities.removeAll()
      },
      // 删除某个3D模型
      delete3dModel(url){
          let viewer = window.viewer
          let entity = this.entityMap[url]; // 根据 URL 从映射表中获取对应的实体对象
          if (entity) {
          // 取消将相机设置到模型位置
              viewer.trackedEntity = null;
              viewer.entities.remove(entity); // 从场景中移除实体对象
              delete this.entityMap[url]; // 从映射表中移除对应的实体对象
          } else {
               console.log("未找到对应 URL 的实体对象");
              }
          viewer.scene.requestRender();
      },
      // url为模型路径，setViewport（lat,lng，alt）为添加3D模型在地图上显示的位置，false是否设置视口，(x,y,z）观察模型视口偏移量
      show3dModel(url, lat = 0, lng = 0, alt = 0,heading=0,pitch=0,roll=0,scale=0.5, setViewport = true, x = 0, y = 0, z = 20){
          let viewer = window.viewer ;
          viewer.entities.removeAll()
          if (this.entityMap[url]) {
              return false;}
           heading = 0;  // -93 
          // 设置模型初始朝向
          let headingValue = Cesium.Math.toRadians(heading); // 将角度值转换为弧度
          let Position = Cesium.Cartesian3.fromDegrees( lat,lng,alt);
          let orientation = Cesium.Transforms.headingPitchRollQuaternion(
              Position,
            new Cesium.HeadingPitchRoll(
              headingValue,
              pitch,
              roll) //模型的偏航角（heading）模型的俯仰角（pitch） 表示模型的横滚角（roll）
          );
          // 添加模型，并将实体对象保存到对象映射中
          let entity = window.viewer.entities.add({
            // 设置方向
            orientation: orientation, 
            position: Position,
            name: '飞机',
            model: {
              uri: url,
              scale: scale, //模型大小比例
            },
          });
          // 检查实体是否成功添加 // 设置模型初始朝向
          const entityAdded = viewer.entities.contains(entity);
          if (entityAdded) {
              console.log("模型实体成功添加");
            // 存储实体对象到映射表中
          this.entityMap[url] = entity; // 以 URL 为 key，实体对象为 value 的映射表
            } else {
              console.log("模型实体添加失败");
            }
        if(setViewport){
          viewer.trackedEntity = entity; // 将相机设置到模型位置
          entity.viewFrom = new Cesium.Cartesian3(x, y, z);
        }
          viewer.scene.requestRender();
      },
      // 删除某个3d title
      delete3dTitles(url){
        let viewer = window.viewer
        let Tileset = this.TitlesMap[url]; // 根据 URL 从映射表中获取对应的实体对象
        if (Tileset) {
          // 取消将相机设置到模型位置
              viewer.scene.primitives.remove(Tileset);
              delete this.TitlesMap[url]; // 从映射表中移除对应的实体对象
          } else {
               console.log("未找到对应 URL 的实体TitlesMap对象");
              }
          viewer.scene.requestRender();
      },
      // 显示 3d title在地图上 --url
      showTitles(url){
        let viewer = window.viewer;
        viewer.trackedEntity = undefined;
        const palace3DTileset = new Cesium.Cesium3DTileset({
                  url: url,//加载倾斜示范数据
                  maximumMemoryUsage: 1024 * 1024, // 设置3D Tiles的最大内存使用量--浏览器内层占用,
                  maximumScreenSpaceError: 2, // 数值加大，能让最终成像变模糊,加载快;初始化的清晰度
                  skipScreenSpaceErrorFactor: 16,
                  dynamicScreenSpaceErrorDensity: 0.3, // 数值加大，能让周边加载变快
                  dynamicScreenSpaceError: true, // 根据测试，有了这个后，会在真正的全屏加载完之后才清晰化房屋
              });
              // 订阅加载完成事件
              palace3DTileset.readyPromise.then((palace3DTileset) => {
                  viewer.scene.primitives.add(palace3DTileset);
                  const layerAdded = viewer.scene.primitives.contains(palace3DTileset);
                   if (layerAdded) {
                    console.log("影像图层成功添加");
                    this.TitlesMap[url] = palace3DTileset;  // 映射瓦片模型
                  } else {
                    console.log("影像图层添加失败");
                  }
                  //设置相机视角
                  window.viewer.zoomTo(
                    palace3DTileset,
                    new Cesium.HeadingPitchRange(
                      0.6,
                      -0.4,
                      palace3DTileset.boundingSphere.radius * 0.35
                      )
                      );
                })
                viewer.scene.requestRender();
      },
      // 显示3d title在地图上
              // maximumMemoryUsage: 100,//不可设置太高，目标机子空闲内存值以内，防止浏览器过于卡
              // maximumScreenSpaceError: 20,//用于驱动细节细化级别的最大屏幕空间错误;较高的值可提供更好的性能，但视觉质量较低。 建议调大
       showTitlesOffset(url,offsetAlt=15,offsetLat,offsetLng){
          let viewer = window.viewer;
          viewer.trackedEntity = undefined;  //模型-- 实体模型视口锁定问题
             const palace3DTileset = new Cesium.Cesium3DTileset({
                  url: url,//加载倾斜示范数据
                  maximumMemoryUsage: 1024 * 1024, // 设置3D Tiles的最大内存使用量--浏览器内层占用,
                  maximumScreenSpaceError: 2, // 数值加大，能让最终成像变模糊,加载快;初始化的清晰度
                  skipScreenSpaceErrorFactor: 16,
                  dynamicScreenSpaceErrorDensity: 0.3, // 数值加大，能让周边加载变快
                  dynamicScreenSpaceError: true, // 根据测试，有了这个后，会在真正的全屏加载完之后才清晰化房屋
              });
              // 订阅加载完成事件
              palace3DTileset.readyPromise.then((palace3DTileset) => {
                  viewer.scene.primitives.add(palace3DTileset);
                  var heightOffset = offsetAlt; //高度 高度你调这个就可以了
                  var longitude = offsetLng; //模型需要改变的经度--适用倾斜偏移
                  var latitude = offsetLat; //模型需要改变的纬度--适用倾斜偏移
                  //获取3Dtlies的bounds范围
                  var boundingSphere = palace3DTileset.boundingSphere;
                  //获取3Dtlies的范围中心点的弧度
                  var cartographic = Cesium.Cartographic.fromCartesian(
                      boundingSphere.center
                  );
                  //定义3Dtlies改变之后中心点的弧度 （offsetvalue.longitude,offsetvalue.latitude,...
                  var offsetvalue = Cesium.Cartographic.fromDegrees(
                      longitude,
                      latitude,
                      heightOffset
                  );
                  // 模型本身的位置 :根据经纬度和高度0，得到地面笛卡尔坐标
                  var surface = Cesium.Cartesian3.fromRadians(
                      cartographic.longitude,
                      cartographic.latitude,
                      0.0  
                  );
                  //模型本身的位置 
                  // var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
                  //模型改变的位置
                  let lng = (offsetLng==undefined || 0 ) ?  cartographic.longitude : longitude
                  let lat = (offsetLat==undefined || 0 ) ?  cartographic.latitude : latitude
                  var offset = Cesium.Cartesian3.fromRadians(
                    lng,
                    lat,
                    heightOffset
                  );
                  //定义模型的改变状态---offset需求位置---surface本身位置
                  var translation = Cesium.Cartesian3.subtract(
                      offset,
                      surface,
                      new Cesium.Cartesian3()
                  );
                  palace3DTileset.modelMatrix =
                      Cesium.Matrix4.fromTranslation(translation);
                  // 设置相机视角
                  window.viewer.zoomTo(
                    palace3DTileset,
                      new Cesium.HeadingPitchRange(
                          0.6,
                          -0.4,
                          palace3DTileset.boundingSphere.radius * 0.35
                      )
                  );
              });
              
              this.TitlesMap[url] = palace3DTileset;  // 映射瓦片模型
              viewer.scene.requestRender();
      },
  
      //添加影像图层 格式--// url: "../../../static/Maps/result/{z}/{x}/{y}.png",
      showImageryProvider(url,MapProviderDrive){
        let viewer = window.viewer;
            var imageryProvider = new Cesium[MapProviderDrive]({
       url: url
      });
      viewer.imageryLayers.addImageryProvider(imageryProvider);
      this.imageryLayersMap[url]= imageryProvider
      },
      //移除影像 参数 url
      deleteImageryProvider(url){
        let viewer = window.viewer;
           imagelayer = this.imageryLayersMap[url]; // 根据 URL 从映射表中获取对应的实体对象
          if (imagelayer != null) {
            viewer.imageryLayers.remove(imagelayer);
            delete this.imageryLayersMap[url]; // 从映射表中移除对应的实体对象
          } else {
               console.log("未找到对应 URL 的实体imagelayer对象");
              }
          viewer.scene.requestRender();
      },
      deleteAllImageryProvider(){
        let viewer = window.viewer;
        viewer.imageryLayers.removeAll();
        viewer.scene.requestRender();
      },
      //切换 3维模式
      switchSceneMode(){
        let type = "2D"
        let viewer = window.viewer;
        switch (type) {
          case "3D":
          viewer.scene.mode = Cesium.SceneMode.SCENE3D//3维模式
            break;
          case "2D":
          viewer.scene.mode = Cesium.SceneMode.SCENE2D; // 切换到 2D 模式
            break;
          case "2.5D":
          viewer.scene.mode = Cesium.SceneMode.COLUMBUS_VIEW;; // 2.5D 哥伦布模式
            break;
          case "1D":
          viewer.scene.mode = Cesium.SceneMode.MORPHING; // 变形模式
            break;
        
          default:
            break;
        }
      },
  
  // #endregion
      // 添加3D模型并偏移后显示在地图上
      show3dModelOffset(url, lat, lng, alt, setViewport, x = 0, y = 0, z = 0){
        function show3dModel(url, lat, lng, alt, setViewport, x = 0, y = 0, z = 0) {
    if (arguments.length === 1) {
      // 处理只有url的情况
      console.log('处理只有url的情况:', url);
    } else if (arguments.length === 5 && typeof setViewport === 'boolean') {
      // 处理不带偏移量的情况
      console.log('处理不带偏移量的情况:', url, lat, lng, alt, setViewport);
    } else if (arguments.length === 8 && typeof setViewport === 'boolean') {
      // 处理带偏移量的情况
      console.log('处理带偏移量的情况:', url, lat, lng, alt, setViewport, x, y, z);
    } else {
      // 其他情况的处理逻辑
      console.log('其他情况的处理');
    }
  } 
      },
      start(){
          console.log(this.MapProvider.MapProvidertype);
      },
      op(){
          let a = "sssss"+this.index;
          this.entityMap[a] = a;
          console.log(` this.entityMap[a] \n ${this.entityMap[a]}`);
          console.log(`this.entityMap.a \n ${this.entityMap.a}`);
          this.index ++ ;
          if(this.index>3){
              delete this.entityMap["sssss"+0]; // 从映射表中移除对应的实体对象
          }
          
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      // this.start()
      setTimeout(() => {
        this.CreateCesium();
        
        this.updateMapCenter(114.2807491403881, 37.5414161887978, 400.05766199658808,90,-45)
      }, 300); //加载耗时，可能数据没有没有拿到
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }
  </script>
  <style  scoped>
  .cesiumOutdiv{
      width: 100% !important;
      height: 100% !important; 
  }
  #cesiumContainer{
      width: 100%;
      height: 100%;
  }
  
  </style> -->