<template>
   
    <el-row>
      <el-col  :xs="{span: 24}" :sm="{span: 24}" :md="{span: 17}" :lg="{span: 17}" :xl="{span: 17}"> 
        <video-player  class="vjs-custom-skin"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true"
                        @play="onPlayerPlay($event)"
                        @pause="onPlayerPause($event)"
                        @ended="onPlayerEnded($event)"
                        @loadeddata="onPlayerLoadeddata($event)"
                        @waiting="onPlayerWaiting($event)"
                        @playing="onPlayerPlaying($event)"
                        @timeupdate="onPlayerTimeupdate($event)"
                        @canplay="onPlayerCanplay($event)"
                        @canplaythrough="onPlayerCanplaythrough($event)"
                        @ready="playerReadied"
                        @statechanged="playerStateChanged($event)">
        </video-player>
        <hr>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{activeVideo.location}}</span>
          </div>
          <div class="text item">
            <div class="thumbnail-describe">{{$t('history.record.startTime')}}：{{activeVideo.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
            <div class="thumbnail-describe">{{$t('history.record.location')}}：{{activeVideo.location}}</div>
            <div class="thumbnail-describe">{{$t('history.record.locationType')}}：{{activeVideo.locationType}}</div>
            <div class="thumbnail-describe">{{$t('placeInfo.region')}}：{{activeVideo.province+activeVideo.city+activeVideo.district}}</div>
            <div class="thumbnail-describe">{{$t('placeInfo.streetNum')}}：{{activeVideo.streetNum}}</div>
            <div class="thumbnail-describe">{{$t('history.record.alarmDuration')}}：{{alarmContinueComputed(activeVideo.startTime,activeVideo.endTime)}}</div>
            <div class="thumbnail-describe">{{$t('history.record.maxHeadCount')}}：{{activeVideo.maxHeadCount}}</div>
            <div class="thumbnail-describe">{{$t('history.record.avgHeadCount')}}：{{activeVideo.avgHeadCount}}</div>
            <div class="thumbnail-describe">{{$t('history.record.addressIp')}}：{{activeVideo.ipAddress}}</div>
            <div class="thumbnail-describe">{{$t('history.record.longitude')}}：{{activeVideo.longitude}}</div>
            <div class="thumbnail-describe">{{$t('history.record.latitude')}}：{{activeVideo.latitude}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 7}" :lg="{span: 7}" :xl="{span: 7}">
        <div class="video-list"> 
          <div v-for="video in videos" :key="video.id" @click="chooseVideo(video)" class="thumbnail"> 
            <div class="thumbnail-img"> 
              <img :src="thumbnail" :alt="video.location" /> 
            </div> 
            <div class="thumbnail-info"> 
              <h4>{{ video.location }}</h4> 
              <div class="thumbnail-views">
                {{$t('history.record.startDate')}}：{{video.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
              </div>
              <div class="thumbnail-views">
                {{$t('history.record.alarmDuration')}}：{{alarmContinueComputed(video.startTime,video.endTime)}}
              </div>
            </div> 
          </div> 
          <el-button @click="refreshVideoList" style="width:100%;" type="info" plain>
            <i class="el-icon-refresh"></i>
            {{$t('history.record.otherBatch')}}
          </el-button>
        </div>
      </el-col>
    </el-row>
     
    
</template>
<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'


export default {
    name: 'VideoList',
    components:{
      videoPlayer
    },
    props:{
        videos:{
            type: Array
        },
        activeVideo:{
          type: Object
        },
        thumbnail:{
          type:String,
          default:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556084481988&di=5081c63274933a58e2ba36377cfa2fe2&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb2de9c82d158ccbfc438812419d8bc3eb1354123.jpg'
        }
    },
    data() {
      return {
        // videojs options
        playerOptions: {
          // height: '360',
          // autoplay: true,
          muted: true,
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', //视频预加载
          language: 'en',
          playbackRates: [0.5, 1.0, 1.5, 2.0,4.0,8.0,16.0],
          fluid: true, 
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          sources: [{
            type: 'video/mp4',
            src: this.activeVideo.videoSrc,
          }],
          poster: this.thumbnail,
          notSupportedMessage: this.$t('history.video.errorVideo') //允许覆盖Video.js无法播放媒体源时显示的默认信息。

        }
      }

    },
    watch:{
      activeVideo(val){
        this.$refs.videoPlayer.player.src(val.videoSrc)
        // this.$refs.videoPlayer.player.poster(this.thumbnail)
      }
    },

    computed: {
      player() {
          return this.$refs.videoPlayer.player
      }
    },
    methods: {
      chooseVideo(video){  
        this.$emit('chooseVideo',video)
      },
      refreshVideoList(){
        this.$emit('refreshVideoList')
      },
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        player.currentTime(10)
        // console.log('example 01: the player is readied', player)
      }
    }
}
</script>
<style scoped>

  .thumbnail {
    display: flex;
    margin-bottom: 5px;
    padding: 5px  10px;
  }
  .thumbnail:hover {
    background: rgba(142, 130, 130, 0.2);
    cursor: pointer;
  }

  .thumbnail img {
    width: 168px;
    vertical-align: top;
  }

  .thumbnail-info {
    margin-left: 20px;
  }
  .thumbnail-info h4 {
    margin: 0 0 5px;
    font-size: 14px;
  }

  .thumbnail h3 {
    font-size: 16px;
  }

  .thumbnail-views {
    font-size: 12px;
    font-style: italic;
    margin-bottom: 5px;
  }

  .thumbnail-describe {
    border-bottom: 1px solid #ccc;
    font-size: 18px;
    padding: 5px;
    hyphens: unset;
    word-break: break-all;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

</style>