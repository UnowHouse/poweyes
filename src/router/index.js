import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      },
      {
        path: 'abnormalDetail/:id',
        component: () =>import('@/views/abnormalDetail/index'),
        hidden: true,
        name: 'abnormalDetail',
        meta: {title: 'abnormalDetail', icon: '', noCache: true}
      }
    ]
  },
  {
    path: '/history',
    component: Layout,
    redirect: 'historyRecord',
    meta: {
      title: 'history',
      icon: 'clipboard'
    },
    children: [
      {
        path: 'historyRecord',
        component: () => import('@/views/historyRecord/index'),
        name: 'historyRecord',
        meta: {title: 'historyRecord', icon: 'documentation'},
      },
      {
        path: 'historyVideo',
        component: () => import('@/views/historyVideo/index'),
        name: 'historyVideo',
        meta: {title: 'historyVideo', icon: 'video'},
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'dataAnalysis',
    children: [{
      path: 'dataAnalysis',
      component: () => import('@/views/dataAnalysis/index'),
      name: 'dataAnalysis',
      meta: {title: 'dataAnalysis', icon: 'chart'}
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'securityOffiers',
    children: [{
      path: 'securityOffiers',
      component: () => import('@/views/securityOffiers/index'),
      name: 'securityOffiers',
      meta: {title: 'securityOffiers', icon: 'peoples'}
    }]
  },



  { path: '*', redirect: '/404', hidden: true }
]

//异步挂载的路由
//动态需要根据权限加载的路由表 
export const asyncRouterMap = [
 
];



export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
