<template>

      <el-row >
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 24}">
                <el-card class="home-text-junior" shadow="always">
                    <span>{{$t('dashboard.viewCard.abNumTag')}}</span>
                    <br>
                    <span class="tipFont abnormalFont">{{abNumber}}</span>
                </el-card>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}">
                <el-card class="home-text-junior"  shadow="always">
                    <span>{{$t('dashboard.viewCard.dayAbNumTag')}}</span>
                    <br>
                    <span class="tipFont abnormalFont">{{dayAlarmCount}}</span>
                </el-card>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}">
                <el-card class="home-text-junior" shadow="always">
                    <div @click="skip('dataAnalysis')" class="cus_a">
                        <span>
                            {{$t('dashboard.viewCard.dataAnalyze')}}
                        </span>
                        <br>
                        <span class="tipFont">
                            <svg-icon icon-class="chart" />
                        </span>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}">
                <el-card class="home-text-junior" shadow="always">
                    <div  @click="skip('history/historyRecord')" class="cus_a"> 
                        <span >
                            {{$t('dashboard.viewCard.history')}}
                        </span>
                        <br>
                        <span class="tipFont">
                            <svg-icon icon-class="documentation" />                    
                        </span>
                    </div>
                </el-card>
            </el-col>
        </el-row>

</template>
<script>
export default {
    name: "CardList",
    props:{
        abNumber:{
            type:Number
        },
        dayAlarmCount:{
            default:0,            
        }
    },
    methods:{
        skip(path){
            this.$router.push(path)
        },
    }
}
</script>
<style scoped>
.cus_a{
    color: #409EFF;
    cursor: pointer;
}
.cus_a:hover{
    color: rgb(168, 209, 255);
}
.tipFont{
    font-size: 40px;

}
.abnormalFont{
    color: red; 
}
.home-text-junior{
    text-align: center;
    margin: 5px;
}

</style>

