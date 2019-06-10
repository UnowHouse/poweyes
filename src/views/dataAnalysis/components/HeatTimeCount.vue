<template>
    <div :class="className" :style="{height:height,width:width}"></div>
    
</template>
<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
var hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
        '07:00', '08:00', '09:00','10:00','11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
        '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
var locationTypes = ['其他', '政府大门', '学校食堂',
        '大型商超', '交通枢纽', '校园大门'];


export default {
    name: 'HeatTimeCount',
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
            type: Object
        },
        maxData: {
            type:Number,
            default:10,
        },
    },    
    data() {
        return {
            chart: null,
        }
    },
    mounted() {
        
        this.initChart(this.chartData,this.maxData)
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
            let that = this
            let series = []
            for(let key in val){
                series.push({
                    name: key,
                    type: 'heatmap',
                    data: val[key],
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                })
            }
            this.chart.setOption({
                tooltip: {
                    position: 'top',
                    formatter : function (params) {
                        return `${params.value[1]} <br> ${params.name}${that.$t('da.lately.alarmCount')}: ${params.value[2]}`
                    },
                },
                animation: false,
                grid: {
                    height: '60%',
                    y: '10%'
                },
                xAxis: {
                    type: 'category',
                    data: hours,
                    splitArea: {
                        show: true
                    },
                    nameTextStyle:{
                        fontWeight: 'bold',
                    },
                    name: this.$t('da.general.hours')

                },
                yAxis: {
                    type: 'category',
                    data: locationTypes,
                    splitArea: {
                        show: true
                    },
                    nameTextStyle:{
                        fontWeight: 'bold',
                    },
                    name: this.$t('da.general.locationType')
                },
                visualMap: {
                    min: 0,
                    max: maxData,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '10%'
                },
                series: series
            })
        },
        initChart(data,maxNum) {
            this.chart = echarts.init(this.$el)
            this.setOptions(data,maxNum);

        },

    }
}
</script>

