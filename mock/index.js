import Mock from 'mockjs'
import userAPI from './user'
import tableAPI from './table'
import articleAPI from './article'
import historyAPI from './history'
import dataAnalysis from './dataAnalysis'

// Fix an issue with setting withCredentials = true, cross-domain request lost cookies
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}
// Mock.setup({
//   timeout: '350-600'
// })

// User
Mock.mock(/\/user\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/info/, 'get', userAPI.getInfo)
Mock.mock(/\/user\/logout/, 'post', userAPI.logout)

// Table
Mock.mock(/\/table\/list/, 'get', tableAPI.list)

// Article
Mock.mock(/\/article\/getList/, 'get', articleAPI.getList)

Mock.mock(/\/history\/getList/, 'get', historyAPI.getList);

Mock.mock(/\/da\/generalView/,'get',dataAnalysis.generalViewList)
Mock.mock(/\/da\/timeView/,'get',dataAnalysis.timeViewList)
Mock.mock(/\/da\/lately7Record/,'get',dataAnalysis.lately7Record)
Mock.mock(/\/da\/lately7Date/,'get',dataAnalysis.lately7Date)


export default Mock
