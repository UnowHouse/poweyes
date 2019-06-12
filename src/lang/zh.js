export default {
  notify: {
    langSwitch: '当前语言切换为中文',
  },
  login: {
    title: '云监控平台',
    logIn: '登录',
    username: '账号',
    password: '密码',
    rememberMe: '保存登陆状态',
    error:{
      username: '请输入正确的用户名',
      password: '密码不能小于5位',
    },
  },
  threshold:'报警阈值',
  route: {
    dashboard: '首页',
    abnormalDetail: '报警详情',
    history: '历史回顾',
    historyRecord: '报警记录',
    historyVideo: '视频回放',
    dataAnalysis: '数据分析',
    securityOffiers: '安保人员'
  },
  socket:{
    errorTip: '无法连接到服务器，请刷新重试',
  },
  detail:{
    moniorLocation: '监控地点',
    infoTitle:'基本信息',
    currentPlace: '当前报警地点',
    moniorTitle: '监控信息',
    recommendManager: '推荐安保人员',
    running: '正常监视中',
    noRunning: '连接已断开',
    alarmUp: '报警开启',
    alarmDown: '无异常',
    alarmDuration: '报警时长',
    headCount: '人数',
    alarmPlace: '报警地点',
    alarmManager: '治安人员',
    goManager: '查看治安人员名单',
    content:{
      recoName:'推荐安保人员的姓名',
      recoPhone: '推荐安保人员的电话联系方式',
      normalRun: '当前边缘端正常运行并监视中',
      abnormalRun: '与边缘端失去连接，请检查网络情况或重新启动',
      alarmTip: '人头数异常，检测到人头数超过预置容量上限数',
      noAlarmTip: '当前边缘端未检测到人流量异常问题',
      alarmDuration: '人流量异常报警持续时长',
      detectCount: '异常报警时，检测到的具体的人数',
      recoNoName: '暂时匹配不到合适的治安人员',
      recoNoPhone: ''
    }      
  },
  placeInfo:{

    location:'地点名称',
    locationType:'地点类型',
    avgHeadCount:'报警时人数平均值',
    maxHeadCount:'历史报警人数最大值',
    longitude: '经度',
    latitude: '纬度',
    alarmDuration: '报警时长',
    ipAddress: '边缘端ip地址',
    region: '所在地',
    district: '所属区',
    street: ' 所在街道',
    streetNum: '街道号牌',
    desc: '描述'


  },
  history:{
    record:{
      title: '报警记录查询',
      startDate:'开始日期',
      endDate:'结束日期',
      startTime: '开始时间',
      endTime: '结束时间',
      searchPlaceHolder:'地点名称',
      location:'地点信息',
      locationType:'地点类型',
      avgHeadCount: '平均人数',
      maxHeadCount: '人数最大值',
      alarmDuration: '报警时长',
      longitude: '经度',
      latitude: '纬度',
      viewBack: '视频回放',
      addressIp: '监控ip地址',
      otherBatch: '换一批',

    },
    video:{
      title:'地点人流量报警视频回放',
      viewBackVideo: '查看报警视频',
      errorVideo: '此视频暂无法播放，请稍后再试',

    }
  },
  da:{
    general:{
      title:'易人流异常爆发的地点列表-TOP10',
      chartTitle:'各地点类型报警数占比情况',
      locationAlarmCount:'地点历史报警次数',
      location:'地点名称',
      historyAlarmCount:'累计历史报警次数',
      locationType:'地点类型',
      avgHeadCount:'报警时人数平均值',
      maxHeadCount:'历史报警人数最大值',
      totalAlarm: '报警总次数',
      place: '位置',
      hours: '小时',
      noneTip: '暂无报警记录',
    },
    time:{
      chartTitle:'各地点类型报警时间点统计',
      earlyMorning: '早晨（6:00 - 8:00）',
      morning: '上午（8:00 - 11:00）',
      noon: '中午（11:00 - 14:00）',
      afternoon: '下午（14:00 - 18:00）',
      dusk: '傍晚（18:00 - 20:00）',
      night: '晚上（20:00 - 22:00）',
    },
    lately:{
      chartTitle:'近7天内各地点报警次数与人数统计',
      avgHeadCount: '平均人数',
      maxHeadCount: '人数最大值',
      alarmCount: '报警次数',
      manCount:'人数',
      notlog:'最近7天内暂无报警记录',
      '1':'1月',
      '2':'2月',
      '3':'3月',
      '4':'4月',
      '5':'5月',
      '6':'6月',
      '7':'7月',
      '8':'8月',
      '9':'9月',
      '10':'10月',
      '11':'11月',
      '12':'12月',
      day:'号',
    }
  },
  secuOffiers:{
    listTitle: '安保人员列表',
    mapTitle: '位置',
    detailTitle: '资料详情',
    name: '姓名',
    phone: '电话号码',
    status: '状态',
    city: '所在城市',
    district: '所属区',
    streetNum: '街道号牌',
    longitude: '定位经度',
    latitude: '定位纬度',
    free: '值班中',
    busy: '忙碌'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
  },
  
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  dashboard:{
    instanceTitle: '边缘端列表',
    instanceNum: '在线实例',
    table:{
      title: '当前人流量异常报警地点列表',
      emptyData: '当前无异常报警情况',
      emptyInstance: '暂无边缘段程序连接',
      address:'地点',
      headCount:'人头数',
      status: '状态',
      ipAddress: 'IP地址',
      region: '地域',
      langitude: '经度',
      latitude: '纬度',
      startTime: '报警开始时间',
      statusTip: '正常监视中',
      errorStatusTip: '断开连接',
      recommendManager: '推荐管理人员及联系方式',      
      actionItems:{
        onlive: '查看现场情况',
      }
    },
    viewCard:{
      title:'综述',
      abNumTag:'当前报警个数',
      dayAbNumTag:'今日报警总数',
      dataAnalyze:'数据统计分析',
      history:'历史报警记录',
    },
    
    chart:{
      timeName:'今日报警总时长',
      countName:'今日总报警数',
      title:'今日报警情况',
      second:'秒',
    }
  },
  table: {
    dashboard:{
      title: '监控地点列表',
      id:'序号',
      address:'地点',
      headCount:'人头数',
      status: '状态',
      startTime: '报警开始时间',
      
    },
    status: '状态',
    actions: '操作',
    actionItems:{
      onlive: '查看现场情况',
    },
    search: '搜索',
    edit: '编辑',
    delete: '删除',
    cancel: '取消',
    confirm: '确定'
  },
  tagsView: {
    abnormal: '异常',
    normal: '正常',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  }
}
