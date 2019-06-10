<template>
    <div class="app-container calendar-list-container">
        <div style="text-align: right;" class="filter-container">
            <div style="float: left;" class="junior-title">{{$t('history.record.title')}}</div>

            <el-input 
                @keyup.enter.native="handleFilter" 
                style="width: 200px;" class="filter-item" 
                :placeholder="$t('history.record.location')" 
                v-model="listQuery.location">
            </el-input>
            <div class="filter-item" >
                <el-date-picker
                    v-model="timeFrame"
                    type="daterange"
                    :start-placeholder="$t('history.record.startDate')"
                    :end-placeholder="$t('history.record.endDate')">
                </el-date-picker>

            </div>

            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
        </div>

        <el-table 
            :key='tableKey' 
            :data="list" 
            v-loading="listLoading" 
            element-loading-text="Loading..." 
            @filter-change="handleTag"
            border fit 
            highlight-current-row
            style="width: 100%"
            @sort-change="handleSortChange">
             
            <el-table-column 
                prop="location" 
                min-width="150px" 
                column-key="locationType"
                :label="$t('history.record.location')" 
                :filters="calendarTypeOptions"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                <span class="link-type" >
                    <el-button type="text" @click="skip(scope.row.location)" >{{scope.row.location}}</el-button>
                </span>
                <el-tag :type="scope.row.locationType | tagTypeFilter">{{scope.row.locationType | typeFilter}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="avgHeadCount" sortable width="150px" align="center" :label="$t('history.record.avgHeadCount')" >
                <template slot-scope="scope">
                <span style='color:red;'>{{scope.row.avgHeadCount}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="maxHeadCount" sortable width="150px" align="center" :label="$t('history.record.maxHeadCount')">
                <template slot-scope="scope">
                <span style='color:red;'>{{scope.row.maxHeadCount}}</span>
                </template>
            </el-table-column>
             <el-table-column prop="startTime" sortable width="170px" align="center" :label="$t('history.record.startTime')">
                <template slot-scope="scope">
                <span>{{scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="alarmDuration" sortable width="150px" align="center" :label="$t('history.record.alarmDuration')">
                <template slot-scope="scope">
                <i class="el-icon-time"/>
                <span >{{alarmContinueComputed(scope.row.startTime,scope.row.endTime)}}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" align="center" :label="$t('history.record.viewBack')" width="150">
                <template slot-scope="scope">
                    <el-button @click="showVideo(scope.row)" size="mini" type="success" >
                        {{$t('history.video.viewBackVideo')}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog width="60%" :before-close="handleClose" :title="$t('history.video.viewBackVideo')" :visible.sync="dialogVisible">
            <video-player  
                class="vjs-custom-skin"
                ref="videoPlayer"
                :options="playerOptions"
                :playsinline="true"
                >
            </video-player>
        </el-dialog>
        <div style="text-align:center;" class="pagination-container">
            <el-pagination background 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="listQuery.page" 
                :page-sizes="[5,10,20,30, 50]" 
                :page-size="listQuery.limit" 
                layout="total, sizes, prev, pager, next, jumper" 
                :total="total">
            </el-pagination>
        </div>

    </div>
</template>
<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'

import { fetchList} from '@/api/history'
import { parseTime } from '@/utils'

const calendarTypeOptions = [
  { value: '学校食堂', text: '学校食堂' , tagType: ''},
  { value: '政府大门', text: '政府大门', tagType: 'success' },
  { value: '大型商超', text: '大型商超', tagType: 'info' },
  { value: '校园大门', text: '校园大门', tagType: 'warning' },
  { value: '交通枢纽', text: '交通枢纽', tagType: 'danger' },
  { value: '其他', text: '其他', tagType: '' }
]


const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.value] = cur.text
  return acc
}, {})

const tagTypeKeyValue = calendarTypeOptions.reduce((acc,cur) => {
  acc[cur.value] = cur.tagType
  return acc
}, {})


export default {
    name: 'History',
    components:{
        videoPlayer,
    },
    data() {
        return {
            playerOptions:{
                muted: false,
                loop: false, 
                preload: 'auto', 
                language: 'en',
                playbackRates: [0.5, 1.0, 1.5, 2.0,4.0,8.0,16.0],
                fluid: true, 
                aspectRatio: '16:9', 
                sources: [{
                    type: 'video/mp4',
                    src: '',
                }],
                poster: this.thumbnail,
                notSupportedMessage: this.$t('history.video.errorVideo'),
            },
            tableKey: 0,
            list: null,
            total: null,
            listLoading: true,
            timeFrame:'',
            listQuery: {
                page: 1,
                limit: 10,
                startDate:undefined,
                endDate:undefined,
                location: undefined,
                locationType: undefined,
                order: 'descending',
                orderColumn: 'startTime',
            },
            calendarTypeOptions,
            dialogVisible:false,
        }
    },
    filters:{
        typeFilter(type) {
            return calendarTypeKeyValue[type]
        },
        tagTypeFilter(type){
            return tagTypeKeyValue[type]
        }
    },
    created() {
        this.getList()
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player
        }
    },
    methods:{
        skip(val){
            this.$router.push({
                name: 'historyVideo',
                params: {
                    location: val
                }
            })
        },
  
        handleClose(done){
            this.$refs.videoPlayer.player.pause()
            done();
        },
        showVideo(row){
            this.dialogVisible = true
            this.playerOptions.sources[0].src = row.videoSrc
            // this.playerOptions.poster = 
            // this.playerOptions.sources[0].type = row.videoType

        },

        handleTag(val){
            this.listQuery.locationType = val.locationType.join(',')
            this.getList()
        },
        getList() {
            this.listLoading = true
            fetchList(this.listQuery).then(response => {
                this.list = response.data.items
                this.total = response.data.total
                this.listLoading = false
            })
        },
        handleSortChange(val){
            this.listQuery.order = val.order
            this.listQuery.orderColumn = val.prop
            this.getList()
        },
        handleFilter() {
            this.listQuery.page = 1
            if(this.timeFrame){
                this.listQuery.startDate = this.timeFrame[0].getTime()
                this.listQuery.endDate = this.timeFrame[1].getTime()
            }else{
                this.listQuery.startDate = null
                this.listQuery.endDate =null
            }
            this.getList()
        },
        handleSizeChange(val) {
            this.listQuery.limit = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.page = val
            this.getList()
        },
    }
}
</script>
