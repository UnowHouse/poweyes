<template>
    <div>
        <div class="table-viewer-header">
            <span class="table-viewer-topbar-title">
                {{$t('history.record.location')}}
            </span>
        </div>
        <table class="table-default-viewer">
            <tbody>
                <tr>
                    <td>
                        <span class="text-muted">{{$t('placeInfo.region')}}：</span>{{detailInfo?detailInfo.province+detailInfo.city:''}}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="text-muted">{{$t('placeInfo.district')}}：</span>{{detailInfo?detailInfo.district:''}}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="text-muted">{{$t('placeInfo.street')}}：</span>{{detailInfo?detailInfo.township:''}}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="text-muted">{{$t('placeInfo.streetNum')}}：</span>{{detailInfo.streetNumber?detailInfo.streetNumber.street+detailInfo.streetNumber.number:''}}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="text-muted">{{$t('placeInfo.locationType')}}：</span>{{placeInfo.locationType}}
                    </td>
                </tr>
            
                <tr>
                    <td>
                        <span class="text-muted">{{$t('placeInfo.ipAddress')}}：</span>{{placeInfo.ipAddress}}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="text-muted">{{$t('placeInfo.longitude')}}：</span>{{placeInfo.longitude}}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="text-muted">{{$t('placeInfo.latitude')}}：</span>{{placeInfo.latitude}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'Message',
    props:{
        placeInfo:{
            type:Object
        },
        detailInfo:{
            type:Object
        }
    },
  
}
</script>
<style scoped>
.table-viewer-header{
    margin-top: 10px;
    /* margin-bottom: 10px; */
    height: 40px;
    background: #F5f6FA;
    line-height: 38px;
    border: 1px solid #e1e6eb;
    position: relative;
    border-left: 4px solid #6d7781;
}
.table-viewer-header .table-viewer-topbar-title {
    font-size: 14px;
    color: #333333;
    display: inline-block;
    margin-left: 16px;
}
.table-default-viewer{
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    background-color: #FFF;
}
.table-default-viewer td{
    font-size:14px;
    padding: 11px 20px;
    border: 1px solid #eeeeee;
}
.text-muted{
    color: #999999;

}
</style>