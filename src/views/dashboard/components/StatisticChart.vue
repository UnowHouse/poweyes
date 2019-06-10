<template>
    <div :class="className" :style="{height:height,width:width}"></div>
    
</template>
<script>
import { debounce } from '@/utils'
import echarts from 'echarts'
export default {
    name: 'StatisticChart',
    props:{
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
            default:10,
        },
    },
    data() {
        return {
            chart: null,
        }
    },
    mounted() {
        this.initChart(this.chartData)
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
                this.setOptions(this.resovleData(val))
            }
        }
    },
    methods:{
        resovleData(data){
            let temp = {};
            for( let i in data){
                if(!temp[data[i].locationType] )
                    temp[data[i].locationType] = [ data[i] ]
                else
                    temp[data[i].locationType].push(data[i])
            }
            let chartdata = []
            let legends=[]
            let countDatas=[]
            let timeDatas = []
            for(let key in temp){
                legends.push(key)
                countDatas.push({value:temp[key].length,name:key})
                let time = 0
                for(let i in temp[key]){
                    time += temp[key][i]['endTime']-temp[key][i]['startTime']
                }                    
                timeDatas.push({value:Math.round(time/1000), name:key})
            }
            chartdata.push(legends)
            chartdata.push(countDatas)
            chartdata.push(timeDatas)
            return chartdata;
        },
        setOptions(val){
            let that = this
            
            this.chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} <br/>{a}: {c} ({d}%)"
                },
                legend: {
                    data:val[0]
                },
                series:[
                    {
                        name: that.$t('dashboard.chart.countName'),
                        type:'pie',
                        center: ['50%','55%'],

                        radius: ['0', '40%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                position: 'inner'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:val[1]
                    },
                    {
                        name:that.$t('dashboard.chart.timeName'),
                        type:'pie',
                        center: ['50%','55%'],

                        radius: ['50%', '65%'],
                        label:{
                            normal: {
                                formatter: `{a|{a}}\n{hr|}\n  {b|{b}：}{c}${that.$t('dashboard.chart.second')} {per|{d}%} `,
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    },
                                }
                            }
                        }
                        ,
                        data:val[2]
                    }
                ]
            })
        },
        initChart(data) {
            let chartData = this.resovleData(data)
            this.chart = echarts.init(this.$el)
            this.setOptions(chartData);

        },
    }
}
</script>
