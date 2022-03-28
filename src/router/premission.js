import router from './index'
import store from '@/store'

//  白名单
const whiteList = ['/login']
router.beforeEach((to, form, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})