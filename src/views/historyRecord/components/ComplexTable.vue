<template>
    <div class="app-container calendar-list-container">

        <div style="text-align: right;" class="filter-container">
            <div style="float: left;" class="junior-title">异常记录查询</div>

            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title">
            </el-input>
            <div class="filter-item" >
                <el-date-picker
                v-model="value9"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                default-value="2010-10-01">
                </el-date-picker>
          
            </div>

            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
        </div>
        <el-table 
            :key='tableKey' 
            :data="list" 
            v-loading="listLoading" 
            element-loading-text="给我一点时间" 
            border fit 
            highlight-current-row
            style="width: 100%"
             @sort-change="handleSortChange">
            <el-table-column 
                prop="address" align="center"  min-width="150px" :label="$t('history.record.location')" 
                :filter-method="filterTag"
                :filters="calendarTypeOptions"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                <span class="link-type" >{{scope.row.address}}</span>
                <el-tag :type="scope.row.type | tagTypeFilter">{{scope.row.type | typeFilter}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="$t('history.record.avgHeadCount')" 
                prop="avgHeadCount" 
                sortable 
                width="110px" 
                align="center">
                <template slot-scope="scope">
                <span style='color:red;'>{{scope.row.avgHeadCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('history.record.maxHeadCount')" 
                prop="maxHeadCount" 
                sortable 
                width="120px" 
                align="center">
                <template slot-scope="scope">
                <span style='color:red;'>{{scope.row.maxHeadCount}}</span>
                </template>
            </el-table-column>
             <el-table-column :label="$t('history.record.startTime')" 
                prop="startTime" 
                sortable 
                width="170px" 
                align="center">
                <template slot-scope="scope">
                <span>{{scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="alarmContinue" sortable width="150px" align="center" label="异常时长">
                <template slot-scope="scope">
                <i class="el-icon-time"/>
                <span >{{scope.row.alarmContinue}}</span>
                </template>
            </el-table-column>

            <el-table-column :label="$t('history.record.viewBack')"
                class-name="status-col" 
                align="center"
                width="150">
                <template slot-scope="scope">
                    <el-button @click="showVideo(scope.row)" size="mini" type="success" >
                        {{$t('history.record.viewBackVideo')}}
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-dialog before-close="handleClose" title="Shipping address" :visible.sync="dialogVisible">
            <mini-video ref="miniVideo" :url="url" :thumbnail="thumbnail" :videoType="videoType"></mini-video>
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
import MiniVideo from '@/components/MiniVideo'
import BoxVideo from './BoxVideo'
import { fetchList} from '@/api/history'
import { parseTime } from '@/utils'
const calendarTypeOptions = [
  { value: 'cantee', text: '学校食堂' , tagType: ''},
  { value: 'governmentGate', text: '政府大门', tagType: 'success' },
  { value: 'supermarket', text: '大型商超', tagType: 'info' },
  { value: 'campusGate', text: '校园大门', tagType: 'warning' },
  { value: 'trafficHub', text: '交通枢纽', tagType: 'danger' }

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
    name: 'complexTable',
    components:{
        BoxVideo,
        MiniVideo,
    },
    data() {
        return {
            url: '',
            thumbnail: '',
            videoType: '',
            dialogVisible: false,
            value4: '',
            value9: '',
            tableKey: 0,
            list: null,
            total: null,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 10,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            },
            importanceOptions: [1, 2, 3],
            calendarTypeOptions,
            sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
            statusOptions: ['published', 'draft', 'deleted'],
            showReviewer: false,
            temp: {
                id: undefined,
                importance: 1,
                remark: '',
                timestamp: new Date(),
                title: '',
                type: '',
                status: 'published'
            },
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
                update: 'Edit',
                create: 'Create'
            },
            dialogPvVisible: false,
            pvData: [],
            rules: {
                type: [{ required: true, message: 'type is required', trigger: 'change' }],
                timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
                title: [{ required: true, message: 'title is required', trigger: 'blur' }]
            },
            downloadLoading: false
        }
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: 'success',
                draft: 'info',
                deleted: 'danger'
            }
            return statusMap[status]
        },
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
    watch:{
        value9(val){
            console.log(val)
        },
        value4(val){
            console.log(val)
        }
    },
    methods: {

        showVideo(row){
            this.dialogVisible = true
            this.url = row.url
            this.thumbnail = row.thumbnail
            this.videoType = row.videoType
        },
        handleSortChange(val){
            console.log(val)
        },
        filterTag(value, row) {
            return row.type === value;
        },
        getList() {
            this.listLoading = true
            fetchList(this.listQuery).then(response => {
                this.list = response.data.items
                this.total = response.data.total
                this.listLoading = false
            })
        },
        handleFilter() {
            this.listQuery.page = 1
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
        handleModifyStatus(row, status) {
            this.$message({
                message: '操作成功',
                type: 'success'
            })
            row.status = status
        },
        resetTemp() {
            this.temp = {
                id: undefined,
                importance: 1,
                remark: '',
                timestamp: new Date(),
                title: '',
                status: 'published',
                type: ''
            }
        },
        handleCreate() {
            this.resetTemp()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        createData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
                this.temp.author = 'vue-element-admin'
                createArticle(this.temp).then(() => {
                    this.list.unshift(this.temp)
                    this.dialogFormVisible = false
                    this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                    })
                })
                }
            })
        },
        
       
        
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                    return parseTime(v[j])
                } else {
                    return v[j]
                }
            }))
        }
    }
}
</script>
