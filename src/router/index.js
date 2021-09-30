import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Form from '@/view/form/form'
import Test from '@/view/test'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta:{
        title: '首页'
      }
    },
    {
      path: '/',
      name: 'Form',
      component: Form,
      meta:{
        title: '表单页'
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta:{
        title: '测试'
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router