import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import CategoryView from '@/views/CategoryView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import LoginView from '@/views/LoginView.vue'

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
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/ForgotPasswordView.vue')
  },
  {
    path: '/admin/dashboard',
    component: () => import('@/views/AdminDashboard.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/user/profile',
    component: () => import('@/views/UserProfile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/access-denied',
    component: () => import('@/views/AccessDenied.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  authStore.initialize()

  const isAuthRequired = to.meta.requiresAuth
  const isAdminRequired = to.meta.requiresAdmin

  if (isAuthRequired && !authStore.isAuthenticated) {
    return '/login'
  }

  if (isAdminRequired && !authStore.isAdmin) {
    return authStore.isAuthenticated ? '/access-denied' : '/login'
  }
})

export default router