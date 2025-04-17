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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.initialize() // nếu cần khôi phục từ localStorage

  const requiresAuth = to.meta.requiresAuth
  const requiresAdmin = to.meta.requiresAdmin

  // Nếu route cần đăng nhập mà chưa đăng nhập
  if (requiresAuth && !authStore.currentUser) {
    return next({ name: 'login' }) // Chuyển hướng tới trang đăng nhập
  }

  // Nếu cần quyền admin nhưng user không phải admin
  if (requiresAdmin && !authStore.currentUser?.is_admin) {
    return authStore.currentUser
      ? next({ name: 'access-denied' }) // Chuyển hướng tới trang access-denied nếu không phải admin
      : next({ name: 'login' }) // Chuyển hướng tới trang login nếu chưa đăng nhập
  }

  // Cho phép chuyển tiếp bình thường
  next()
})


export default router