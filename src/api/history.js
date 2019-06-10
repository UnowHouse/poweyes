import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'history/getRecord',
    method: 'get',
    params: query
  })
}