import { createRouter, createWebHistory } from 'vue-router'
import Anti from '../views/AntiView.vue'
import AllProduct from '../views/AllProductView.vue'
import Product from '../views/ProductView.vue'
import Login from '../views/LoginView.vue'
import Apply from '../views/ApplyView.vue'
import Checkout from '../views/CheckoutView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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

export default router
