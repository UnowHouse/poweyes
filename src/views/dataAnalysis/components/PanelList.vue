<template>
    <el-row class="panel-group" :gutter="40">
        <el-col v-for="(item,index) in chartSelectList" :key="index" 
            :xs="12" :sm="8" :lg="24" 
            class="card-panel-col">
        <div class='card-panel' @click="handleSetLineChartData(item,index)">
            <div :class="index == activeNum?'active-panel card-panel-icon-wrapper icon-money':'card-panel-icon-wrapper icon-money'">
            <i class="card-panel-icon el-icon-location" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
            <div class="card-panel-text">{{item.location}}</div>
            </div>
        </div>
        </el-col>  
    </el-row>
</template>

<script>

export default {
  name: 'PanelList',
  props: {
      chartSelectList:{
          type: Array,
      }
  },
  data() {
      return {
          activeLocation: this.chartSelectList[0].location,
          activeNum: 0,
      }
  },
  methods: {
    handleSetLineChartData(val,index) {
        this.activeLocation = val.location
        this.activeNum = index
        this.$emit('handleSetLineChartData', val)
    }
  }
}
</script>

<style  scoped>
    .panel-group {
        margin-top: 18px;
    }
    .card-panel {
        margin-bottom: 10px;

        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.11);
        border-color: rgba(5, 5, 5, 0.438);
    }

    .active-panel{
        color: #fff !important;
        background: #409EFF !important;
    }

    .card-panel-icon-wrapper:hover {
        color: #fff;
    }

    .icon-money:hover {
        background: #409EFF;
    }

    .card-panel:hover{
        box-shadow: 4px 4px 40px rgba(27, 30, 31, 0.377);
    }


    .icon-money {
        color: #409EFF;
    }

    .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
    }
    .card-panel-icon {
        float: left;
        font-size: 48px;
    }
    .card-panel-description {
        text-align: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

    }
    .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
    }
    .card-panel-num {
        font-size: 20px;
    }


</style>
