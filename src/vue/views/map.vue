<template>
  <div class="empty-store-map-wrap">
    <h3 class="title">省管产业单位共享仓储资源全景平台</h3>
    <div
      id="empty-store-map"
      class="empty-store-map"
    >
    </div>
    <div
      class="store-name"
      v-show="storeNameObj.isShow"
      :style="{left: storeNameObj.left + 'px',top: storeNameObj.top+ 'px'}"
    >{{storeNameObj.name}}
    </div>
    <div class="store-info-wrap">
      <ul class="store-info">
        <li>供应商名称：</li>
        <li>仓库地址：</li>
        <li>使用面积：</li>
        <li>仓库库容：</li>
        <li>仓库联系人：</li>
        <li>联系电话：</li>
        <li>仓库描述：</li>
      </ul>
      <ul class="store-info-pic">
        <li><img
            src=""
            alt=""
          ></li>
      </ul>
      <div class="store-info-more-btn">
        <el-button type="primary" size="small">主要按钮</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "emptyStoreMapView",
  data() {
    return {
      map: {
        mapContainer: {},
        GMap: {},
        initData: {
          carrierType: "",
          waybilllInfo: {
            isSigning: false
          },
          nodeList: [
            ["121.490273", "38.977459"],
            ["121.490318", "38.977436"],
            ["121.490318", "38.977436"],
            ["121.49025", "38.977364"]
          ],
          gpsList: []
        }
      },
      storeNameObj: {
        isShow: false,
        left: 0,
        top: 0,
        name: "甘肃中心仓库"
      },
      storeInfo: {
        isShow: true,
        data: null
      },
      storePicList: {
        isShow: true
      },
      markerMap: new Map()
      // imgsrc: '@src/assets/img/cang.png'
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var disCountry = new AMap.DistrictLayer.Country({
        zIndex: 10,
        SOC: "CHN",
        depth: 2,
        styles: {
          "nation-stroke": "#81D2FE",
          // 沿海线
          "coastline-stroke": "#81D2FE",
          "province-stroke": "#81D2FE",
          // 中国地级市边界
          "city-stroke": "",
          // 中国区县边界
          "county-stroke": "rgba(255,255,255,0.5)",
          fill: function(props) {
            //中国特有字段
            return "#1E569DFF";
          }
        }
      });

      this.map.mapContainer = new AMap.Map("empty-store-map", {
        // 是否监控地图容器尺寸变化
        resizeEnable: true,
        // 设置地图的缩放级别
        zoom: 4,
        // 设置地图的显示样式
        mapStyle: "amap://styles/b0cdde073e44964ea7f17d93350ee298",
        // 初始化地图中心点
        center: [116.397428, 39.90923],
        zooms: [3, 10],
        layers: [disCountry, new AMap.TileLayer()]
      });

      // 创建一个 Icon
      var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image:
          "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-9, -3)
      });

      // 创建点标记
      var m1 = new AMap.Marker({
        position: new AMap.LngLat(126.153287, 43.388602),
        icon: startIcon,
        offset: new AMap.Pixel(-13, -30)
      });
      m1.content = ["aa", "111"];
      var m2 = new AMap.Marker({
        position: [122.989225, 41.770819]
      });
      var m3 = new AMap.Marker({
        position: [128.086881, 46.376799],
        // @src/assets/img/cang.png
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
      });
      this.map.mapContainer.add([m1, m2, m3]);
      m1.on("click", this.showInfoClick);
      this.map.mapContainer.on("click", this.showInfoClick);
      m1.on("mouseover", this.showInfoOver);
      m1.on("mouseout", this.showInfoOut);

      // var style = [
      //   {
      //     url: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
      //     // 图标大小
      //     size: new AMap.Size(19, 31),
      //     // 图标显示位置偏移量，基准点为图标左上角
      //     anchor: new AMap.Pixel(1, 1)
      //   },
      //   {
      //     url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
      //     anchor: new AMap.Pixel(6, 6),
      //     size: new AMap.Size(11, 11)
      //   },
      //   {
      //     url: "https://a.amap.com/jsapi_demos/static/images/mass1.png",
      //     anchor: new AMap.Pixel(4, 4),
      //     size: new AMap.Size(7, 7)
      //   },
      //   {
      //     url: "https://a.amap.com/jsapi_demos/static/images/mass2.png",
      //     anchor: new AMap.Pixel(3, 3),
      //     size: new AMap.Size(5, 5)
      //   }
      // ];

      // var data = [
      //   { lnglat: [81.724576, 31.240421], name: "景县", style: 0 },
      //   { lnglat: [113.559954, 22.124049], name: "圣方济各堂区", style: 1 },
      //   { lnglat: [116.366794, 39.915309], name: "西城区", style: 2 },
      //   { lnglat: [116.486409, 39.921489], name: "朝阳区", style: 3 },
      //   { lnglat: [116.286968, 39.863642], name: "丰台区", style: 2 },
      //   { lnglat: [116.195445, 39.914601], name: "石景山区", style: 2 },
      //   { lnglat: [116.310316, 39.956074], name: "海淀区", style: 2 },
      //   { lnglat: [116.105381, 39.937183], name: "门头沟区", style: 2 },
      //   { lnglat: [116.139157, 39.735535], name: "房山区", style: 2 },
      //   { lnglat: [116.658603, 39.902486], name: "通州区", style: 2 },
      //   { lnglat: [116.653525, 40.128936], name: "顺义区", style: 2 },
      //   { lnglat: [116.235906, 40.218085], name: "昌平区", style: 2 },
      //   { lnglat: [116.338033, 39.728908], name: "大兴区", style: 2 },
      //   { lnglat: [116.637122, 40.324272], name: "怀柔区", style: 2 },
      //   { lnglat: [117.112335, 40.144783], name: "平谷区", style: 2 },
      //   { lnglat: [116.843352, 40.377362], name: "密云区", style: 2 }
      // ];

      // var mass = new AMap.MassMarks(data, {
      //   opacity: 0.8,
      //   zIndex: 111,
      //   cursor: "pointer",
      //   style: style
      // });

      // var marker = new AMap.Marker({
      //   content: " ",
      //   map: this.map.mapContainer
      // });

      // mass.on("mouseover", function(e) {
      //   // var lnglat = new AMap.LngLat(lon, lat);
      //   // 获得 Pixel 对象
      //   // var pixel = map.lngLatToContainer(e.data.lnglat);
      //   console.log(e.data);
      //   marker.setPosition(e.data.lnglat);
      //   marker.setLabel({ content: e.data.name });
      // });

      // mass.setMap(this.map.mapContainer);
    },
    showInfoClick(e) {
      // console.log(e);
      var text =
        "您在 [ " +
        // 触发事件的地理坐标
        e.lnglat.getLng() +
        "," +
        e.lnglat.getLat() +
        " ] 的位置单击了地图！";
      console.warn(text);
      // 触发事件的像素坐标，AMap.Pixel 类型
      // var pixel = ev.pixel;
      // 触发事件类型
      // var type = ev.type;
    },
    showInfoOver(ev) {
      console.log("鼠标移入覆盖物", ev, ev.target);
      this.storeNameObj.isShow = true;
      this.storeNameObj.left = ev.pixel.x;
      this.storeNameObj.top = ev.pixel.y;
    },
    showInfoOut(ev) {
      console.log("鼠标移出覆盖物");
      this.storeNameObj.isShow = false;
      // this.storeNameObj.isShow = false
    }
  },
  destroyed() {
    this.map.mapContainer.off("click", this.showInfoClick);
  }
};
</script>


<style lang="scss" scoped>
.empty-store-map-wrap {
  width: 100%;
  height: 100vh;
  position: relative;
  .title {
    width: 600px;
    height: 53px;
    line-height: 53px;
    background-color: #03cddd;
    background: linear-gradient(-45deg, transparent 40px, #12a4d8 0) right,
      linear-gradient(45deg, transparent 40px, #12a4d8 0) left;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 9;
    background-size: 50% 100%;
    background-repeat: no-repeat;
    text-align: center;
    color: #fff;
    font-size: 2vw;
    margin: 0;
    opacity: 0.8;
  }
  .empty-store-map {
    width: 100%;
    height: 100%;
  }
  .store-name {
    width: 185px;
    height: 52px;
    line-height: 52px;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    border: 1px solid #ccc;
    text-align: center;
    background-color: #1f2759;
    opacity: 0.5;
  }
  .store-info-wrap {
    width: 510px;
    position: absolute;
    bottom: 10px;
    right: 2px;
    border: 1px solid #ccc;
    font-size: 14px;
    .store-info-wrap {
      line-height: 20px;
    }
  }
}
</style>