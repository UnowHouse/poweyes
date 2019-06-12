<template>
    <div v-if="currentPlace" class="app-container">
        <el-row class="detail-head">
            
            <el-col style="line-height: 40px;" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                {{$t('detail.currentPlace')}}：{{currentPlace.location}}
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                
                <detect-map 
                :locationLongitude="currentPlace.longitude-0"
                :locationLatitude="currentPlace.latitude-0"
                :managerLongitude="currentPlace.manager?currentPlace.manager.longitude-0:undefined"
                :managerLatitude="currentPlace.manager?currentPlace.manager.latitude-0:undefined"

                ></detect-map>
                <message :placeInfo="currentPlace" :detailInfo="locationInfo"></message>
            </el-col>
            <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                
                <simple-message :manager="currentPlace.manager" :headCount="headCount" :isAlarm="isAlarm" :isRunning="isRunning" :startTime="currentPlace.startTime"></simple-message>
                <my-charts :chartDataList="chartDataList" ></my-charts>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Message from './components/Message'
import DetectMap from './components/Map'
import MyCharts from './components/Charts'
import SimpleMessage from './components/SimpleMessage'
import { lazyAMapApiLoaderInstance } from 'vue-amap'
import { socketDetail } from '@/api/dashboard'
import axios from 'axios'

function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    }
}

export default {
    name: 'detail',
    components:{
        Message,
        DetectMap,
        MyCharts,
        SimpleMessage,
    },
    data(){
        return {
            locationInfo: {},
            currentPlace: null,
            websock: null,
            renderList: [],
            chartDataList: [],
            zoom:16,
            position:[121.406051,31.179695],
            headCount:0,
            isRunning: true,
            isAlarm: true,
        }
    },
    created(){
        if(this.$route.params.id){
            if(this.$route.params.currentPlace){
                this.currentPlace = this.$route.params.currentPlace
                this.infoPoisition(this.currentPlace.longitude,this.currentPlace.latitude)
                // this.renderList = this.$route.params.places
            }
            this.websock = this.initWebSocket(socketDetail+this.$route.params.id)
        }
    },
  
    methods: {
        initWebSocket(wsuri){ //初始化weosocket
            let socket = new WebSocket(wsuri);
                socket.onmessage = e => {
                    let data = JSON.parse(e.data)
                    if(data instanceof Array){
                        for(let i in data){
                            this.chartDataList.push(this.resolveChartData(data[i]))
                        }
                        this.headCount = data[data.length-1].headCount
                        this.currentPlace = data[0]
                        this.placeInfo = data[0]
                        this.infoPoisition(this.currentPlace.longitude,this.currentPlace.latitude)

                    }else{
                        if(data.isAlarm){
                            this.chartDataList.push(this.resolveChartData(data))
                            this.headCount = data.headCount
                        }
                        else{
                            this.isAlarm = false
                            this.headCount = 0
                        }
                    }
                }

                this.$router.afterEach(function () {
                    socket.close()
                })

                socket.onerror = this.websocketerror;

                socket.onclose = this.websocketclose;
                return socket
        },

        resolveChartData(alarmData){
            let time = new Date(alarmData.currentTime)
            return {
                name: time.toString(),
                value: [
                    time,
                    alarmData.headCount
                ]

            }
        },

        websocketerror(e){
            this.$message({
                message: this.$t('socket.errorTip'),
                type: 'error'
            })
        },

        websocketclose(e){  //关闭
     
        },

        handleCommand(command) {
            console.log(this.currentPlace)
            // this.currentPlace.location = command;
            this.$message('click on item ' + command);
        },
        synchronizeHeadCount(val){
            this.headCount = val.value[1]
        },
        infoPoisition(longitude,latitude) {
            let url = `http://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${longitude},${latitude}&key=${this.amapKey}&radius=0&extensions=base`
            axios.get(url).then( res=>{

                this.locationInfo = res.data.regeocode.addressComponent
            }).catch( err=>{
              console.log(err)
            })
        }
      
    }
}
</script>

<style scoped>
.amap-wrapper {
  width: 500px;
  height: 500px;
}
</style>
<style scoped>

</style>

