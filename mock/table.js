import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|5': [{
        location: '广东省深圳市龙岗区某个食堂',
        locationType: '学校食堂',
        addressIp: '@Integer(0,255).@Integer(0,255).@Integer(0,255).@Integer(0,255)',
        longitude: '@Float(0,100)',
        altitude: '@Float(0,100)',
        currentTime: new Date().getTime(),
        // startTime: '@datetime',
        headCount: '@integer(300, 5000)',
        'manager|1': ['mike tony', 'lebron james', 'stephon otruos'],
        'phone|1': ['123123123','34214123','234423123'],
        
      }]
    })
    return {
      code: 20000,
      data: items
    }
  }
}
