<template>
    <el-dialog title="Shipping address" :visible.sync="dialogVisible">
        <slot></slot>
    </el-dialog>
</template>
<script>
export default {
    name: 'BoxVideo',
    props:{
        dialogVisible:{
            type:Boolean,
            default:false
        },
        video:{
            type:Object,        
        }
    },
    
    data(){
        return{
            show: false,
        }
    }

}
</script>
