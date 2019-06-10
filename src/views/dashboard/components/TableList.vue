<template>
    <div>
      <el-table
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        v-loading="listLoading"
        :data="renderList"
        element-loading-text="Loading"
        border
        :empty-text="$t('dashboard.table.emptyData')"
        fit
        highlight-current-row>
        
        <el-table-column  :label='$t("dashboard.table.address")' min-width="250" align="center">
            <template slot-scope="scope">
              <el-popover
                ref="addressTip"
                placement="top-start"
                width="200"
                trigger="hover"
                content="点击查看异常详情">
              </el-popover>
              <el-button v-popover:addressTip @click="skip(scope.row,renderList)" type="text">{{ scope.row.location }}</el-button>
              <el-tag :type="scope.row.locationType | tagTypeFilter">{{scope.row.locationType | typeFilter}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column  :label='$t("dashboard.table.headCount")'  width="110" align="center">
            <template slot-scope="scope">
              <span style='color:red;'>{{ scope.row.headCount }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" :label='$t("dashboard.table.startTime")'  width="200">
            <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.startTime|dateFormat }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" :label='$t("dashboard.table.recommendManager")'  width="200">
            <template slot-scope="scope">
            <span>{{ scope.row.manager?scope.row.manager.name:'' }}</span>
            <br>
            <span>{{ scope.row.manager?scope.row.manager.phone:'' }}</span>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

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
  name: 'TableList',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  props:{
    renderList:{
      type:Array
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        'tagsView.normal': 'gray',
        'tagsView.abnormal': 'danger',
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: this.renderList,
      listLoading: false
    }
  },
  watch:{
    renderList(val){
      console.log(val)
    }
  },
  created() {
  },
  methods: {
    skip(currentPlace,renderList){
      this.$router.push({
        name:'abnormalDetail',
        params:{
          id: currentPlace.socketId,
          currentPlace: currentPlace, 
          places: renderList}
        })
    },

  },
  filters:{
        typeFilter(type) {
            return calendarTypeKeyValue[type]
        },
        tagTypeFilter(type){
            return tagTypeKeyValue[type]
        }
    },
}
</script>
<style scoped>

</style>


