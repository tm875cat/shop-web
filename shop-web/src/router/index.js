import { createRouter, createWebHashHistory } from 'vue-router'
import Anti from '../views/AntiView.vue'
import AllProduct from '../views/AllProductView.vue'
import Product from '../views/ProductView.vue'
import Login from '../views/LoginView.vue'
import Apply from '../views/ApplyView.vue'
import Checkout from '../views/CheckoutView.vue'
import { useUserDataStore } from '@/stores/userDataStore' //現有所有會員資料(用來登入比對)
import { userStore } from '@/stores/userStore' //現在登入的會員資料
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'anti',
      component: Anti,
    },
    {
      path: '/all-product',
      name: 'all-product',
      component: AllProduct,
    },
    {
      path: '/all-product/product/:id',
      name: 'product',
      component: Product,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/apply',
      name: 'apply',
      component: Apply,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
  ],
})
// 全域前置守衛
router.beforeEach((to, from, next) => {
  const allUsersStore = useUserDataStore() //現有全部會員資料
  const currentUserStore = userStore() //目前登入會員
  //每次路由切換時都去找登入狀態及會員資料
  currentUserStore.loadFromStorage()
  allUsersStore.loadFromStorage()
  next()
})

export default router
