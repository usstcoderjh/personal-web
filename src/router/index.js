import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () => import('../views/login/index.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Index
  }
]

const router = new VueRouter({
  routes
})

export default router
