import request from '@/utils/request'

export function getDayAlarmCount(data) {
    return request({
        url: 'cache/getDayAlarmCount',
        method:'get',
        data
      })
  }
export function getManager(data){
	return request({
        url: 'manager/getManager',
        method:'get',
        data
      })
}

export function getThreshold(data){
  return request({
    url: 'cache/getThreshold',
    method:'get',
    data
  })
}

export function updateThreshold(data){
  return request({
    url: 'cache/updateThreshold',
    method: 'put',
    params: data
  })
}

export function getDayAlarmData(data){
  return request({
    url: 'cache/getDayAlarmData',
    method: 'get',
    data
  })
}

export const socketListence = process.env.BASE_SOCKET+'/alarm/showCenter/10086'
export const socketInstance = process.env.BASE_SOCKET+'/alive/10086'
export const socketDetail = process.env.BASE_SOCKET+'/alarm/showDetail/'