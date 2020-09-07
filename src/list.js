
// export async function getComponent() {
//   const { default: _ } = await import( webpackChunkName:"lodash"  'lodash')
//   element.innerHTML = _.join(['Dell', 'Lee'], '-');
//   return element
// }
// import {style} from  './style/style.js'
// console.log('this is dist')
// style();

var container = document.createElement('div');
container.id = 'container'
var map = new AMap.Map('container', {
  resizeEnable: true, //是否监控地图容器尺寸变化
  zoom:11, //初始化地图层级
  center: [116.397428, 39.90923] //初始化地图中心点
});