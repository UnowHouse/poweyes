export default {
  notify: {
    langSwitch:'switch language success',
  },
  login: {
    title: 'Poweyes',
    logIn: 'Sign in',
    username: 'username',
    password: 'password',
    rememberMe: 'Save Landing Status',
    error:{
      username: 'Please enter the correct user name',
      password: 'The password can not be less than 6 digits',
    },
  },
  threshold:'Alarm Threshold',
  route: {
    dashboard: 'Dashboard',
    abnormalDetail: 'AbnormalDetail',
    history: 'History',
    historyRecord: 'Record',
    historyVideo: 'Video',
    dataAnalysis: 'DataAnalysis',
    securityOffiers: 'Security Offiers'
  },
  socket:{
    errorTip: 'Failure Connect To Server, Refresh Retry Please',
  },
  history:{
    record:{
      title: 'Abnormal Record Query Page',
      startDate:'Start Date',
      endDate:'End Date',
      startTime:'Start Time',
      searchPlaceHolder:'Location Name',
      location:'Location Message',
      locationType:'Location Type',
      avgHeadCount: 'Average Head Count',
      maxHeadCount: 'Maximum Head Count',
      alarmDuration: 'Alarm Duration',
      longitude: 'Longitude',
      latitude: 'Latitude',
      viewBack: 'View Back',
      addressIp: 'IP address',
      otherBatch: 'For Another Batch',
    },
    video:{
      title:'Video Playback Of Abnormal Location',
      viewBackVideo: 'View Back Video',
      errorVideo: 'Error! The video cannot play',
    }
  },

  detail:{
    moniorLocation:'Monitoring sites',
    infoTitle:'Basic Information',
    currentPlace: 'Current Alarm Location',
    moniorTitle: 'Monitor Information',
    recommendManager: 'Recommended Security Personnel',
    running: 'Normal Running',
    noRunning: 'Lose Connection',
    alarmUp: 'Alarm Opening',
    alarmDown: 'Normal',
    alarmDuration: 'Alarm Duration',
    headCount: 'Head Count',
    alarmPlace: 'Alarm Location',
    alarmManager: 'Security Offier',
    goManager: 'The Security Offier List',
    content:{
      recoName:'Recommend the names of security personnel',
      recoPhone: 'Recommended telephone contact information for security personnel',
      normalRun: 'The current edge ends are in normal operation and monitored',
      abnormalRun: 'The current edge ends are in normal operation and monitored',
      alarmTip: 'The number of heads is higher than the upper limit of the preset capacity',
      noAlarmTip: 'No abnormal flow at the edge is detected',
      alarmDuration: 'Abnormal alarm duration',
      detectCount: 'The number of specific persons detected during abnormal alarm',
      recoNoName: 'There is no Security officers',
      recoNoPhone: ''
    }      
  },
  placeInfo:{
    location:'Location',
    locationType:'Type Of Location',
    avgHeadCount:'History Average Number When Alarm',
    maxHeadCount:'History Maximum Number When Alarm',
    longitude: 'Longitude',
    latitude: 'Latitude',
    alarmDuration: 'Alarm Duration',
    ipAddress: 'IP address',
    region: 'Location',
    district: 'District',
    street: 'Road Community',
    streetNum: 'Street',
    desc: 'Description'
  },
  da:{
    general:{
      title:'Congestion Prone Locations TOP 10',
      chartTitle:'Alarm Count Statistics',
      locationAlarmCount:'History Alarm Count',
      location:'Location',
      historyAlarmCount:'History Alarm Count',
      locationType:'Type Of Location',
      avgHeadCount:'History Average Number When Alarm',
      maxHeadCount:'History Maximum Number When Alarm',
      totalAlarm: 'Total Alarm Count',
      place: 'Region',
      hours: 'Hours',
      noneTip: 'There No Any Datas Else'
    },
    time:{
      chartTitle:'Alarm Time Quantum Statistics',
      earlyMorning: 'Morning(6:00 - 8:00)',
      morning: 'Forenoon(8:00 - 11:00)',
      noon: 'Noon(11:00 - 14:00)',
      afternoon: 'Afternoon(14:00 - 18:00)',
      dusk: 'Dusk (18:00 - 20:00)',
      night: 'Evening(20:00 - 22:00)',
    },
    lately:{
      chartTitle:'Statistics of Abnormal Number And Number Of People In Recent 7 Days',
      avgHeadCount: 'Average Number Of People',
      maxHeadCount: 'Maximum Number Of People',
      alarmCount: 'Alarm Count',
      manCount:'Number Of people',
      notlog:'No alarm record has been recorded for the last 7 days',
      '1':'Jan.',
      '2':'Feb.',
      '3':'Mar.',
      '4':'Apr.',
      '5':'May.',
      '6':'Jun.',
      '7':'Jul.',
      '8':'Aug.',
      '9':'Sep.',
      '10':'Oct.',
      '11':'Nov.',
      '12':'Dec.',
      day: ''
    }
  },
  secuOffiers:{
    listTitle: 'Security Offiers List',
    mapTitle: 'Location',
    detailTitle: 'Detail',
    name: 'Name',
    phone: 'Phone Number',
    status: 'Status',
    city: 'City',
    district: 'District',
    streetNum: 'Street Number',
    longitude: 'Longitude',
    latitude: 'Latitude',
    free: 'On Duty',
    busy: 'Engaged'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
  },
  
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  dashboard:{
    instanceTitle: 'Edge End Instances',
    instanceNum: 'Alive Instance',
    table:{
      title: 'List of Current Abnormal Alarm Locations',
      emptyData: 'There Is No Abnormal Alarm At Present',
      emptyInstance: 'There Is No Monitoring Connection',
      address:'Address',
      headCount:'HeadCount',
      status: 'Status',
      ipAddress: 'IpAddress',
      region: 'Region',
      langitude: 'Langitude',
      latitude: 'Latitude',
      statusTip: 'Normal Monitoring',
      errorStatusTip: 'Lose Connection',
      startTime: 'StartTime',
      recommendManager: 'RecommendManager&PhoneNumber',
      actionItems:{
        onlive: 'View the scene',
      },      
    },
    viewCard:{
      title:'general',
      abNumTag:'Current Abnormal Number',
      dayAbNumTag:'Today Abnormal Number',
      dataAnalyze:'Statistical Analysis Of Datas',
      history:'Reviewing Historical Records',
    },
    chart:{
      timeName:'Today Total Alarm Duration',
      countName:'Today Total Alarm Count',
      title:'Detai Alarm Today',
      title:'Alarm Number Status',
      second:'second',

    }
  },
  table: {
    dashboard:{
      title: 'Power Eye List',
      id:'ID',
      address:'Address',
      headCount:'HeadCount',
      status: 'Status',
      startTime: 'StartTime',
      recommendManager: 'RecommendManager&PhoneNumber',      
    },
    search: 'Search',
    status: 'Status',
    actions: 'Actions',
    actionItems:{
      onlive: 'View the scene',
    },
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  
  tagsView: {
    abnormal: 'Abnormal',
    normal: 'Normal',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  }
}