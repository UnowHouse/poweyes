import Mock from 'mockjs'

const generalView = []
const timeView = []
const lately7View = []
const dates = []
const locations = ['广东省深圳市大条区西门阿斯顿超市','广东省深圳市龙窝区啦啦呜职业技术学院W食堂','广东省深圳市田福区嗷嗷希望小学','广东省深圳市北山区呵呵哒振幅','广东省深圳市东山区凤翔大道23号人行道']
for( let i = 0; i < 5; i++){
    generalView.push(Mock.mock({
        location: locations[i],
        'locationType|1': ['大型商超','交通枢纽','学校食堂','校园大门','政府大门'],
        maxHeadCount: '@integer(100,500)',
        avgHeadCount: '@integer(50,400)',
        alarmCount: '@integer(1,100)',
    }))
}
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}
generalView.sort(compare('alarmCount'))
generalView.reverse()

for(let i = 0; i< 5; i++){
    timeView.push(Mock.mock({
        location: locations[i],
        'locationType|1': ['大型商超','交通枢纽','学校食堂','校园大门','政府大门'],
        earlyMorning:  '@integer(0,5)',
        morning: '@integer(30,60)',
        noon: '@integer(50,90)',
        afternoon: '@integer(60,120)',
        dusk: '@integer(50,90)',
        night: '@integer(0,5)',
    }))
}

for(let i = 0; i < 5; i++){
    lately7View.push(Mock.mock({
        'location|1': ['广东省深圳市大条区西门阿斯顿超市','广东省深圳市龙窝区啦啦呜职业技术学院W食堂','广东省深圳市田福区嗷嗷希望小学','广东省深圳市北山区呵呵哒振幅','广东省深圳市东山区凤翔大道23号人行道'],
        'locationType|1': ['大型商超','交通枢纽','学校食堂','校园大门','政府大门'],
        avgHeadCount:()=>{
            let avgHeadCounts = []
            for(let j =0;j<7;j++){
                avgHeadCounts.push(Mock.mock('@integer(50,400)'))
            }
            return avgHeadCounts
        },
        maxHeadCount:()=>{
            let maxHeadCounts = []
            for(let j =0;j<7;j++){
                maxHeadCounts.push(Mock.mock('@integer(100,500)'))
            }
            return maxHeadCounts
        },
        alarmCount:()=>{
            let alarmCounts = []
            for(let j =0;j<7;j++){
                alarmCounts.push(Mock.mock('@integer(1,100)'))
            }
            return alarmCounts
        },
    }))
}

var lastDay = new Date()
for (let i = 0; i <7; i++) {
    lastDay = new Date(lastDay-24*60*60*1000);
    dates.push(lastDay);
}
dates.reverse()


export default {
    generalViewList:() => {
        return {
            code: 20000,
            data: generalView
        }
    },
    timeViewList:() => {
        return {
            code: 20000,
            data: timeView,
        }
    },
    lately7Record:() => {
        return {
            code: 20000,
            data: lately7View
        }
    },
    lately7Date:() => {
        return {
            code: 20000,
            data: dates
        }
    }
}