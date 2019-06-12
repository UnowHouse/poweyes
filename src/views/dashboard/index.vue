<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <el-row :gutter="18">
          <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 10}" :lg="{span: 10}" :xl="{span: 10}">
            <h5 class="junior-title">
              <i class="el-icon-printer "></i>
              <span>{{$t("dashboard.viewCard.title")}}</span>
            </h5>
            <card-list :abNumber="renderList.length" :dayAlarmCount="dayAlarmCount"></card-list>
            <br>
            <h5 class="junior-title" style="width:100%;">
              <i class="el-icon-printer "></i>
              <span>{{$t("dashboard.instanceTitle")}}</span>
              <span style="float:right;">{{$t("dashboard.instanceNum")}}：<span style="color:green;">{{ipInstances.length}}</span></span>
            </h5>
            <instance-list :ipInstances="ipInstances" ></instance-list>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 14}" :lg="{span: 14}" :xl="{span: 14}">
         
            <h5 class="junior-title">
              <i class="el-icon-news "></i>
              <span>{{$t("dashboard.table.title")}} </span>
            </h5>
            <table-list :renderList="renderList"></table-list>
            <br>
            <h5 class="junior-title">
              <i class="el-icon-news "></i>
              <span>{{$t("dashboard.chart.title")}} </span>
            </h5>
            <statistic-chart :chartData="chartData" width="100%"  height="450px"></statistic-chart>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import CardList from './components/CardList'
import TableList from './components/TableList'
import { getDayAlarmCount,socketInstance,socketListence,getDayAlarmData } from '@/api/dashboard'
import InstanceList from './components/InstanceList'
import request from '@/utils/request'
import StatisticChart from './components/StatisticChart'

export default {
  name: "Dashboard",
  components:{
    CardList,
    InstanceList,
    TableList,
    StatisticChart
  },
  data() {
    return {
      ipInstances: [],
      dayAlarmCount:0,
      first:true,
      renderList: [],
      websock: null,
      socketList: [],
      aliveWebsock:null,
      chartData: [],
    }
  },

  created(){
    this.websock = this.initWebSocket(socketListence)
    this.aliveWebsock = this.initAliveWebSocket(socketInstance)
    getDayAlarmData().then(res=>{
      this.chartData = res.data
    })
    getDayAlarmCount().then(res=>{
      this.dayAlarmCount = res.data
    })
  },

  // beforeDestroy(){
  //   this.websock.close()
  //   this.aliveWebsock.close()
  // },

  methods:{
      
      initAliveWebSocket(wsuri){
        let socket = new WebSocket(wsuri);
        socket.onopen = e => {
          console.log('connected')
        }

        socket.onmessage = e => {
          let data = JSON.parse(e.data)
          this.ipInstances = data
        }

        socket.onclose = this.websocketclose

        this.$router.afterEach(function () {
          socket.close()
        })
      },

      initWebSocket(wsuri){ //初始化weosocket
        let socket = new WebSocket(wsuri);
        socket.onmessage = e => {
          let data = JSON.parse(e.data)
          if(data.isAlarm){
            this.insertData(data)
          }
          else{
            this.removeBySocketId(data.socketId)
          }
            
        }
        this.$router.afterEach(function () {
          socket.close()
        })
        socket.onerror = this.websocketerror;

        socket.onclose = this.websocketclose;
        return socket
      },

      insertData(alarmMsg){
        if(!this.renderList.length){
          getDayAlarmCount().then(res=>{
            this.dayAlarmCount = res.data
          })
          this.renderList.push(alarmMsg)
          return
        }
        let flag = true
        for(let i in this.renderList){
          if(this.renderList[i].socketId == alarmMsg.socketId){
            this.$set(this.renderList, i, alarmMsg)
            flag = false
            break
          }
        }
        if(flag){
          getDayAlarmCount().then(res=>{
            this.dayAlarmCount = res.data
          })
          this.renderList.push(alarmMsg)
        }
      },

      removeBySocketId(socketId){
        for(let i in this.renderList){
          if(this.renderList[i].socketId == socketId){
            this.renderList.splice(i,1)
            break
          }
        }
        getDayAlarmData().then(res=>{
          this.chartData = res.data
        })
        
      },

      websocketonmessage(e){
        let self = this //数据接收
        let data = JSON.parse(e.data)
        if(!this.abnormalMap.hasOwnProperty(data.addressIp)){
          this.abnormalMap[data.addressIp] = data
          this.abnormalMap[data.addressIp].startTime = data.currentTime

        }else{
          this.updatePartData(data.addressIp,data)
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

  }
  
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-col{
  margin-bottom: 30px;
}

</style>
