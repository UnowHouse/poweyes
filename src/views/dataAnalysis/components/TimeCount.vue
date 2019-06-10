<template>
    <div :class="className" :style="{height:height,width:width}"></div>

</template>
<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
import 'echarts/theme/macarons' // echarts theme

const animationDuration = 3000

export default {
    name: 'TimeCount',
    props: {
        className: {
            type: String,
            default: 'chart-card'
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
        },
        chartData: {
            type: Array
        },
        maxData: {
            type:Number,
            default:100,
        }
    },
    data() {
        return {
            chart: null,
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
        clearInterval(this.interval)
        if (this.autoResize) {
            window.removeEventListener('resize', this.__resizeHanlder)
        }

        const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
        sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

        this.chart.dispose()
        this.chart = null
    },
    watch:{
        chartData: {
            deep: true,
            handler(val) {            
                this.setOptions(val,this.maxData)
            }
        },
        maxData:{
            deep: true,
            handler(val) {          
                this.setOptions(this.chartData,val)
            }
        }
    },
    methods:{
        setOptions(val,maxData){
            this.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
               
                radar: {
                    
                    name:{
                        textStyle: {
                                color: '#003366',
                        }
                    },
                    center: ['50%', '58%'],
                    radius: '66%',
                    splitNumber: 8,

                    splitArea: {
                       
                    },
                    indicator: [
                        { name: this.$t('da.time.earlyMorning'), max:maxData},
                        { name: this.$t('da.time.morning'), max:maxData },
                        { name: this.$t('da.time.noon'), max:maxData },
                        { name: this.$t('da.time.afternoon'), max:maxData },
                        { name: this.$t('da.time.dusk'), max:maxData },
                        { name: this.$t('da.time.night'), max:maxData}
                    ],
                    
                },
                legend: {
                    
                    top: '20',
                },
                series: [
                    {
                        type: 'radar',
                        symbolSize: 0,
                        tooltip: {
                            trigger: 'item'
                        },
                        areaStyle: {
                            normal: {
                                shadowBlur: 13,
                                shadowColor: 'rgba(0,0,0,.2)',
                                shadowOffsetX: 0,
                                shadowOffsetY: 10,
                                opacity: 1
                            }
                        },
                        data: val,
                        animationDuration: animationDuration
                    }
                ]
            })
        },

 
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons')
            this.setOptions(this.chartData,this.maxData);

        },
    },
}
</script>
