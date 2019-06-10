<template>
  <el-container>
    <el-header style="padding:0; height: 100%;" class="junior-title">
        <span>{{$t('detail.moniorLocation')}}</span>
    </el-header>
    <el-main :style="{width:'100%',height:'300px'}">
      <el-amap vid="amap" :zoom="zoom" class="amap-demo" :center="center">
        <el-amap-info-window v-if="windowOp.position"
          :position="windowOp.position"
          :content="windowOp.content"
          :visible="windowOp.visible">
        </el-amap-info-window>
        <el-amap-marker vid="component-marker" :position="center" :events="alarm.events" ></el-amap-marker>
        <el-amap-circle-marker :center="center" :fillOpacity="0.7" :strokeOpacity="0" :radius="25" :fill-color="'#bf1515'" ></el-amap-circle-marker>
        <el-amap-marker v-if="managerLongitude&&managerLatitude" vid="component-marker" :position="managerLocation" :events="manager.events" ></el-amap-marker>

      </el-amap>
    </el-main>
    
  </el-container>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'DetectMap',
    props:{
      locationLongitude:{
        type:Number,
      },
      locationLatitude:{
        type:Number,
      },
      managerLongitude:{
        type:Number,
      },
      managerLatitude:{
        type:Number,
      }
    },
    created(){
      // this.req_post()
    },
    data(){
      const self = this;
      return {
        zoom:15,
        center: [this.locationLongitude, this.locationLatitude],
        managerLocation: [this.managerLongitude,this.managerLatitude],
        windowOp:{
          position:null,
          content:'',
          visible:false
        },
        alarm:{
          events:{
            touchstart:()=>{
              this.windowOp.content = this.$t('detail.alarmPlace')
              this.windowOp.position = this.center
              this.windowOp.visible = true;
            },
            mouseover:()=>{
              this.windowOp.content = this.$t('detail.alarmPlace')
              this.windowOp.position = this.center
              this.windowOp.visible = true;
            },
            mouseout:()=>{
              this.windowOp.visible = false;
            }
          },
        },
        manager:{
          events:{
            touchstart:()=>{
              this.windowOp.content = this.$t('detail.alarmManager')
              this.windowOp.position = this.managerLocation
              this.windowOp.visible = true;
            },
            mouseover:()=>{
              this.windowOp.content = this.$t('detail.alarmManager')
              this.windowOp.position = this.managerLocation
              this.windowOp.visible = true;
            },
             mouseout:()=>{
              this.windowOp.visible = false;
            }

          },
        },
      }
    },
    methods:{

      req_post() {
        let that=this;
        let registerUrl="http://restapi.amap.com/v3/batch?key=";
        let newUserInfo={
          "ops": [
            {
              "url": `/v3/place/around?offset=10&page=1&key=${this.amapKey}&location=${this.locationLongitude},${this.locationLatitude}&output=json&radius=100000&types=080000`
            }
          ]
        };
        axios.post(registerUrl, newUserInfo, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response=>{
          console.log(response['data'][0]['body']['pois'])
        })
        .catch(error=>{
          console.log(error);
        });

      },
      
    }
  }
</script>

<style>
  .amap-demo {
    height: 300px;
  }
</style>

