<template>
    <div :class="className" :style="{height:height,width:width}"></div>

</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'



export default {
    name: "LineChart",
    props: {
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
            default: '350px'
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object
        },
        chartDataList: {
            type: Array,
        }
    },
    data() {
        return {
            chart: null,
            interval: null,
            data: [],
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
   
        chartDataList(val){
            if(val.length>300){
                val=val.slice(val.length-300,val.length)
            }
            this.setOptions(val)
        }
    },
    methods:{
        setOptions(chartData){
            let self = this
            this.chart.setOption({
                toolbox: {
                    right: '15',
                    show: true,
                    feature: {
                        saveAsImage: {
                            show:true,
                            title:'保存为图片'
                        }
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        var date = new Date(params.name);
                        return  date.getFullYear() +'-'+ (date.getMonth() + 1) + '-' + date.getDate() +
                        '  '+ date.getHours() + ':'+date.getMinutes() + ':' + date.getSeconds() +
                        ' <br> ' +
                        self.$t('detail.headCount') +'：' + params.value[1];
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    name: this.$t('detail.headCount'),
                    nameTextStyle:{
                        fontWeight: 'bold',
                        color :'#333',
                        fontSize:18,


                    },
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    hoverAnimation: false,
                    data: chartData,
                    itemStyle:{
                        normal:{
                            lineStyle: {
                                color: 'red',
                                width: 1
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(255, 158, 68)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(255, 70, 131)'
                                }])
                            },    
                        }
                        
                    }
                }]
            })
        },
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons')

            this.setOptions(this.chartDataList)
            
        }

    }
}
</script>

