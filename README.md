# heat-map-img

## Project setup
```
npm install heat-map-img
```

### Compiles and hot-reloads for development
```
组件参数
config: {
  name: String,            //组件显示名称，
  zoom: Number,            //图片高宽比  height/width
  width: Number,           //画布宽度
  url: String,             //图片路径
  data: [[0,0,1],[1,1,2]], //二维数组 里数组第一参数 x轴位置 二 y轴参数 三 颜色深度
  color: [],               //可rgb 可# 可英文
  xMax: Number,            //x轴最大值
  yMax: Number             //y轴最大值
}
应用
global
import Heatmap from 'heat-map-img'
Vue.use(Heatmap)
or
import Heatmap from 'heat-map-img'
components: {
  heatmap: Heatmap
}

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
