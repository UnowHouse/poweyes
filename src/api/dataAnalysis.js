import request from '@/utils/request'



export function getDaData(){
  return request({
    url:'history/getSatisticData',
    method: 'get'
  })
}