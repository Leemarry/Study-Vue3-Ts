<!-- <template>
    <!-- 航线规划 -->
    <div class="uvaRoutePlanBox" :class="{ hide: !isShow, show: isShow }">
      <div id="cesiumContainerBox" />
      <div
        id="toolTip"
        style="display: none;pointer-events: none;position: fixed;background: rgba(0,0,0,0.5);z-index: 1000;opacity: 0.8;border-radius: 4px;padding: 4px 8px;white-space: nowrap;font-family:黑体;color:white;font-weight: bolder;font-size: 14px;"
      />
      <div class="body">
        <div class="form-item">
          <span class="form-label">
            航飞区域
          </span>
          <div class="form-connect">
            <el-button type="primary" style="width:130px;" @click="drawPoly">
              绘制
            </el-button>
          </div>
        </div>
        <div class="form-item">
          <span class="form-label">航飞间距</span>
          <div class="form-connect">
            <el-input-number
              v-model="hfDistance"
              controls-position="right"
              :min="10"
              :step="10"
              @change="distanceHandleChange"
            />
          </div>
        </div>
        <div class="form-item">
          <div class="form-connect">
            <el-button type="primary" @click="beginCalc">
              开始计算
            </el-button>
            <el-button type="success" @click="moniFly">
              模拟飞行
            </el-button>
            <el-button type="danger" @click="cleanEntity">清除</el-button>
          </div>
        </div>
      </div>
    </div>
  </template>
   
  <script>
  import * as Cesium from '@assets/Cesium'
  import * as turf from '@turf/turf'
   
   
  var polyArr = [] // 面数据
  var jdArrs = [] // 交点集合
  export default {
    name: 'UvaRoutePlan',
    components: {},
    props: [],
    data() {
      return { isShow: true, hfDistance: 100, isFly: false }
    },
    watch: {},
    created() {
      this.$nextTick(function() {
        this.startInit()
      })
    },
    mounted() {},
    methods: {
      startInit() {
        const key =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYjM4ODkzNy0xNzcwLTRmODAtODk3Ni1jOGI3ZTg0NDQ1OTYiLCJpZCI6MzMxOTQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTgyMzM0NDR9.1j7wcxHFjCNO-Qqa2kGNnbfqjxAyVK7-Luqj3dFZWoo";
        Cesium.Ion.defaultAccessToken = key
   
        var viewer = new Cesium.Viewer('cesiumContainerBox', {
          imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
            url:
              'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
          }),
          geocoder: true,
          homeButton: true,
          sceneModePicker: true,
          baseLayerPicker: true,
          navigationHelpButton: true,
          shouldAnimate: true,
          animation: true,
          timeline: true,
          fullscreenButton: true,
          vrButton: true,
          // 关闭点选出现的提示框
          selectionIndicator: false,
          infoBox: false
        })
        viewer._cesiumWidget._creditContainer.style.display = 'none' // 隐藏版权
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            113.6440552299206,
            34.78411814959118,
            2000
          ),
          orientation: {
            heading: Cesium.Math.toRadians(0.0), // 左右方向
            pitch: Cesium.Math.toRadians(-90.0), // 上下方向
            roll: Cesium.Math.toRadians(0) // 镜头（屏幕）到定位目标点（实体）的距离
          },
          duration: 3 // 执行定位动画的时间
        })
        window.viewer = viewer
      },
      endClose() {
        this.cleanEntity()
      },
      // 画航飞区域
      drawPoly() {
        var viewer = window.viewer
        this.cleanEntity()
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        // 鼠标事件
        handler = new Cesium.ScreenSpaceEventHandler(
          viewer.scene._imageryLayerCollection
        )
        polyArr = []
        var positions = []
        var tempPoints = []
        var polygon = null
        var tooltip = document.getElementById('toolTip')
        var cartesian = null
        // 鼠标移动事件
        handler.setInputAction(function(movement) {
          tooltip.style.left = movement.endPosition.x + 3 + 'px'
          tooltip.style.top = movement.endPosition.y - 25 + 'px'
          tooltip.innerHTML = '<p>单击开始，右击结束</p>'
          const ray = viewer.camera.getPickRay(movement.endPosition)
          cartesian = viewer.scene.globe.pick(ray, viewer.scene)
          if (positions.length >= 2) {
            if (!Cesium.defined(polygon)) {
              polygon = new PolygonPrimitive(positions)
            } else {
              positions.pop()
              positions.push(cartesian)
            }
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
        // 左击鼠标事件
        handler.setInputAction(function(movement) {
          tooltip.style.display = 'block'
          tooltip.style.left = movement.position.x + 3 + 'px'
          tooltip.style.top = movement.position.y - 25 + 'px'
          tooltip.innerHTML = '<p>单击开始，右击结束</p>'
          const ray = viewer.camera.getPickRay(movement.position)
          cartesian = viewer.scene.globe.pick(ray, viewer.scene)
          if (positions.length === 0) {
            positions.push(cartesian.clone())
          }
   
          // positions.pop();
          positions.push(cartesian)
          // 在三维场景中添加点
          var cartographic = Cesium.Cartographic.fromCartesian(
            positions[positions.length - 1]
          )
          var longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
          var latitudeString = Cesium.Math.toDegrees(cartographic.latitude)
          var heightString = cartographic.height
          tempPoints.push({
            lon: longitudeString,
            lat: latitudeString,
            hei: heightString
          })
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
        // 右击鼠标事件
        handler.setInputAction(function() {
          handler.destroy()
          tooltip.style.display = 'none'
          positions.pop()
          polyArr = positions
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
        var PolygonPrimitive = (function() {
          function _(positions) {
            this.options = {
              name: 'uav-poly',
              polygon: {
                hierarchy: [],
                // perPositionHeight : true,
                material: Cesium.Color.fromCssColorString('#fafafa').withAlpha(
                  0.5
                )
              }
            }
   
            this.hierarchy = { positions }
            this._init()
          }
   
          _.prototype._init = function() {
            var _self = this
            var _update = function() {
              return _self.hierarchy
            }
            // 实时更新polygon.hierarchy
            this.options.polygon.hierarchy = new Cesium.CallbackProperty(
              _update,
              false
            )
            viewer.entities.add(this.options)
          }
   
          return _
        })()
      },
      // 开始计算
      beginCalc() {
        if (polyArr.length === 0) {
          this.$message.warning('未检测到航飞区域')
          return
        }
        var viewer = window.viewer
        // 清除之前计算结果entity
        this.cesium.removeEntityLikeName(viewer, 'uav-tmp')
        var geodesic = Cesium.BoundingRectangle.fromPoints(polyArr) // 外接矩形获取
        var rectangle = Cesium.Rectangle.fromCartesianArray(polyArr) // 外接矩形获取
        // 把面拆分成线并转换为经纬度格式存储
        var polyLines = []
        polyArr.map((res, index) => {
          var tmp = []
          var ellipsoid = viewer.scene.globe.ellipsoid
          var cartesian3 = new Cesium.Cartesian3(res.x, res.y, res.z)
          var cartographic = ellipsoid.cartesianToCartographic(cartesian3)
          var cartesian31 = null
          var cartographic1 = null
          if (index === polyArr.length - 1) {
            // 最后一个点连接顶点
            cartesian31 = new Cesium.Cartesian3(
              polyArr[0].x,
              polyArr[0].y,
              polyArr[0].z
            )
            cartographic1 = ellipsoid.cartesianToCartographic(cartesian31)
   
            tmp.push([
              [
                Cesium.Math.toDegrees(cartographic.longitude),
                Cesium.Math.toDegrees(cartographic.latitude)
              ],
              [
                Cesium.Math.toDegrees(cartographic1.longitude),
                Cesium.Math.toDegrees(cartographic1.latitude)
              ]
            ])
          } else {
            cartesian31 = new Cesium.Cartesian3(
              polyArr[index + 1].x,
              polyArr[index + 1].y,
              polyArr[index + 1].z
            )
            cartographic1 = ellipsoid.cartesianToCartographic(cartesian31)
   
            tmp.push([
              [
                Cesium.Math.toDegrees(cartographic.longitude),
                Cesium.Math.toDegrees(cartographic.latitude)
              ],
              [
                Cesium.Math.toDegrees(cartographic1.longitude),
                Cesium.Math.toDegrees(cartographic1.latitude)
              ]
            ])
          }
          polyLines.push(tmp)
        })
        // 等高分割矩形
        var bool = geodesic.width < geodesic.height
        var len = Math.floor(geodesic.height / (this.hfDistance / 2)) // 高度分割数量
        var step = rectangle.height / len // 步长
        if (bool) {
          len = Math.floor(geodesic.width / (this.hfDistance / 2)) // 宽度分割数量
          step = rectangle.width / len // 步长
        }
        jdArrs = [] // 交点集合
        //   console.log(rectangle, len, step)
        for (var i = 0; i < len; i++) {
          var tmp = null
          if (bool) {
            tmp = new Cesium.Rectangle(
              rectangle.east - step * (i + 1),
              rectangle.south,
              rectangle.east - step * i,
              rectangle.north
            )
          } else {
            tmp = new Cesium.Rectangle(
              rectangle.west,
              rectangle.north - step * (i + 1),
              rectangle.east,
              rectangle.north - step * i
            )
          }
          // 弧度转换为经纬度
          var tmpLonLat = this.rectangle2LonLat(tmp)
          // 计算交点
          var tmpJdarr = []
          polyLines.map(res => {
            var mb = null
            if (bool) {
              mb = turf.lineString([
                [tmpLonLat[1][0], tmpLonLat[1][1]],
                [tmpLonLat[3][0], tmpLonLat[3][1]]
              ])
            } else {
              mb = turf.lineString([
                [tmpLonLat[1][0], tmpLonLat[1][1]],
                [tmpLonLat[0][0], tmpLonLat[0][1]]
              ])
            }
   
            var intersects = turf.lineIntersect(turf.lineString(res[0]), mb)
            if (intersects.features.length > 0) {
              var tmplatlon = intersects.features[0].geometry.coordinates
              tmpJdarr.push(tmplatlon)
            }
          })
          // 就近往返
          if (i > 0) {
            var distance1 = turf.distance(
              turf.point(tmpJdarr[0]),
              turf.point(jdArrs[jdArrs.length - 1]),
              { units: 'kilometers' }
            )
            var distance2 = turf.distance(
              turf.point(tmpJdarr[1]),
              turf.point(jdArrs[jdArrs.length - 1]),
              { units: 'kilometers' }
            )
            //   console.log(i, distance1, distance2)
            if (distance1 > distance2) {
              tmpJdarr = tmpJdarr.reverse()
            }
          }
          // 存储交点
          tmpJdarr.map(res => {
            jdArrs.push(res)
          })
        }
        if (jdArrs[0][0] === jdArrs[1][0] && jdArrs[0][1] === jdArrs[1][1]) {
          jdArrs.shift()
        }
   
        // 线数据
        var linesArrs = []
        // 标字
        jdArrs.map((res, index) => {
          viewer.entities.add({
            name: 'uav-tmp-point',
            position: Cesium.Cartesian3.fromDegrees(res[0], res[1]),
            label: {
              text: index + '',
              font: '14pt SongTi',
              eyeOffset: new Cesium.Cartesian3(0, 0, -100)
            }
          })
          // 存储线数据
          linesArrs.push(res[0])
          linesArrs.push(res[1])
        })
        // 画方向线
        viewer.entities.add({
          name: 'uav-tmp-line',
          // corridor polyline
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(linesArrs),
            material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED),
            followSurface: true,
            width: 10
          }
        })
      },
      // 弧度转换为经纬度
      rectangle2LonLat(coor) {
        const northwest = Cesium.Rectangle.northwest(coor)
        const southwest = Cesium.Rectangle.southwest(coor)
        const northeast = Cesium.Rectangle.northeast(coor)
        const southeast = Cesium.Rectangle.southeast(coor)
   
        const leftTop = [
          Cesium.Math.toDegrees(northwest.longitude),
          Cesium.Math.toDegrees(northwest.latitude)
        ]
        const leftBottom = [
          Cesium.Math.toDegrees(southwest.longitude),
          Cesium.Math.toDegrees(southwest.latitude)
        ]
   
        const rightTop = [
          Cesium.Math.toDegrees(northeast.longitude),
          Cesium.Math.toDegrees(northeast.latitude)
        ]
   
        const rightBottom = [
          Cesium.Math.toDegrees(southeast.longitude),
          Cesium.Math.toDegrees(southeast.latitude)
        ]
   
        return [leftTop, rightTop, leftBottom, rightBottom]
      },
      // 清理entity
      cleanEntity() {
        var viewer = window.viewer
        this.cesium.removeEntityLikeName(viewer, 'uav-')
        this.cesium.cleanEntityCollection(viewer, 'uva')
        polyArr = []
   
        viewer.trackedEntity = undefined
        this.isFly = false
      },
      // 更改航飞间距触发事件
      distanceHandleChange(val) {
        this.beginCalc()
        // 重置飞行
        if (this.isFly) {
          this.moniFly()
        }
      },
      // 模拟飞行
      moniFly() {
        var viewer = window.viewer
        var that = this
        that.isFly = true
        if (polyArr.length === 0) {
          this.$message.warning('未检测到航飞区域')
          return
        }
        // 清除上一个动画
        this.cesium.cleanEntityCollection(viewer, 'uva')
        this.cesium.removeEntityLikeName(viewer, 'uav-tmp-fly')
        viewer.trackedEntity = undefined
        // 加载新动画
        const czml = [
          {
            id: 'document',
            name: 'uva',
            version: '1.0',
            clock: {
              interval: '2022-08-04T10:00:00Z/2022-08-04T15:00:00Z',
              currentTime: '2022-08-04T10:00:00Z',
              range: 'LOOP_STOP',
              multiplier: 10
            }
          },
          {
            id: 'path',
            name: 'uva-tmp-fly',
            description: '<p> 飞行器</p>',
            availability: '2022-08-04T10:00:00Z/2022-08-04T15:00:00Z',
            path: {
              material: {
                polylineOutline: {
                  color: {
                    rgba: [255, 215, 0, 255]
                  },
                  outlineColor: {
                    rgba: [192, 192, 192, 255]
                  },
                  outlineWidth: 5
                }
              },
              width: 8,
              leadTime: 10,
              // trailTime: 1000,
              resolution: 5
            },
            billboard: {
              image:
  'data:image/png;base64,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',
              scale: 1.5,
              eyeOffset: {
                cartesian: [0.0, 0.0, -10.0]
              }
            },
            position: {
              epoch: '2022-08-04T10:00:00Z',
              cartographicDegrees: []
            }
          }
        ]
        var tmp = []
        var timesArr = []
        var timeTmp = 0
        var height = 500 // 飞行高度
        var v = 20 // 飞行速度
        var yc = 2 // 重复飞行延迟时间 秒
        // 手动插值
        timesArr.push(0)
        tmp.push(0)
        tmp.push(jdArrs[0][0])
        tmp.push(jdArrs[0][1])
        tmp.push(height + Math.random() * 5 + 5)
        for (var i = 0; i < jdArrs.length; i++) {
          var times = 0
          if (i < jdArrs.length - 1) {
            var from = turf.point(jdArrs[i])
            var to = turf.point(jdArrs[i + 1])
            var options = { units: 'kilometers' }
            var distance = turf.distance(from, to, options)
            times = Math.round((distance * 1000) / v)
            timeTmp += times
            timesArr.push(timeTmp)
            tmp.push(timeTmp)
            tmp.push(jdArrs[i + 1][0])
            tmp.push(jdArrs[i + 1][1])
            tmp.push(height + Math.random() * 5 + 5)
          }
        }
        // 动态配置CZML
        // 动画结束时间
        var tmpsss = new Date(
          
            new Date(czml[0].clock.currentTime).getTime() +
              (timesArr[timesArr.length - 1] + yc) * 1000
       
        ).toISOString()
   
        var str = czml[0].clock.currentTime + '/' + tmpsss
        czml[0].clock.interval = str
        czml[1].availability = str
        czml[1].path.trailTime = timesArr[2]
        czml[1].position.cartographicDegrees = tmp
   
        // 加载CZML
        var dataSource = viewer.dataSources.add(Cesium.CzmlDataSource.load(czml))
        // 加载同步扫描椎体
        dataSource
          .then(function(dataSource) {
            var entity = dataSource.entities.getById('path')
            entity.viewFrom = new Cesium.Cartesian3(0.0, -1000.0, 1500.0)
            viewer.trackedEntity = entity
            var cylinderEntitys = that.addFrustum({
              length: 510.0,
              topRadius: 0.0,
              bottomRadius: that.hfDistance / 2,
              color: Cesium.Color.GREEN.withAlpha(0.5)
            })
            var property = new Cesium.SampledPositionProperty()
            for (var ind = 0; ind < timesArr.length; ind++) {
              var time = Cesium.JulianDate.addSeconds(
                viewer.clock.currentTime,
                timesArr[ind],
                new Cesium.JulianDate()
              )
              var position = entity.position.getValue(time)
              if (position) {
                var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(
                  position
                )
                var lat = Cesium.Math.toDegrees(cartographic.latitude)
                var lng = Cesium.Math.toDegrees(cartographic.longitude)
                var hei = cartographic.height / 1.9
                property.addSample(
                  time,
                  Cesium.Cartesian3.fromDegrees(lng, lat, hei)
                )
              }
            }
            cylinderEntitys.position = property
          })
          .catch(function(error) {
            window.alert(error)
          })
      },
      // 创建视锥体
      addFrustum(option) {
        var viewer = window.viewer
        return viewer.entities.add({
          name: 'uav-tmp-fly-wxsimple',
          position: Cesium.Cartesian3.fromDegrees(114.0, 36.0, 200000.0),
          cylinder: {
            slices: option.slices,
            length: option.length,
            topRadius: option.topRadius,
            bottomRadius: option.bottomRadius,
            material: option.color
          }
        })
      }
    }
  }
  </script>
   
  <style  scoped>
  .show {
    display: block;
  }
  .uvaRoutePlanBox {
    width: 100vw;
    height: 100vh;
  }
  /* 可视域 */
  #cesiumContainer {
    width: 100%;
    height: 100%;
  }
  .body {
    position: fixed;
    right: calc(100% - 300px);
    top: 166px;
    z-index: 999;
    width: 300px;
    text-align: center;
    background: rgba(0, 0, 0, 0.6);
    padding: 15px;
    color: #fff;
  }
  .form-item {
    margin: 5px;
    .form-label {
      display: inline-block;
      width: 100px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
    .form-connect {
      display: inline-block;
     
    }
  }
   
  .hide {
    display: none;
  }
  </style> -->
