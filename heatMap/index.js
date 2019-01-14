import Vue from 'vue'
import echarts from 'echarts'
import ECharts from 'vue-echarts/components/ECharts'
import echartsTheme from 'ant-design-vue-echart-theme'

Vue.component('chart', ECharts)
echarts.registerTheme('light', echartsTheme)

import heatMap from './src/heatMap.vue'

heatMap.install = function (Vue) {
  Vue.component('headMap',heatMap)
}

export default heatMap