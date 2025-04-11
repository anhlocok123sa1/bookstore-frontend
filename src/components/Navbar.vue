<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="logo">BookStore</router-link>
      <div class="search-bar">
        <input type="text" placeholder="Tìm kiếm sách..." v-model="searchQuery">
        <button @click="search">Tìm kiếm</button>
      </div>
      <div class="nav-links">
        <router-link to="/">Trang chủ</router-link>
        
        <!-- Danh mục với dropdown -->
        <div class="category-menu">
          <button class="category-trigger">Danh mục</button>
          <div class="category-dropdown">
            <router-link 
              v-for="category in categories"
              :key="category.id"
              :to="`/category/${category.id}`"
              class="category-item"
            >
              {{ category.name }}
            </router-link>
          </div>
        </div>

        <div v-if="authStore.isAuthenticated">
          Xin chào, {{ authStore.currentUser.name }}
          <button @click="logout">Đăng xuất</button>
          
          <router-link 
            v-if="authStore.isAdmin"
            to="/admin/dashboard"
          >
            Dashboard Admin
          </router-link>
        </div>
        
        <router-link v-else to="/login">Đăng nhập</router-link>

        <button class="cart-btn" @click="toggleCart">
          Giỏ hàng ({{ totalItems }})
        </button>
      </div>
      
    </div>
  </nav>
</template>

<script>
import { categories } from '@/data/books'
import { mapState } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

export default {
  data() {
    return {
      searchQuery: '',
      categories,
      authStore: useAuthStore()
    }
  },
  computed: {
    ...mapState(useCartStore, ['totalItems']),
    authStore() {
      return useAuthStore()
    },
    isAdmin() {
      return this.authStore.currentUser?.role === 'admin'
    }
  },
  methods: {
    search() {
      this.$router.push({ path: '/search', query: { q: this.searchQuery } })
    },
    toggleCart() {
      this.$emit('toggle-cart')
    },
    logout() {
      const authStore = useAuthStore()
      authStore.logout()
      window.location = '/login'
    }
  }
}
</script>

<style scoped>

.navbar {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo:hover {
  color: #3498db;
}

.search-bar {
  display: flex;
  flex-grow: 1;
  margin: 0 2rem;
}

.search-bar input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px 0 0 4px;
}

.search-bar button {
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-bar button:hover {
  background-color: #c0392b;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
}

/* Hiệu ứng hover cho danh mục */
.nav-links a:hover {
  color: #3498db;
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #3498db;
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.cart-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cart-btn:hover {
  background-color: #2980b9;
}

.category-menu {
  position: relative;
  display: inline-block;
}

.category-trigger {
  background: none;
  border: none;
  color: #ecf0f1;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.category-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: white !important;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #eee;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.category-menu:hover .category-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.category-item {
  margin: 0 10px;
  display: block;
  padding: 0.75rem 1rem;
  color: #34495e !important;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.category-item:hover {
  background-color: #f8f9fa;
  color: #3498db !important;
  padding-left: 1.25rem;
}

.category-item:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.category-item.router-link-exact-active {
  color: #e74c3c !important;
  font-weight: bold;
}
</style>