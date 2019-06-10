import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as filters from './filters' // global filters

import i18n from './lang' // Internationalization
import '@/icons' // icon
import '@/permission' // permission control
import {alarmContinueComputed} from '@/utils'

import VueAMap from 'vue-amap'
Vue.use(VueAMap);

// 初始化vue-amap

Vue.prototype.amapKey = '01f006aa10e490712644808f03e52340'

VueAMap.initAMapApiLoader({
  // 高德key
  key: '01f006aa10e490712644808f03e52340',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
});


// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI, { 
  i18n: (key, value) => i18n.t(key, value)
 })

Vue.prototype.alarmContinueComputed = alarmContinueComputed

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
