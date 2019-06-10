import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      startTime: +Mock.Random.date('T'),
      maxHeadCount: '@integer(3000,5000)',
      avgHeadCount: '@integer(300,5000)',
      'location|1': ['广东省深圳市大条区西门阿斯顿超市','广东省深圳市龙窝区啦啦呜职业技术学院W食堂','广东省深圳市田福区嗷嗷希望小学','广东省深圳市北山区呵呵哒振幅','广东省深圳市东山区凤翔大道23号人行道'],
      'locationType|1': ['学校食堂', '政府大门', '大型商超', '校园大门','交通枢纽'],
      alarmDuration: '@DATETIME(HH:mm:ss)',
      addressIp:'123.123.123.123',
      longitude: 12.12312312,
      latitude: 123.123123123,
      videoType:'video/mp4',
      'thumbnail|1':['http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg','https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg'],
      'videoUrl|1': ['http://vjs.zencdn.net/v/oceans.mp4','http://www.html5videoplayer.net/videos/madagascar3.mp4'],
    }))
  }
export default {
  getList: config => {
    const { location,locationType, startDate ,endDate, page = 1, limit = 10, orderColumn='startTime',order='descending'  } = param2Obj(config.url)

    let mockList = List.filter(item => {
      
      if (locationType && locationType.indexOf(item.locationType) < 0) return false
      if (startDate && endDate && item.startTime < startDate || item.startTime > endDate) return false
      if (location && item.location.indexOf(location) < 0) return false

      return true
    })
    
    function compare(property){        
      return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }    
    }
    mockList = mockList.sort(compare(orderColumn))
    if ( order === 'descending' ){
      mockList = mockList.reverse()
    }
    // if (sort === '-id') {
    //   mockList = mockList.reverse()
    // }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    
    return {
      code: 20000,
      data:{
        total: mockList.length,
        items: pageList
      }
      
    }
  },

}