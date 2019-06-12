<template>
    <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>

import echarts from 'echarts'
import 'echarts/theme/macarons' // echarts theme

import { debounce } from '@/utils'


export default {
    name: 'AbCount',
    props:{
        className: {
            type: String,
            default: 'chart-card'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Array
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
                this.initChart(val)
            }
        }
    },
    methods:{
        getChartData(chart){
            return [
            ]
        },
        setOptions(val){
            this.chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} <br/>{a} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    top: '10',
                },
                calculable: true,
                series: [
                    {
                        name: this.$t('da.general.locationAlarmCount'),
                        type: 'pie',
                        roseType: 'radius',
                        radius: [15, 115],
                        center: ['50%', '58%'],
                        data: val,
                        animationEasing: 'cubicInOut',
                        animationDuration: 2600
                    }
                ]
            })
        },
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons')
            this.setOptions(this.chartData);

        },

    },

}
</script>
