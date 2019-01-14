<template>
  <div class="wrap">
    <img
      :src="url"
      alt=""
      class="img"
      :style="{height:`${height * 0.8}px`, width: `${width *0.8}px`}">
    <chart
      :style="{height:height + 'px', width:width + 'px'}"
      :auto-resize="true"
      :options="polar"
      theme="light" />
  </div>
</template>

<script>
export default {
  name: 'HeatMap',
  props: {
    configData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      dataColor: [
        'rgba(49,54,149,0.6)',
        'rgba(69,117,180,0.6)',
        'rgba(116,173,209,0.6)',
        'rgba(171,217,233,0.6)',
        'rgba(224,243,248,0.6)',
        'rgba(255,255,191,0.6)',
        'rgba(254,224,144,0.6)',
        'rgba(253,174,97,0.6)',
        'rgba(244,109,67,0.6)',
        'rgba(215,48,39,0.6)',
        'rgba(165,0,38,0.6)'
      ],
      polar: {
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          width: '80%',
          height: '80%',
          y: '10%',
          left: '0%',
          top: '0%'
        },
        xAxis: {
          type: 'category',
          data: [],
          show: false,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: [],
          show: false,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'vertical',
          precision: 3,
          right: 0,
          top: 'top',
          itemHeight: 100,
          show: true,
          inRange: {
            color: []
          }
        },
        series: [{
          name: '',
          type: 'heatmap',
          data: [],
          label: {
            normal: {
              show: false
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          tooltip: {
            position: function () {
              //  跟随鼠标
            }
          }
        }]
      },
      timing: null
    }
  },
  computed: {
    name () {
      return this.configData.name
    },
    width () {
      return Math.round(this.configData.width)
    },
    height () {
      return Math.round(this.configData.zoom * this.configData.width)
    },
    url () {
      return this.configData.url
    },
    color () {
      return (this.configData.color && this.configData.color.length > 0) ? this.configData.color : this.dataColor
    },
    xMax () {
      return this.configData.xMax
    },
    yMax () {
      return this.configData.yMax
    }
  },
  created () {
    this.initHeatChart()
  },
  methods: {
    initHeatChart () {
      this.polar.series[0].name = this.name
      this.polar.visualMap.inRange.color = this.color
      if (!this.configData.data || this.configData.left <= 0) return
      // 取最大热力值
      let heatValue = []
      for (let val of this.configData.data) {
        heatValue.push(val[2])
      }
      heatValue = heatValue.sort((previousArr, currentArr) => {
        return previousArr - currentArr
      })
      this.polar.visualMap.max = heatValue[heatValue.length - 1] + 0.001

      // 赋值x轴y轴
      const xdata = []
      const ydata = []
      for (let i = 0; i <= this.xMax; i++) {
        xdata.push(i)
      }
      for (let i = 0; i < this.yMax; i++) {
        ydata.push(i)
      }
      this.polar.xAxis.data = xdata
      this.polar.yAxis.data = ydata
      // 处理data数据
      const copyData = JSON.parse(JSON.stringify(this.configData.data))
      this.polar.series[0].data = copyData.map(item => {
        // item[2] *= 1000
        return item
      })
    }
  }
}
</script>

<style>
  .wrap{
    position: relative;
  }
  .img{
    position: absolute;
    left: 0;
    top: 0
  }
</style>
