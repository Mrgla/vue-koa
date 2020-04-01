import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Error from '@/components/Error'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      // 404页面
      path: '*',
      name: 'error',
      component: Error,
      meta: {
        title: '页面丢失了~'
      }
    },
    {
      path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router