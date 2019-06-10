import request from '@/utils/request'

export function login(username, password,remember) {
  return request({
    url: '/user/login',
    method: 'post',
    params: {
      username:username,
      password:password,
      remember:remember
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getInfo',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'get',
    params: {token}
  })
}
