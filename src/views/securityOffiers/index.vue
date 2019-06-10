<template>
    <div class="app-container">
    	<el-row :gutter="10">
    		<el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 14}" :lg="{span: 14}" :xl="{span: 14}">
		    	<!-- 表 -->
					<h5 class="junior-title">
							<span>{{$t('secuOffiers.listTitle')}}</span>
					</h5>    
		    	<el-table 
		    		ref="MTable"
		            :data="list" 
		            v-loading="listLoading" 
		            element-loading-text="Loading..." 
		            border fit 
		            highlight-current-row
		            @row-click="handleSelect"
		            style="width: 100%">
		            <el-table-column
		            	prop="id"
		            	align="center"
		            	min-width="40px"
		            	:label="'id'">
		            	<template slot-scope="scope">
		                <span class="link-type" >{{scope.row.id}}</span>
		                </template>
		            </el-table-column>
		            <el-table-column 
		                prop="name"  
		                align="center"  
		                min-width="150px" 
		                :label="'姓名'">
		                <template slot-scope="scope">
		                <span class="link-type" >{{scope.row.name}}</span>
		                </template>
		            </el-table-column>
		            <el-table-column 
		                prop="phone"  
		                align="center"  
		                min-width="250px" 
		                :label="'联系方式'">
		                <template slot-scope="scope">
		                <span class="link-type" >{{scope.row.phone}}</span>
		                </template>
		            </el-table-column>
		            <el-table-column 
		                prop="phone"  
		                align="center"  
		                min-width="80px" 
		                :label="'状态'">
		                <template slot-scope="scope">
		                <span class="link-type" >
		                	<el-tag :type="scope.row.status?'success':'danger'">
		                		{{scope.row.status?$t('secuOffiers.free'):$t('secuOffiers.busy')}}
		                	</el-tag>
		                </span>
		                </template>
		            </el-table-column>
		        </el-table>
		    </el-col>
		    <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 10}" :lg="{span: 10}" :xl="{span: 10}">
		    	<div v-if="detailInfo">
						<h5 class="junior-title">
								<span>{{detailInfo.name}} {{$t('secuOffiers.mapTitle')}}</span>
						</h5>    
			    	<el-amap :style="{width:'100%',height:'300px'}" vid="amap" :zoom="zoom" class="amap-demo" :center="[detailInfo.longitude,detailInfo.latitude]">
			    		<el-amap-marker vid="component-marker" :position="[detailInfo.longitude,detailInfo.latitude]"></el-amap-marker>
			    	</el-amap>
			    	<hr>
						<h5 class="junior-title">
								<span>{{detailInfo.name}} {{$t('secuOffiers.detailTitle')}}</span>
						</h5>    
			    	<el-card class="box-card">
			          	<div slot="header" class="clearfix">
			            	<span>{{detailInfo.name}}的资料详情</span>
			          	</div>
			          	<div class="text item">
				            <div class="thumbnail-describe">
				            	{{$t('secuOffiers.name')}}：{{detailInfo.name}}
				            </div>
				            <div class="thumbnail-describe">
				            	{{$t('secuOffiers.phone')}}：{{detailInfo.phone}}
				            </div>
				            <div class="thumbnail-describe">
				            	{{$t('secuOffiers.city')}}：{{detailInfo.province+detailInfo.city}}
				            </div>
				            <div class="thumbnail-describe">
				            	{{$t('secuOffiers.district')}}：{{detailInfo.district}}
				            </div>
				            <div class="thumbnail-describe">
				            	{{$t('secuOffiers.streetNum')}}：{{detailInfo.streetNum}}
				            </div>
				            <div class="thumbnail-describe">
				            	{{$t('secuOffiers.status')}}：<span :class="detailInfo.status?'free':'busy'">{{detailInfo.status?$t('secuOffiers.free'):$t('secuOffiers.busy')}}</span>
				            </div>
				            <div class="thumbnail-describe">
				            	{{$t('secuOffiers.longitude')}}：{{detailInfo.longitude}}
				            </div>
				            <div class="thumbnail-describe">
				            	{{$t('secuOffiers.latitude')}}：{{detailInfo.latitude}}
				            </div>
			          	</div>
			        </el-card>
			    </div>
			    <div v-else>
			    	<hr>
			    	<h3>暂无数据</h3>
			    </div>
		    </el-col>

	    	<!-- 地图 -->
	    	<!-- 详细 -->
	    </el-row>
	    <br>
	    <el-row>
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
	    </el-row>

	</div>
</template>
<script>
	import {getManager} from "@/api/dashboard"
	export default{
		data(){
			return {
		        zoom:15,
				list:[],
				total:1,
				listQuery: {
	                page: 1,
	                limit: 10,
	            },
				listLoading: false,
				detailInfo:null
			}
		},
		created(){
			this.getList()
		},
		methods:{
			getList(){
				this.listLoading = true
				getManager(this.listQuery).then(res=>{
					this.list = res.data.items
					this.total = res.data.total
					this.listLoading = false
					this.detailInfo = this.list[0]
				})
			},
			handleSizeChange(val) {
	            this.listQuery.limit = val
	            this.getList()
	        },
	        handleCurrentChange(val) {
	            this.listQuery.page = val
	            this.getList()
	        },
	        handleSelect(val){
	        	this.getDetailById(val.id)
	        	console.log(this.detailInfo)
	        },
	        getDetailById(id){
	        	this.list.forEach((v,i)=>{
	        		if(v.id==id){
	        			this.detailInfo = v
	        		}
	        	})
	        },
		}
	}
</script>
<style scoped>
  .free{
  	color: green;
  }
  .busy{
  	color: red;
  }
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