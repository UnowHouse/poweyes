<template>
    <div class="app-container">
        <div v-if="locationListData">
        <el-row :gutter="10">
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 8}" :lg="{span: 7}" :xl="{span: 6}">
                <h5 class="junior-title">
                    <span>{{$t('da.general.title')}}</span>
                </h5>    
                <location-list :locationData="locationListData"></location-list>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 16}" :lg="{span: 17}" :xl="{span: 18}"> 
                <h5 class="junior-title">
                    <span>{{$t('da.general.chartTitle')}}</span>
                </h5>    
                <ab-count :chartData="abCountData" height="400px"></ab-count>
                <br>
                <h5 class="junior-title">
                    <span>{{$t('da.time.chartTitle')}}</span>
                </h5>    
                <heat-time-count :chartData="timeCountData" :maxData="timeMaxData" width="100%"  height="500px"></heat-time-count>
                <!-- <time-count :chartData="timeCountData" :maxData="timeCountMaxData"  width="100%"  height="400px"></time-count> -->
            </el-col>
 

        </el-row>
        <h5 class="junior-title">
            <span>{{$t('da.lately.chartTitle')}}</span>
        </h5> 
        <el-row v-if="activeChartData" :gutter="10">
            
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 6}" :xl="{span: 6}">
                <panel-list  @handleSetLineChartData="handleSetLineChartData" :chartSelectList="headChartData"></panel-list>
            </el-col>
            
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 18}" :xl="{span: 18}">
              
                <lately-count :chartData="activeChartData" width="100%" height="600px"></lately-count>
            </el-col>
                    
        </el-row>
        <el-row v-if="!activeChartData">
              <h3 style="text-align:center;">{{$t("da.lately.notlog")}}</h3>
        </el-row>
        </div>
        <div v-else>
            <h1 style="text-align:center;">{{$t('da.general.noneTip')}}</h1>
        </div>
    </div>
</template>
<script>
import PanelList from './components/PanelList'
import AbCount from "./components/AbCount";
import LocationList from './components/LocationList';
import LatelyCount from './components/LatelyCount';
import TimeCount from './components/TimeCount';
import HeatTimeCount from './components/HeatTimeCount'
import { generalView,timeView,lately7Record, getDaData } from "@/api/dataAnalysis";
const headChartData = [
  {
    location: '',
    avgHeadCount: [0,0,0,0,0,0,0],
    maxHeadCount: [0,0,0,0,0,0,0],
    alarmCount:[0,0,0,0,0,0,0],
  },
]

