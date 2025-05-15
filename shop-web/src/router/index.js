import { createRouter, createWebHistory } from 'vue-router'
import Anti from '../views/AntiView.vue'
import AllProduct from '../views/AllProductView.vue'
import Product from '../views/ProductView.vue'
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

    // ,
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
