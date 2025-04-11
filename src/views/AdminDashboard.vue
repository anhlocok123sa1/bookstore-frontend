<template>
    <div class="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div class="admin-content">
        <p>Chào mừng admin {{ authStore.currentUser?.name }}</p>
        <div class="admin-features">
          <router-link to="/admin/users">Quản lý người dùng</router-link>
          <router-link to="/admin/books">Quản lý sách</router-link>
          <router-link to="/admin/orders">Quản lý đơn hàng</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/stores/auth'
  
  const authStore = useAuthStore()
  </script>
  
  <style scoped>
  .admin-dashboard {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .admin-features {
    display: grid;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .admin-features a {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    text-decoration: none;
    color: #2c3e50;
    transition: all 0.3s ease;
  }
  
  .admin-features a:hover {
    background: #3498db;
    color: white;
    transform: translateY(-2px);
  }
  </style>