export default {
    name: 'DataAnalaysis',
    components:{
        PanelList,
        AbCount,
        LocationList,
        LatelyCount,
        // TimeCount,
        HeatTimeCount,
    },
    data() {
        return{
            locationListData :[],
            abCountData: [],
            timeCountData: {},
            headChartData:headChartData,
            timeCountMaxData:10,
            timeMaxData:10,
            activeChartData: headChartData[0],
        }
    },
    created(){

        getDaData().then(res=>{
            this.locationListData = res.data.topItems
            this.sortLocationList()
            this.abCountData = this.getAbCountData(res.data.countItems)
            this.timeCountData = this.resolveTimeData(res.data.timeItems)
            this.timeMaxData = this.timeCountMaxData
            // this.timeCountMaxData = this.getTimeCoutMaxOne(this.timeCountData)
            this.$nextTick(()=>{
                this.headChartData = this.resolveRately7Data(res.data.latelyItems)
                this.activeChartData = this.headChartData[0]
            })
        })
    },
    methods: {
        sortLocationList(){
            function compare(property){
                return function(a,b){
                    var value1 = a[property];
                    var value2 = b[property];
                    return value2 - value1;
                }
            }
            this.locationListData.sort(compare('totalAlarm'))
        },
        handleSetLineChartData(val) {
            this.activeChartData = val
        },
        getAbCountData(chartData){
            let optionData = []
            // let tempMap = {}
            // let optionData2 = []
            // for(let i in chartData){
            //     let tmp = {}
            //     tmp.value = chartData[i].totalAlarm
            //     tmp.name = chartData[i].location
            //     optionData.push(tmp)
            //     if(!tempMap[chartData[i].locationType])
            //         tempMap[chartData[i].locationType]=0
            //     tempMap[chartData[i].locationType]+=chartData[i].totalAlarm
            // }
            // for (var key in tempMap){
            //     optionData2.push({name:key,value:tempMap[key]})
            // }
            for(let i in chartData){
                optionData.push({name:chartData[i].locationType,value:chartData[i].alarmCount})
            }
            return optionData

        },
        getTimeCountData(chartData){
            let optionData = []
            for(let i in chartData){       
                let tmp = {}
                let dataList = []
                dataList.push(chartData[i]['earlyMorning'])
                dataList.push(chartData[i]['morning'])
                dataList.push(chartData[i]['noon'])
                dataList.push(chartData[i]['afternoon'])
                dataList.push(chartData[i]['dusk'])
                dataList.push(chartData[i]['night'])
            
                tmp.name = chartData[i].location
                tmp.value = dataList
                optionData.push(tmp)
            }
            return optionData
        },
        resolveRately7Data(datas){
        
            let optionData = {}
            for(let i in datas){
                for(let j in datas[i]){
                    if(!optionData[datas[i][j].location]){
                        optionData[datas[i][j].location] = {
                            location: datas[i][j].location,
                            avgHeadCount: [0,0,0,0,0,0,0],
                            maxHeadCount: [0,0,0,0,0,0,0],
                            alarmCount:[0,0,0,0,0,0,0],
                        }
                    }
                    optionData[datas[i][j].location].avgHeadCount[i] = datas[i][j].avgHeadCount
                    optionData[datas[i][j].location].maxHeadCount[i] = datas[i][j].maxHeadCount
                    optionData[datas[i][j].location].alarmCount[i] = datas[i][j].totalAlarm
                }
            }
           

            let newOptionData = []
            for(let key in optionData){
                optionData[key].avgHeadCount.reverse()
                optionData[key].maxHeadCount.reverse()
                optionData[key].alarmCount.reverse()
                newOptionData.push(optionData[key])
            }
            return newOptionData
            
        },
        resolveTimeData(datas){
            let that = this;
            
            let tmp = datas.map(item=>{
                if(item.alarmCount > that.timeCountMaxData){
                    that.timeCountMaxData = item.alarmCount
                }
                return Object.values(item);
            })
            let sortData = {};
            for(let i in tmp){
                if(!sortData[tmp[i][1]])
                    sortData[tmp[i][1]] = []
                sortData[tmp[i][1]].push(tmp[i])
            }
            return sortData

        },
        // resolveTimeData(datas){
        //     let optionData = []
        //     let optionData2 = []
        //     let tempMap = {}
        //     for(let i in datas){
        //         // console.log(datas[i])
        //         // if(!tempMap[datas[i][0].locationType]){
        //         //     tempMap[datas[i][0].locationType]=[0,0,0,0,0,0]
        //         // }
        //         let tmp = {}
        //         let dataList = [0,0,0,0,0,0]
        //         let location = datas[i][0].location
        //         for(let j = 0; j < 6; j++){
                    
        //             if(datas[i][j]){
        //                 if(!tempMap[datas[i][j].locationType]){
        //                     tempMap[datas[i][j].locationType]=[0,0,0,0,0,0]
        //                 }
        //                 tempMap[datas[i][j].locationType][datas[i][j].timeClass] += datas[i][j].alarmCount
        //                 dataList[datas[i][j].timeClass] = datas[i][j].alarmCount
        //             }                    
        //         }
        //         tmp.name = location
        //         tmp.value = dataList
        //         optionData.push(tmp)
       
        //     }
            
        //     for(let key in tempMap){
        //         optionData2.push({name:key,value:tempMap[key]})
        //     }
        //     // console.log(optionData2)
        //     return optionData2
        // },
        getTimeCountMaxData(optionData){
            let TimeCountMaxData = {}
            for(let key in optionData){
      
                TimeCountMaxData[key] = Math.max.apply(null,optionData[key].value)

            }

            return TimeCountMaxData
        },
        getTimeCoutMaxOne(optionData){
            let tmp = []
            for(let key in optionData){
                tmp.push(Math.max.apply(null,optionData[key].value))

            }

            return Math.max.apply(null,tmp)
        }
        
  },

}
</script>
<style scoped>
.el-row{
    margin-bottom: 30px;
}
.el-col{
    margin-bottom: 30px;

}
</style>

