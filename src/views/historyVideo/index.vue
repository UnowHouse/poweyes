<template>
    <div class="app-container">
        <div style="text-align: right;" class="filter-container">
            <div style="float: left;" class="junior-title">{{$t('history.video.title')}}</div>

            <el-input 
                @keyup.enter.native="handleFilter" 
                style="width: 300px;" class="filter-item" 
                :placeholder="$t('history.record.location')" 
                v-model="listQuery.location">
            </el-input>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
        </div>
        <video-list v-if="activeVideo.videoSrc" @refreshVideoList="refreshVideoList" @chooseVideo="chooseVideo" :activeVideo="activeVideo" :videos="videos"></video-list>
    </div>
</template>
<script>
import VideoList from "./components/VideoList";
import { fetchList} from '@/api/history'

export default {
    name: 'RecordVideo',
    components:{
        VideoList,
    },
    data(){
        return {
            total: 0,
            videos: [],
            activeVideo: {
                thumbnail:'',
                videoType:'video/mp4',
                videoSrc:'',
            },
            listQuery: {
                page: 1,
                limit: 10,
                location: undefined,
                order: 'descending',
                orderColumn: 'startTime',
            },
        }
    },
    created(){
        this.listQuery.location = this.$route.params.location
        this.getList(true)
    },
    methods:{
        chooseVideo(video){
            this.activeVideo = video
        },
        getList(active){
            fetchList(this.listQuery).then(response => {
                this.videos = response.data.items
                this.total = response.data.total

                if(active){
                    this.activeVideo = this.videos[0]
                }
            })
        },
        handleFilter(){
            this.listQuery.page = 1
            this.getList()
        },
        refreshVideoList(){
            let totalPage = Math.ceil(this.total/this.listQuery.limit)
            this.listQuery.page =  Math.floor(Math.random()*totalPage+1);
            this.getList(false)
        },
    }
}
</script>
