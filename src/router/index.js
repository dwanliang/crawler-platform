import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Form from '@/view/form'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta:{
        title: '首页'
      }
    },
    {
      path: '/form',
      name: 'Form',
      component: Form,
      meta:{
        title: '表单页'
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