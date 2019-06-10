<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb v-if="device!='mobile'" class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <div class="threshold right-menu-item">{{$t('threshold')}}:
        <el-button v-popover:popover5 type="danger" size="small" round><span style="font-size:15px;">{{threshold}}</span></el-button>
      </div>
      <el-popover
        ref="popover5"
        placement="top"
        width="160"
        v-model="visible2">
        <p>
          {{$t('dashboard.table.headCount')}}:<br><el-input-number size="mini" v-model="tmpThreshold"></el-input-number>
        </p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="cancelCheckThreshold">{{$t("table.cancel")}}</el-button>
          <el-button type="primary" size="mini" @click="checkThreshold">{{$t("table.confirm")}}</el-button>
        </div>
      </el-popover>
      <lang-select class="international right-menu-item"></lang-select>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              {{$t("navbar.dashboard")}}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{$t("navbar.logOut")}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getThreshold,updateThreshold} from '@/api/dashboard'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import LangSelect from '@/components/LangSelect'
import { Message } from 'element-ui'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    LangSelect,
  },
  data(){
    return {
      visible2: false,
      threshold: 10,
      tmpThreshold: 10,
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  created(){
    getThreshold().then(res=>{
      this.threshold = res.data
      this.tmpThreshold = res.data
    })
  },
  methods: {
    checkThreshold(){
      this.visible2 = false  
      if(this.tmpThreshold != this.threshold){
        this.threshold = this.tmpThreshold
        let data = {'threshold':this.threshold}
        updateThreshold(data).then(res=>{
          Message({
            message: '更改成功',
            type: 'success',
            duration: 1 * 1000
          })
        })
      }
    },
    cancelCheckThreshold(){
      this.visible2 = false
        this.tmpThreshold = this.threshold
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .threshold {
      font-size: 16px;
      padding-right: 10px;
      color: #353535;
      border-right: 4px solid #bec1c7;
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

