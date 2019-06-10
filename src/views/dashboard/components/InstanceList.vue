<template>
    <el-table 
            :empty-text="$t('dashboard.table.emptyInstance')"
            class="chart-card" 
            :data="ipInstances" 
            style="width: 100%;padding-top: 15px;">
        <el-table-column :label="$t('dashboard.table.ipAddress')" min-width="100">
        <template slot-scope="scope">
            {{scope.row.ipAddress}}
        </template>
        </el-table-column>
        <el-table-column :label="$t('placeInfo.region')" min-width="100" align="center">
        <template slot-scope="scope">
            {{scope.row.province}}{{scope.row.city }}
        </template>
        </el-table-column>
        <el-table-column :label="$t('dashboard.table.status')" width="150" align="center">
        <template slot-scope="scope">
            <el-tag :type="scope.row.status?'success':'danger'">{{scope.row.status?$t('dashboard.table.statusTip'):$t('dashboard.table.errorStatusTip')}}</el-tag>
        </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'Instance',
    props:{
        ipInstances:{
            type: Array,
        }
    }
    
}
</script>

