import Vue from 'vue'
import Router from 'vue-router'
import first from '@/components/first'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'first',
      component: first
    },
    {
      path: '/detail/:docid',
      name: 'detail',
      component: detail
    }
  ]
})
