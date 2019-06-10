<template>
    <el-container>
        <el-header style="padding:0; height: 100%;" class="junior-title">
            <span>{{$t('detail.infoTitle')}}</span>
        </el-header>
        <el-main>
            <el-row :gutter="30">
                <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>{{$t('detail.recommendManager')}}</span>
                        </div>
                        <div v-if="manager">
                            <el-tooltip class="item" effect="dark" :content="$t('detail.content.recoName')" placement="top">
                                <div class="component-item">
                                    {{manager.name}}
                                </div>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :content="$t('detail.content.recoPhone')" placement="top">

                                <div class="component-item">
                                    {{manager.phone}}
                                </div>
                            </el-tooltip>
                        </div>
                        <div v-else>
                            {{$t('detail.content.recoNoName')}}
                            <br>
                            <el-button type="text" @click="skipToManager">{{$t('detail.goManager')}}</el-button>
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7">
                    <el-tooltip class="item" effect="dark" :content="isRunning? $t('detail.content.normalRun'):$t('detail.content.abnormalRun')" placement="top">
                        <el-card class="" shadow="hover">
                            <div class="card-font normal-font"><i class="el-icon-view"></i></div>
                            <div class="cart-title">{{isRunning? $t('detail.running'):$t('detail.noRunning')}}</div>
                        </el-card>
                    </el-tooltip>
                </el-col>
                <el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7">
                    <el-tooltip class="item" effect="dark" :content="isAlarm?$t('detail.content.alarmTip'):$t('detail.content.noAlarmTip')" placement="top">
                        <el-card class="" shadow="hover">
                            <div :class="isAlarm? 'danger-font':'normal-font'" class="card-font"><i  :class="isAlarm?'el-icon-phone-outline':'el-icon-phone'"></i></div>
                            <div :class="isAlarm? 'danger-font':'normal-font'" class="cart-title">{{isAlarm? $t('detail.alarmUp'): $t('detail.alarmDown')}}</div>
                        </el-card>
                    </el-tooltip>
                </el-col>
                <el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7">
                    <el-tooltip class="item" effect="dark" :content="$t('detail.content.alarmDuration')" placement="top">
                        <el-card shadow="hover">
                            <div class="card-font">
                                {{alarmContinue}}
                            </div>
                            <div class="cart-title">{{$t('detail.alarmDuration')}}</div>
                        </el-card>
                    </el-tooltip>
                </el-col>
                <el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7">
                    <el-tooltip class="item" effect="dark" :content="$t('detail.content.detectCount')" placement="top">
                        <el-card :class="isAlarm?'danger-border':''" shadow="hover">
                            <div :class="isAlarm?'danger-font':''" class="card-font">{{headCount}}</div>
                            <div class="cart-title">{{$t('detail.headCount')}}</div>
                        </el-card>
                    </el-tooltip>
                </el-col>
            </el-row>
            
        </el-main>
    </el-container>
</template>
<script>
export default {
    name: 'SimpleMessage',
    props:{
        manager:{
            type:Object,
        },
        isAlarm:{
            type: Boolean,
            default: true
        },
        headCount:{
            type: Number,
            default: 0,
        },
        startTime:{
            type: Number,
        },
        isRunning:{
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            alarmContinue: '00:00:00',
            intervalAlarm: null,
        }
    },
    watch:{
        isAlarm(val){
            if(!val){
                clearInterval(this.intervalAlarm)
                this.intervalAlarm = null  
            }
            
        }
    },
    mounted(){
        let startTime = this.startTime
        this.intervalAlarm = setInterval(()=>{
            this.alarmContinue =this.alarmContinueComputed(startTime)
        },1000)
    },
    beforeDestroy(){
        clearInterval(this.intervalAlarm)
        this.intervalAlarm = null
    },
    methods:{
  
        skipToManager(){
            
            this.$router.push('../securityOffiers')
        }
    }

}
</script>
<style scoped>
.cart-title{
    text-align: center;
    font-size:14px;
}
.danger-font{
    color: red;
}
.normal-font{
    color:#090;
}

.offline-font{
    color: rgb(102, 102, 102)
}

.card-font{
    text-align: center;
    font-size: 34px;
}
.danger-border{
    border-color: red !important;
}
.danger-border:hover{
    -webkit-box-shadow: 0 2px 12px 0 rgba(255, 0, 0, 0.212);
    box-shadow: 0 2px 12px 0 rgba(255, 0, 0, 0.212);

}
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 45px;
}
</style>

