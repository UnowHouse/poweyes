<template>
    <el-collapse :value="openList" class="chart-card" style=" padding:5px;">
        
        <el-collapse-item v-for="(item,index) in locationData" :key="index" :name="index">
            <template slot="title">
            <el-tag :type="tag[index]?tag[index]:'info'">No.{{index+1}}</el-tag>
            <span>{{item.location}}</span>
            </template>
            <div><span>{{$t('da.general.location')}}：</span>{{item.location}}</div>
            <div><span>{{$t('da.general.locationType')}}：</span>{{item.locationType}}</div>
            <div><span>{{$t('da.general.totalAlarm')}}：</span>{{item.totalAlarm}}</div>
            <div><span>{{$t('da.general.avgHeadCount')}}：</span>{{item.avgHeadCount}}</div>
            <div><span>{{$t('da.general.maxHeadCount')}}：</span>{{item.maxHeadCount}}</div>
            <div><span>{{$t('da.general.place')}}：</span>{{item.province+item.city+item.district+item.township+item.streetNum}}</div>
        </el-collapse-item>

    </el-collapse>
</template>
<script>
export default {
    name: 'LocationList',
    props:{
        locationData:{
            type:Array,
        }
    },
    watch:{
        locationData(val){
            if(this.locationData.length>=9 && this.locationData.length < 12){
                this.openList = [0,1]
            }else if(this.locationData.length>=12 && this.locationData.length < 15){
                this.openList = [0]
            }else if(this.locationData.length>=15 && this.locationData.length < 20){
                this.openList = []
            }else if(this.locationData.length>20){
                this.locationData=this.locationData.slice(0,20)
            }else{
                this.openList = [0,1,2]
            }
        }
     
    },
    data() {
        return {
            openList:[0,1,2],
            tag:{
                0:'danger',
                1:'warning', 
                2:'warning',               
            }
        }
    }
}
</script>
<style scoped>
.el-collapse-item__content div{
    margin-left: 10px;
}
</style>

