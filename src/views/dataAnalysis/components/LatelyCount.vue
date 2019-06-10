<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'


export default {
  props: {

    className: {
      type: String,
      default: 'chart-card'
    },
    chartData:{
      type: Object 
    },
    id: {
      type: String,
      default: 'chart'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions({avgHeadCount,maxHeadCount,alarmCount}={}){
      let that = this;
      this.chart.setOption({
        color : ['#5793f3', '#d14a61', '#191970'],

        legend: {
          top: '10',
          data: [this.$t('da.lately.avgHeadCount'),this.$t('da.lately.maxHeadCount'),this.$t('da.lately.alarmCount')],

        },
        tooltip: {
          trigger: 'axis',

          axisPointer: {
              type : 'shadow',
            }
        },

        xAxis: {
          type: 'category',
          data :  function (){
              var list = [];
              let lastDay = new Date()
              for (var i = 0; i <7; i++) {
                lastDay = new Date(lastDay-24*60*60*1000);
                
                list.push(`${that.$t(`da.lately.${lastDay.getMonth()+1}`)}${lastDay.getDate()} ${that.$t('da.lately.day')} `);
              }
              list.reverse()
              return list;
          }(),
        },
        yAxis: [
          {
            type: 'value',
            name: this.$t('da.lately.manCount'),
          },
          {
            splitLine:{
              show: false
            },
            type: 'value',
            name: this.$t('da.lately.alarmCount'),

          }
        ],
        series: [
            {
              name:this.$t('da.lately.avgHeadCount'),
              type: 'bar',
              label: {
                  normal: {
                      show: true,
                      position: 'top'
                  }
              },
              data: avgHeadCount
            },
            {
              name:this.$t('da.lately.maxHeadCount'),
              type: 'bar',
              label: {
                  normal: {
                      show: true,
                      position: 'top'
                  }
              },
              data: maxHeadCount

            },
            {
              name:this.$t('da.lately.alarmCount'),
              type: 'line',
              yAxisIndex: 1,
              data: alarmCount

            },
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    }
  }
}
</script>
