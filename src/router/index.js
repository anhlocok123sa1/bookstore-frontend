import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import CategoryView from '@/views/CategoryView.vue'
import CheckoutView from '@/views/CheckoutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductView
  },
  {
    path: '/category/:id',
    name: 'category',
    component: CategoryView
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router